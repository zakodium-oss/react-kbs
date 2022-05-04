import { useKbsGlobal } from '../component';

import Playground from './Playground';
import { useCounter } from './useCounter';

export default function Dashboard() {
  const [counter, shortcuts] = useCounter();
  useKbsGlobal(shortcuts);
  return (
    <div className="p-4 space-y-8">
      <p>
        Dashboard counter: {counter}. Press I or C to increment and D to
        decrement.
      </p>
      <Playground />
    </div>
  );
}
