import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { lightTheme } from './theme';

const el = document.getElementById('root') as HTMLDivElement | DocumentFragment;
const root = ReactDOM.createRoot(el);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);