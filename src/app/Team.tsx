import { useKbsGlobal } from '../component';

import { useCounter } from './useCounter';

export default function Team() {
  const [counter, shortcuts] = useCounter();
  useKbsGlobal(shortcuts);
  return (
    <div className="p-4">
      Team counter: {counter}. Press I or C to increment and D to decrement.
    </div>
  );
}
