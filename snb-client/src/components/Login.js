import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const socialLoginHandler = () => {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=a9141b639cb5a1982bb6');
  };

  const loginRequestHandler = async () => {
    await axios.post('https://localhost:4000/login',
      { email, password },
      { 'Content-Type': 'application/json', withCredentials: true })
      .then(() => props.login())
      .then(() => history.push('/search'));
  };

  return (
    <div className="login-box">
      <div className="login-title">Login</div>
      <div className="login-items">
        <div className="login-input">
          <input
            name="email"
            className="login-email"
            placeholder="Email"
            type="email"
            onChange={({ target: { value } }) => setEmail(value)}
            value={email}
          />
          <input
            name="password"
            className="login-password"
            placeholder="Password"
            type="password"
            onChange={({ target: { value } }) => setPassword(value)}
            value={password}
          />
        </div>
        <div className="login-btns">
          <button className="login-signin" onClick={loginRequestHandler}>로그인</button>
          <button className="login-signup" onClick={() => history.push('/signup')}>회원가입</button>
          <button className="login-github" onClick={socialLoginHandler}>Github Login</button>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func
};

export default Login;