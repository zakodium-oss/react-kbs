import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/App';
import { KbsProvider } from './component';

import './index.css';

const root = document.querySelector('#root');
if (!root) {
  throw new Error('No root element found');
}

createRoot(root).render(
  <StrictMode>
    <KbsProvider>
      <App />
    </KbsProvider>
  </StrictMode>,
);
