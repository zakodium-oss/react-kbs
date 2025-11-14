import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { useKbsGlobal } from '../component/index.ts';

import Dashboard from './Dashboard.tsx';
import GlobalHelp from './GlobalHelp.tsx';
import Navigation from './Navigation.tsx';
import Projects from './Projects.tsx';
import Team from './Team.tsx';

declare module '../component/index.ts' {
  interface KbsMetadata {
    description: string;
  }
}

export function App() {
  const [showHelp, setShowHelp] = useState(false);
  useKbsGlobal([
    {
      shortcut: '?',
      handler() {
        setShowHelp(true);
      },
      meta: {
        description: 'Show this help',
      },
    },
  ]);
  return (
    <HashRouter>
      <div className="flex flex-row w-screen h-screen">
        {showHelp && <GlobalHelp close={() => setShowHelp(false)} />}
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
