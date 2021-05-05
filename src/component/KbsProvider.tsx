import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  Dispatch,
  KeyboardEvent,
} from 'react';

import { KbsShortcut } from './types';
import { combineShortcuts } from './utils/combineShortcuts';
import { eventToKey } from './utils/makeKey';

export interface KbsProviderProps {
  children: ReactNode;
}

interface KbsState {
  inputShortcuts: KbsShortcut[][];
  combinedShortcuts: Record<string, KbsShortcut>;
  enabled: boolean;
}

type KbsAction =
  | { type: 'INIT'; shortcuts: KbsShortcut[] }
  | { type: 'CLEANUP'; shortcuts: KbsShortcut[] };

const initialKbsState: KbsState = {
  inputShortcuts: [],
  combinedShortcuts: {},
  enabled: true,
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
    const key = eventToKey(event);
    const shortcut = kbsState.combinedShortcuts[key];
    if (shortcut) {
      event.stopPropagation();
      event.preventDefault();
      shortcut.handler(event);
    }
  }

  const divProps = kbsState.enabled
    ? {
        tabIndex: 0,
        style: divStyle,
        onKeyDown: handleKeyDown,
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
