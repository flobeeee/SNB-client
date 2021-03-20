import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './pages/Login';
import Main from './pages/Main';
import Signup from './pages/Signup';

require('dotenv').config;

const App = () => {

  const [isLogin, setLogin] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const history = useHistory();


  const oauthLoginHandler = async (authorizationCode) => {
    let res = await axios.post(`${process.env.MAIN_SEVER_ADDRESS}/oauth/login`, { authorizationCode });

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

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
      oauthLoginHandler(authorizationCode);
    }
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path='/main'
          render={() => {
            return <Main logoutHandler={logoutHandler} userdata={userdata} />;
          }}>
        </Route>
        <Route exact path='/login'
          render={() => {
            return <Login login={login} />;
          }}>
        </Route>
        <Route exact path='/signup'
          render={() => {
            return <Signup />;
          }}>
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
    </div>


  );
};

export default withRouter(App);
