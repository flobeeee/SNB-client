import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';

import Login from './pages/Login';
import Main from './pages/Main';
import Signup from './pages/Signup';
import './App.css';

dotenv.config();

const App = () => {

  const [isLogin, setLogin] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const history = useHistory();

  const oauthLoginHandler = async (authorizationCode) => {
    let res = await axios.post(`${process.env.REACT_APP_MAIN_SERVER_ADDRESS}/oauth/login`, { authorizationCode });

    login(res.data);
  };

  const logoutHandler = () => {

    setLogin(false);
    history.push('/');
  };

  const login = (data) => {
    setLogin(true);
    setUserdata(data);
  };

  const listHandler = (lists) => {
    const { username, email, createdAt } = userdata;
    setUserdata({ username, email, createdAt, lists });
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
      oauthLoginHandler(authorizationCode);
    }
  }, []);

  return (
    <>
      <Switch>
        <Route path='/login'
          render={() => {
            return <Login login={login} />;
          }}>
        </Route>
        <Route exact path='/main'
          render={() => {
            return <Main logoutHandler={logoutHandler} userdata={userdata} listHandler={listHandler} />;
          }}>
        </Route>
        <Route exact path='/signup'
          render={() => {
            return <Signup login={login} />;
          }}>
        </Route>
        <Route
          exact path='/'
          render={() => {
            if (isLogin) {
              return <Redirect to='/main' />;
            }
            return <Redirect to='/login' />;
          }}
        />
      </Switch>
    </>
  );
};

export default withRouter(App);
