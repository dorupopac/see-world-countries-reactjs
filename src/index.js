import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { DarkmodeProvider } from './contexts/darkmode-context';

ReactDOM.render(
  <React.StrictMode>
    <DarkmodeProvider>
      <App />
    </DarkmodeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
