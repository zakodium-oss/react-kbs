import { useCallback, useMemo, KeyboardEvent } from 'react';

import { KbsDefinition } from '../types';
import { cleanShortcuts } from '../utils/cleanShortcuts';
import { combineShortcuts } from '../utils/combineShortcuts';
import { eventToKey } from '../utils/makeKey';

export function useKbs(shortcuts: KbsDefinition[]) {
  const combinedShortcuts = useMemo(
    () => combineShortcuts(cleanShortcuts([shortcuts])),
    [shortcuts],
  );
  const handleKeyDown = useCallback(
    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      if (!(event.target as HTMLDivElement).hasAttribute('data-kbs-receiver')) {
        return;
      }
      const key = eventToKey(event);
      const shortcut = combinedShortcuts[key];
      if (shortcut) {
        event.preventDefault();
        event.stopPropagation();
        shortcut.handler(event);
      }
    },
    [combinedShortcuts],
  );
  return { tabIndex: 0, onKeyDown: handleKeyDown, 'data-kbs-receiver': true };
}
