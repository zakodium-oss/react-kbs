import { useKbs } from '../component/hooks/useKbs';

import ProjectsZone2 from './ProjectsZone2';
import { useCounter } from './useCounter';

export default function ProjectsZone1() {
  const [counter, shortcuts] = useCounter();
  const divProps = useKbs(shortcuts);
  return (
    <div
      {...divProps}
      className="flex flex-col flex-1 bg-yellow-100 focus:outline-none focus:ring-1 focus:ring-blue-600"
    >
      <div className="h-12 p-2">
        Local counter: {counter}. Press I or C to increment and D to decrement.
      </div>
      <ProjectsZone2 />
    </div>
  );
}
