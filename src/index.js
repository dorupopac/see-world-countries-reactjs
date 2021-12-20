import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { DarkmodeProvider } from './contexts/darkmode-context';
import { BrowserRouter } from 'react-router-dom';
import { CountriesProvider } from './contexts/countries-context';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkmodeProvider>
        <CountriesProvider>
          <App />
        </CountriesProvider>
      </DarkmodeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
