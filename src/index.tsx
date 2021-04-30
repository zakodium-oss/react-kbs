import React from 'react';
import ReactDOM from 'react-dom';

import { KbsProvider } from './component';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <KbsProvider />
  </React.StrictMode>,
  document.getElementById('root'),
);
