import { useEffect } from 'react';

import { useKbsDispatch } from '../KbsProvider';

export function useKbsDisableGlobal(disabled = true) {
  const kbsDispatch = useKbsDispatch();
  useEffect(() => {
    if (!disabled) return;
    kbsDispatch({ type: 'DISABLE_GLOBAL' });
    return () => kbsDispatch({ type: 'ENABLE_GLOBAL' });
  }, [kbsDispatch, disabled]);
}
