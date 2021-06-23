import React, { useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { getLatest } from './models/screentext';
import './styles/main.scss';
import HomeView from './views/home.view';
import PageNotFoundView from './views/pagenotfound.view';

const App = () => {
  useEffect(() => {
    getLatest()
      .then((resp) => {
        console.log('resp', resp);
      })
      .catch((e) => console.log('err', e));
  }, []);
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
