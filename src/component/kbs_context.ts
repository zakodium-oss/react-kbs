import type { Dispatch } from 'react';
import { createContext, useContext } from 'react';

import type { KbsDefinition, KbsInternalShortcut } from './types.ts';
import { cleanShortcuts } from './utils/clean_shortcuts.ts';
import { combineShortcuts } from './utils/combine_shortcuts.ts';

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

export const initialKbsState: KbsState = {
  inputShortcuts: [],
  cleanedShortcuts: [],
  combinedShortcuts: {},
  disableCount: 0,
};

export const kbsContext = createContext<KbsState>(initialKbsState);

export const kbsDispatchContext = createContext<Dispatch<KbsAction> | null>(
  null,
);

export function useKbsUncheckedDispatch() {
  return useContext(kbsDispatchContext);
}

export function useKbsDispatch() {
  const dispatch = useContext(kbsDispatchContext);
  if (!dispatch) {
    throw new Error('missing context');
  }
  return dispatch;
}

export function kbsReducer(state: KbsState, action: KbsAction): KbsState {
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
