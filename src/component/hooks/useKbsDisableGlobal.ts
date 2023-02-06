import { useEffect } from 'react';

import { useKbsUncheckedDispatch } from '../KbsProvider';

export function useKbsDisableGlobal(disabled = true) {
  const kbsDispatch = useKbsUncheckedDispatch();
  useEffect(() => {
    if (!disabled || !kbsDispatch) return;
    kbsDispatch({ type: 'DISABLE_GLOBAL' });
    return () => kbsDispatch({ type: 'ENABLE_GLOBAL' });
  }, [kbsDispatch, disabled]);
}
