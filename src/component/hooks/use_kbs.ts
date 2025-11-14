import { useMemo } from 'react';

import type { KbsDefinition } from '../types.ts';
import { cleanShortcuts } from '../utils/clean_shortcuts.ts';
import { combineShortcuts } from '../utils/combine_shortcuts.ts';
import {
  getKeyDownHandler,
  useLastTriggerRef,
} from '../utils/get_key_down_handler.ts';

export function useKbs(shortcuts: readonly KbsDefinition[]) {
  const lastTrigger = useLastTriggerRef();
  const combinedShortcuts = useMemo(
    () => combineShortcuts(cleanShortcuts([shortcuts])),
    [shortcuts],
  );
  const handleKeyDown = useMemo(
    () => getKeyDownHandler(lastTrigger, combinedShortcuts),
    [lastTrigger, combinedShortcuts],
  );
  return { tabIndex: 0, onKeyDown: handleKeyDown };
}
