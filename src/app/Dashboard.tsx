import { useKbsGlobal } from '../component/index.ts';

import Playground from './Playground.tsx';
import { useCounter } from './useCounter.ts';

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
