import { useMemo, useState } from 'react';

import { useKbsGlobalShortcuts } from '../component';

export default function Dashboard() {
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
  useKbsGlobalShortcuts(shortcuts);
  return (
    <div className="p-4">
      Counter: {counter}. Press I to increment and D to decrement.
    </div>
  );
}
