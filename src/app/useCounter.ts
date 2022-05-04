import { useState } from 'react';

export function useCounter(allowC = true) {
  const [counter, setCounter] = useState(0);
  const shortcuts = [
    {
      shortcut: allowC ? ['i', 'c'] : ['i'],
      handler() {
        setCounter((current) => current + 1);
      },
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
