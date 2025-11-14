import { useEffect } from 'react';

import { useKbsDispatch } from '../kbs_context.ts';
import type { KbsDefinition } from '../types.ts';

export function useKbsGlobal(shortcuts: KbsDefinition[]) {
  const kbsDispatch = useKbsDispatch();
  useEffect(() => {
    kbsDispatch({ type: 'INIT', shortcuts });
    return () => kbsDispatch({ type: 'CLEANUP', shortcuts });
  }, [kbsDispatch, shortcuts]);
}
