import { useMemo, useState } from 'react';

export function useCounter() {
  const [counter, setCounter] = useState(0);
  const shortcuts = useMemo(
    () => [
      {
        shortcut: ['i', 'c'],
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
    ],
    [],
  );
  return [counter, shortcuts] as const;
}
