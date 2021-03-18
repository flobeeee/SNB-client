import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './pages/Login';
import Main from './pages/Main';
import Signup from './pages/Signup';

require('dotenv').config;

const App = () => {
  const [isLogin, setLogin] = useState(false);
  const [userdata, setUserdata] = useState(null);

  const oauthLoginHandler = async (authorizationCode) => {
    let res = await axios.post(`${process.env.MAIN_SEVER_ADDRESS}/oauth/login`, { authorizationCode });

    login(res.data);
  };

  const logoutHandler = () => {
    setLogin(false);
  };

  const login = (data) => {
    setLogin(true);
    setUserdata(data);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
      oauthLoginHandler(authorizationCode);
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login login={login} />
        </Route>
        <Route path='/main'>
          <Main logoutHandler={logoutHandler} userdata={userdata} />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route
          path='/'
          render={() => {
            if (isLogin) {
              return <Redirect to='/main' />;
            }
            return <Redirect to='/login' />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default App;
