import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  Dispatch,
  useEffect,
} from 'react';

import { KbsDefinition, KbsInternalShortcut } from './types';
import { cleanShortcuts } from './utils/cleanShortcuts';
import { combineShortcuts } from './utils/combineShortcuts';
import { eventToKey } from './utils/makeKey';

export interface KbsProviderProps {
  children: ReactNode;
}

interface KbsState {
  inputShortcuts: KbsDefinition[][];
  cleanedShortcuts: KbsInternalShortcut[];
  combinedShortcuts: Record<string, KbsInternalShortcut>;
  disableCount: number;
}

type KbsAction =
  | { type: 'INIT'; shortcuts: KbsDefinition[] }
  | { type: 'CLEANUP'; shortcuts: KbsDefinition[] }
  | { type: 'DISABLE_GLOBAL' }
  | { type: 'ENABLE_GLOBAL' };

const initialKbsState: KbsState = {
  inputShortcuts: [],
  cleanedShortcuts: [],
  combinedShortcuts: {},
  disableCount: 0,
};

export const kbsContext = createContext<KbsState>(initialKbsState);

const kbsDispatchContext = createContext<Dispatch<KbsAction> | null>(null);

export function useKbsDispatch() {
  const dispatch = useContext(kbsDispatchContext);
  if (!dispatch) {
    throw new Error('missing context');
  }
  return dispatch;
}

function kbsReducer(state: KbsState, action: KbsAction): KbsState {
  switch (action.type) {
    case 'INIT': {
      const newInputs = [...state.inputShortcuts, action.shortcuts];
      const cleanedShortcuts = cleanShortcuts(newInputs);
      return {
        ...state,
        inputShortcuts: newInputs,
        cleanedShortcuts,
        combinedShortcuts: combineShortcuts(cleanedShortcuts),
      };
    }
    case 'CLEANUP': {
      const newInputs = state.inputShortcuts.filter(
        (shortcuts) => shortcuts !== action.shortcuts,
      );
      const cleanedShortcuts = cleanShortcuts(newInputs);
      return {
        ...state,
        inputShortcuts: newInputs,
        cleanedShortcuts,
        combinedShortcuts: combineShortcuts(cleanedShortcuts),
      };
    }
    case 'DISABLE_GLOBAL': {
      return { ...state, disableCount: state.disableCount + 1 };
    }
    case 'ENABLE_GLOBAL': {
      return { ...state, disableCount: state.disableCount - 1 };
    }
    default:
      throw new Error('unreachable');
  }
}

export function KbsProvider(props: KbsProviderProps) {
  const [kbsState, kbsDispatch] = useReducer(kbsReducer, initialKbsState);

  useEffect(() => {
    if (kbsState.disableCount !== 0) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.target !== document.body &&
        !(event.target as HTMLDivElement).hasAttribute('data-kbs-receiver')
      ) {
        return;
      }
      const key = eventToKey(event);
      const shortcut = kbsState.combinedShortcuts[key];
      if (shortcut) {
        event.stopPropagation();
        event.preventDefault();
        shortcut.handler(event);
      }
    }
    document.body.addEventListener('keydown', handleKeyDown);
    return () => document.body.removeEventListener('keydown', handleKeyDown);
  }, [kbsState.disableCount, kbsState.combinedShortcuts]);

  return (
    <kbsContext.Provider value={kbsState}>
      <kbsDispatchContext.Provider value={kbsDispatch}>
        {props.children}
      </kbsDispatchContext.Provider>
    </kbsContext.Provider>
  );
}
