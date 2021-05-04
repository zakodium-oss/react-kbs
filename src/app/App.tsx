import { useKbsGlobalShortcuts } from '../component';

import Navigation from './Navigation';

export function App() {
  useKbsGlobalShortcuts([
    {
      key: ['t', 'u'],
      alt: true,
      handler() {
        // eslint-disable-next-line no-alert
        alert('TEST');
      },
    },
  ]);
  return (
    <div className="w-screen h-screen">
      <Navigation />
    </div>
  );
}
