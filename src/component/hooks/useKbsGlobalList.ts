import { useContext } from 'react';

import { kbsContext } from '../KbsProvider';
import { KbsShortcut } from '../types';

export function useKbsGlobalList(): KbsShortcut[] {
  return useContext(kbsContext).cleanedShortcuts.map(
    ({ handler, ...rest }) => rest,
  );
}
