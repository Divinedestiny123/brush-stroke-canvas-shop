
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Using JSX-style code while maintaining TypeScript compatibility
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
