import { useKbsGlobal } from '../component';

import { useCounter } from './useCounter';

export default function Dashboard() {
  const [counter, shortcuts] = useCounter();
  useKbsGlobal(shortcuts);
  return (
    <div className="p-4">
      Dashboard counter: {counter}. Press I to increment and D to decrement.
    </div>
  );
}
