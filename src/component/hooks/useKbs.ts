import { useMemo } from 'react';

import { KbsDefinition } from '../types';
import { cleanShortcuts } from '../utils/cleanShortcuts';
import { combineShortcuts } from '../utils/combineShortcuts';
import {
  getKeyDownHandler,
  useLastTriggerRef,
} from '../utils/getKeyDownHandler';

export function useKbs(shortcuts: KbsDefinition[]) {
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
