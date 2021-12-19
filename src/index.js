import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { DarkmodeProvider } from './contexts/darkmode-context';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkmodeProvider>
        <App />
      </DarkmodeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
