import type { ReactNode } from 'react';
import { useEffect, useReducer } from 'react';

import {
  initialKbsState,
  kbsContext,
  kbsDispatchContext,
  kbsReducer,
} from './kbs_context.ts';
import {
  getKeyDownHandler,
  useLastTriggerRef,
} from './utils/get_key_down_handler.ts';

export interface KbsProviderProps {
  children: ReactNode;
}

export function KbsProvider(props: KbsProviderProps) {
  const [kbsState, kbsDispatch] = useReducer(kbsReducer, initialKbsState);
  const lastTrigger = useLastTriggerRef();

  useEffect(() => {
    if (kbsState.disableCount !== 0) return;
    const handleKeyDown = getKeyDownHandler(
      lastTrigger,
      kbsState.combinedShortcuts,
    );
    document.body.addEventListener('keydown', handleKeyDown);
    return () => document.body.removeEventListener('keydown', handleKeyDown);
  }, [kbsState.disableCount, kbsState.combinedShortcuts, lastTrigger]);

  return (
    <kbsContext.Provider value={kbsState}>
      <kbsDispatchContext.Provider value={kbsDispatch}>
        {props.children}
      </kbsDispatchContext.Provider>
    </kbsContext.Provider>
  );
}
