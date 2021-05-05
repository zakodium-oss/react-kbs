import { HashRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import Navigation from './Navigation';

export function App() {
  return (
    <HashRouter>
      <div className="flex flex-row w-screen h-screen">
        <Navigation />
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </div>
    </HashRouter>
  );
}
