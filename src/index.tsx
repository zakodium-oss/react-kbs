import React from 'react';
import ReactDOM from 'react-dom';

import { KbsProvider } from './component';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <KbsProvider>
      <div>TEST</div>
    </KbsProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
