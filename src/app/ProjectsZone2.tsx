import { useKbsShortcuts } from '../component/hooks/useKbsShortcuts';

import { useCounter } from './useCounter';

export default function ProjectsZone2() {
  const [counter, shortcuts] = useCounter();
  const divProps = useKbsShortcuts(shortcuts);
  return (
    <div
      {...divProps}
      className="flex-1 m-4 bg-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-600"
    >
      Inner local counter: {counter}. Press I to increment and D to decrement.
    </div>
  );
}
