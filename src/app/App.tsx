import { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { useKbsGlobal } from '../component';

import Dashboard from './Dashboard';
import GlobalHelp from './GlobalHelp';
import Navigation from './Navigation';
import Projects from './Projects';
import Team from './Team';

declare module '../component' {
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
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/team" component={Team} />
          <Route exact path="/projects" component={Projects} />
        </Switch>
      </div>
    </HashRouter>
  );
}
