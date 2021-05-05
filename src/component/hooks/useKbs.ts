import { useCallback, useMemo, KeyboardEvent } from 'react';

import { KbsDefinition } from '../types';
import { combineShortcuts } from '../utils/combineShortcuts';
import { eventToKey } from '../utils/makeKey';

export function useKbs(shortcuts: KbsDefinition[]) {
  const combinedShortcuts = useMemo(() => combineShortcuts([shortcuts]), [
    shortcuts,
  ]);
  const handleKeyDown = useCallback(
    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      if (event.currentTarget !== event.target) return;
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
  return { tabIndex: 0, onKeyDown: handleKeyDown };
}
