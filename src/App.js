import React from 'react';
import Home from './pages/Home/Home';
import Country from './pages/Country/Country';
import FourZeroFour from './pages/FourZeroFour/FourZeroFour';
import ThemeToggler from './components/ThemeToggler/ThemeToggler';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <ThemeToggler />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/country/:name">
          <Country />
        </Route>
        <Route path="*">
          <FourZeroFour />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
