import { useKbsGlobal } from '../component';

import Playground from './Playground';
import { useCounter } from './useCounter';

export default function Dashboard() {
  const [counter, shortcuts] = useCounter({ maxFrequency: 2 });
  useKbsGlobal(shortcuts);
  return (
    <div className="p-4 space-y-8">
      <p>
        Dashboard counter: {counter}. Press I or C to increment (max 2 per
        second if held down) and D to decrement.
      </p>
      <Playground />
    </div>
  );
}
