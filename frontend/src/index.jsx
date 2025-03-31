import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import './index.css';
import App from './App';
import { AppProvider } from './store';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);