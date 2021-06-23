import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './styles/main.scss';
import HomeView from './views/home.view';
import PageNotFoundView from './views/pagenotfound.view';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route component={PageNotFoundView} />
      </Switch>
    </HashRouter>
  );
};

export default App;
