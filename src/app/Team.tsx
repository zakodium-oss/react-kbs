import { useKbsGlobal } from '../component/index.ts';

import { useCounter } from './useCounter.ts';

export default function Team() {
  const [counter, shortcuts] = useCounter();
  useKbsGlobal(shortcuts);
  return (
    <div className="p-4">
      Team counter: {counter}. Press I or C to increment and D to decrement.
    </div>
  );
}
