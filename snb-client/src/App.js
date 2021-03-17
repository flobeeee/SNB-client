import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './components/Login';
import Search from './components/Search';

const App = () => {
  const [isLogin, setLogin] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const getAccessToken = async (authorizationCode) => {
    let res = await axios.post('https://localhost:4000/oauth/login', { authorizationCode });

    setAccessToken(res.data.accessToken);
    login();
  };

  const login = () => {
    setLogin(!isLogin);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
  }, []);

  return (
    <Router>
      <Switch>
        {isLogin ? (
          <Search accessToken={accessToken} />
        ) : (<Login login={login} />)}
      </Switch>
    </Router>
  );
};

export default App;