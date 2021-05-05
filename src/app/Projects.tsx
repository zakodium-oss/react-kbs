import { useKbsGlobal } from '../component';

import ProjectsZone1 from './ProjectsZone1';
import { useCounter } from './useCounter';

export default function Projects() {
  const [counter, shortcuts] = useCounter();
  useKbsGlobal(shortcuts);
  return (
    <div className="flex flex-col flex-1 p-4 bg-gray-100">
      <h1 className="text-2xl text-red-400 uppercase">Projects</h1>
      <div>
        Projects counter: {counter}. Press I to increment and D to decrement.
      </div>
      <ProjectsZone1 />
    </div>
  );
}
