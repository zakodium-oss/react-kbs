import { useKbsGlobalShortcuts } from '../component';

import { useCounter } from './useCounter';

export default function Team() {
  const [counter, shortcuts] = useCounter();
  useKbsGlobalShortcuts(shortcuts);
  return (
    <div className="p-4">
      Team counter: {counter}. Press I to increment and D to decrement.
    </div>
  );
}
