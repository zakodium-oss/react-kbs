import { useMemo, useState } from 'react';

export function useCounter() {
  const [counter, setCounter] = useState(0);
  const shortcuts = useMemo(
    () => [
      {
        shortcut: 'i',
        handler() {
          setCounter((current) => current + 1);
        },
      },
      {
        shortcut: 'd',
        handler() {
          setCounter((current) => current - 1);
        },
      },
    ],
    [],
  );
  return [counter, shortcuts] as const;
}
