import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { App } from './app/App';
import { KbsProvider } from './component';

import './index.css';

ReactDOM.render(
  <StrictMode>
    <KbsProvider>
      <App />
    </KbsProvider>
  </StrictMode>,
  document.getElementById('root'),
);
