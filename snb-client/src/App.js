import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './pages/Login';
import Main from './pages/Main';
import Signup from './pages/Signup';

require('dotenv').config;
//let cb = null;

const App = () => {
  const [rendering, setRedering] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [userdata, setUserdata] = useState(null);


  const oauthLoginHandler = async (authorizationCode) => {
    let res = await axios.post(`${process.env.MAIN_SEVER_ADDRESS}/oauth/login`, { authorizationCode });

    login(res.data);
  };

  const logoutHandler = (callback) => {
    //console.log('cb위', cb);
    //cb = callback;
    //console.log('cd밑', cb);
    setLogin(false);
    //callback();
  };

  const login = (data) => {
    setLogin(true);
    setUserdata(data);
  };

  useEffect(() => {
    console.log('useEffect', isLogin);
    // console.log('if문 밖입니다', cb);
    // if (typeof cb === 'function') {
    //   console.log('if문 안입니다', cb);
    //   cb();
    // }
    setRedering(preV=>!preV);
  }, [isLogin]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
      oauthLoginHandler(authorizationCode);
    }
  }, []);
  console.log('여기는 /', isLogin, window.location.href);
  return (
    <div>
      <Switch>
        <Route exact path='/main'
          render={() => {
            console.log('여기는 /main', isLogin, window.location.href);
            return <Main logoutHandler={logoutHandler} userdata={userdata} />;
          }}>
        </Route>
        <Route exact path='/login'
          render={() => {
            console.log('여기는 /login', isLogin, window.location.href);
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
            console.log('redirect!');
            console.log('여기는 / refirect', isLogin, window.location.href);
            if (isLogin) {
              console.log('login true');
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
