import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './components/Login';
import Main from './components/Main';
import Signup from './components/Signup';

require('dotenv').config;

const App = () => {
  const [isLogin, setLogin] = useState(false);
  const [userdata, setUserdata] = useState(null);

  const oauthLoginHandler = async (authorizationCode) => {
    let res = await axios.post(`${process.env.MAIN_SEVER_ADDRESS}/oauth/login`, { authorizationCode });

    login(res.data);
  };

  const login = (data) => {
    setLogin(!isLogin);
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
          <Main login={login} userdata={userdata} />
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

// return (
//   <Router>
//     <Switch>
//       <Route
//         exact path='/'
//         render={() => {
//           if (isLogin) {
//             return <Search accessToken={accessToken} />;
//           }
//           return <Login login={login} />;
//         }}
//       />
//       <Route exact path='/signup'>
//         <Signup />
//       </Route>
//     </Switch>
//   </Router>
// );
// };
