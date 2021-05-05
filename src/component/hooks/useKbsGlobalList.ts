import { useContext } from 'react';

import { kbsContext } from '../KbsProvider';

// TODO: wip
export function useKbsGlobalList() {
  return useContext(kbsContext);
}
