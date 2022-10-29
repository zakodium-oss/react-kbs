import { useKbs } from '../component';

import Playground from './Playground';
import { useCounter } from './useCounter';

export default function ProjectsZone2() {
  const [counter, shortcuts] = useCounter({ allowC: false, maxFrequency: 2 });
  const divProps = useKbs(shortcuts);
  return (
    <div
      {...divProps}
      className="flex-1 m-4 bg-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-600"
    >
      <p>
        Inner local counter: {counter}. Press I to increment (max 2 per second
        if held down) and D to decrement.
      </p>
      <Playground />
    </div>
  );
}
