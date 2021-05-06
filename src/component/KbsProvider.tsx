import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  Dispatch,
  KeyboardEvent,
} from 'react';

import { KbsDefinition } from './types';
import { combineShortcuts } from './utils/combineShortcuts';
import { eventToKey } from './utils/makeKey';

export interface KbsProviderProps {
  children: ReactNode;
}

interface KbsState {
  inputShortcuts: KbsDefinition[][];
  combinedShortcuts: Record<string, KbsDefinition>;
  disableCount: number;
}

type KbsAction =
  | { type: 'INIT'; shortcuts: KbsDefinition[] }
  | { type: 'CLEANUP'; shortcuts: KbsDefinition[] }
  | { type: 'DISABLE_GLOBAL' }
  | { type: 'ENABLE_GLOBAL' };

const initialKbsState: KbsState = {
  inputShortcuts: [],
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
      return {
        ...state,
        inputShortcuts: newInputs,
        combinedShortcuts: combineShortcuts(newInputs),
      };
    }
    case 'CLEANUP': {
      const newInputs = state.inputShortcuts.filter(
        (shortcuts) => shortcuts !== action.shortcuts,
      );
      return {
        ...state,
        inputShortcuts: newInputs,
        combinedShortcuts: combineShortcuts(newInputs),
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

const divStyle = {
  outline: 'none',
};

export function KbsProvider(props: KbsProviderProps) {
  const [kbsState, kbsDispatch] = useReducer(kbsReducer, initialKbsState);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!(event.target as HTMLDivElement).hasAttribute('data-kbs-receiver')) {
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

  const divProps =
    kbsState.disableCount === 0
      ? {
          tabIndex: 0,
          style: divStyle,
          onKeyDown: handleKeyDown,
          'data-kbs-receiver': true,
        }
      : null;

  return (
    <kbsContext.Provider value={kbsState}>
      <kbsDispatchContext.Provider value={kbsDispatch}>
        <div {...divProps}>{props.children}</div>
      </kbsDispatchContext.Provider>
    </kbsContext.Provider>
  );
}
