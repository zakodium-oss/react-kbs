import { useState } from 'react';

import type { KbsDefinition } from '../component/index.ts';

export function useCounter(
  options: { allowC?: boolean; maxFrequency?: number } = {},
) {
  const { allowC = true, maxFrequency } = options;
  const [counter, setCounter] = useState(0);
  const shortcuts: readonly KbsDefinition[] = [
    {
      shortcut: allowC ? ['i', 'c'] : ['i'],
      handler() {
        setCounter((current) => current + 1);
      },
      maxFrequency,
      meta: { description: 'Increment counter' },
    },
    {
      shortcut: 'd',
      handler() {
        setCounter((current) => current - 1);
      },
      meta: { description: 'Decrement counter' },
    },
  ];
  return [counter, shortcuts] as const;
}
