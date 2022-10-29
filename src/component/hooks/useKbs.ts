import { useCallback, useMemo, KeyboardEvent } from 'react';

import { KbsDefinition } from '../types';
import { cleanShortcuts } from '../utils/cleanShortcuts';
import { combineShortcuts } from '../utils/combineShortcuts';
import { eventToKeyOrCode } from '../utils/makeKey';
import { shouldIgnoreElement } from '../utils/shouldIgnoreElement';

export function useKbs(shortcuts: KbsDefinition[]) {
  const combinedShortcuts = useMemo(
    () => combineShortcuts(cleanShortcuts([shortcuts])),
    [shortcuts],
  );
  const handleKeyDown = useCallback(
    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      if (shouldIgnoreElement(event.target as HTMLElement)) {
        return;
      }
      const { key, code } = eventToKeyOrCode(event);
      const shortcut = combinedShortcuts[key] ?? combinedShortcuts[code];
      if (shortcut) {
        event.preventDefault();
        event.stopPropagation();
        shortcut.handler(event);
      }
    },
    [combinedShortcuts],
  );
  return { tabIndex: 0, onKeyDown: handleKeyDown };
}
