import { useEffect } from 'react';

import { useKbsDispatch } from '../KbsProvider';
import { KbsDefinition } from '../types';

export function useKbsGlobal(shortcuts: KbsDefinition[]) {
  const kbsDispatch = useKbsDispatch();
  useEffect(() => {
    kbsDispatch({ type: 'INIT', shortcuts });
    return () => kbsDispatch({ type: 'CLEANUP', shortcuts });
  }, [kbsDispatch, shortcuts]);
}
