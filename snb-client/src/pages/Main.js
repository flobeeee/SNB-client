import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Search from './Search';
import Mypage from './Mypage';

const Main = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/mypage">
          <Mypage />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch >
    </Router >
  );
};

export default Main;