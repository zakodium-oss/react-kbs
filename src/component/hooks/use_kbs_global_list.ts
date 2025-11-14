import { useContext } from 'react';

import { kbsContext } from '../kbs_context.ts';
import type { KbsShortcut } from '../types.ts';

export function useKbsGlobalList(): KbsShortcut[] {
  return useContext(kbsContext).cleanedShortcuts.map(
    ({ handler, ...rest }) => rest,
  );
}
