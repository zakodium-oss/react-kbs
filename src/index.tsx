import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app/App';
import { KbsProvider } from './component';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <KbsProvider>
      <App />
    </KbsProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
