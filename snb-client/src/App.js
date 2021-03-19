import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './pages/Login';
import Main from './pages/Main';
import Signup from './pages/Signup';

require('dotenv').config;
let cb = null;

const App = () => {
  const [isLogin, setLogin] = useState(false);
  const [userdata, setUserdata] = useState(null);


  const oauthLoginHandler = async (authorizationCode) => {
    let res = await axios.post(`${process.env.MAIN_SEVER_ADDRESS}/oauth/login`, { authorizationCode });

    login(res.data);
  };

  const logoutHandler = (callback) => {
    console.log('cb위', cb);
    cb = callback;
    console.log('cd밑', cb);
    setLogin(false);

  };

  const login = (data) => {
    setLogin(true);
    setUserdata(data);
  };

  useEffect(() => {
    console.log('if문 밖입니다', cb);
    if (typeof cb === 'function') {
      console.log('if문 안입니다', cb);
      cb();
    }
  }, [isLogin]);

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
        <Route path='/login'
          render={() => {
            return <Login login={login} />;
          }}>
        </Route>
        <Route exact path='/main'
          render={() => {
            return <Main logoutHandler={logoutHandler} userdata={userdata} />;
          }}>
        </Route>
        <Route exact path='/signup'
          render={() => {
            return <Signup />;
          }}>
        </Route>
        <Route
          exact path='/'
          render={() => {
            if (isLogin) {
              alert('로그인');
              return <Redirect to='/main' />;
            }
            alert('리다이렉트');
            return <Redirect to='/login' />;
          }}
        />
      </Switch>
    </div>


  );
};

export default withRouter(App);
