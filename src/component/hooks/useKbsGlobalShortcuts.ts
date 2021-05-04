import { useEffect } from 'react';

import { useKbsDispatch } from '../KbsProvider';
import { KbsShortcut } from '../types';

export function useKbsGlobalShortcuts(shortcuts: KbsShortcut[]) {
  const kbsDispatch = useKbsDispatch();
  useEffect(() => {
    kbsDispatch({ type: 'INIT', shortcuts });
    return () => kbsDispatch({ type: 'CLEANUP', shortcuts });
  }, [kbsDispatch, shortcuts]);
}
