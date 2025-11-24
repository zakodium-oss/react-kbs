import { useState } from 'react';

import { useKbsGlobal } from '../component/index.ts';

import Playground from './Playground.tsx';
import { useCounter } from './useCounter.ts';

export default function Dashboard() {
  const [counter, shortcuts] = useCounter({ maxFrequency: 2 });
  const [color, setColor] = useState('white');
  useKbsGlobal([
    ...shortcuts,
    {
      shortcut: { key: 'b', shift: true },
      handler() {
        setColor('black');

        return () => setColor('white');
      },
    },
  ]);
  return (
    <div
      className={`p-4 space-y-8 ${color === 'white' ? 'bg-white text-black' : 'bg-black text-white'}`}
    >
      <p>
        Dashboard counter: {counter}. Press I or C to increment (max 2 per
        second if held down) and D to decrement.
      </p>
      <p>
        Press <kbd>Shift+B</kbd> to invert the background color of the page.
        Release <kbd>Shift</kbd> or <kbd>B</kbd> to reset.
      </p>
      <Playground />
    </div>
  );
}
