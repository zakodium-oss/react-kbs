import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';

import { useKbsDisableGlobal, useKbsGlobal } from '../component';

import ProjectsZone1 from './ProjectsZone1';
import { useCounter } from './useCounter';

export default function Projects() {
  const [disabled, setDisabled] = useState(false);
  const [counter, shortcuts] = useCounter();
  useKbsGlobal(shortcuts);
  useKbsDisableGlobal(disabled);
  return (
    <div className="flex flex-col flex-1 p-4 bg-gray-100">
      <h1 className="text-2xl text-red-400 uppercase">Projects</h1>
      <div>
        <span>Disable global shortcuts</span>
        <Switch
          checked={disabled}
          onChange={setDisabled}
          className="relative inline-flex items-center justify-center flex-shrink-0 w-10 h-5 rounded-full cursor-pointer group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className="absolute w-full h-full bg-white rounded-md pointer-events-none"
          />
          <span
            aria-hidden="true"
            className={clsx(
              disabled ? 'bg-indigo-600' : 'bg-gray-200',
              'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200',
            )}
          />
          <span
            aria-hidden="true"
            className={clsx(
              disabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200',
            )}
          />
        </Switch>
      </div>
      <div>
        Projects counter: {counter}. Press I to increment and D to decrement.
      </div>
      <ProjectsZone1 />
    </div>
  );
}
