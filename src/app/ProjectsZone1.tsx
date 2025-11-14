import { useKbs } from '../component/index.ts';

import ProjectsZone2 from './ProjectsZone2.tsx';
import { useCounter } from './useCounter.ts';

export default function ProjectsZone1() {
  const [counter, shortcuts] = useCounter();
  const divProps = useKbs(shortcuts);
  return (
    <div
      {...divProps}
      className="flex flex-col flex-1 bg-yellow-100 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
    >
      <div className="h-12 p-2">
        Local counter: {counter}. Press I or C to increment and D to decrement.
      </div>
      <ProjectsZone2 />
    </div>
  );
}
