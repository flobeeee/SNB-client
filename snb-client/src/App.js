import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';

const App = () => {
  const [isLogin, setLogin] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get('code');

  if (authorizationCode) {
    setAccessToken(authorizationCode);
  }

  return (
    <Router>
      {isLogin ? (
        <Search accessToken={accessToken} />
      ) : (<Login login={setLogin} />)}
    </Router>
  );
};

export default App;