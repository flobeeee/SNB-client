import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();
  const socialLoginHandler = () => {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=a9141b639cb5a1982bb6');
  };

  const loginRequestHandler = async () => {
    await axios.post(`${process.env.REACT_APP_MAIN_SERVER_ADDRESS}/login`,
      { email, password },
      { 'Content-Type': 'application/json', withCredentials: true })
      .then((res) => props.login(res.data))
      .then(() => history.push('/'))
      .catch((err) => {
        setErrorMessage('이메일 또는 비밀번호가 올바르지 않습니다.');
      });
  };

  const guestLoginHandler = async () => {
    const email = 'user1@gmail.com';
    const password = '1234';
    await axios.post(`${process.env.REACT_APP_MAIN_SERVER_ADDRESS}/login`,
      { email, password },
      { 'Content-Type': 'application/json', withCredentials: true })
      .then((res) => props.login(res.data))
      .then(() => history.push('/'));
  };

  return (
    <div className="login-container">
      <div className="login-neon">Song Number Book ♬</div>
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
          {
            errorMessage !== ''
              ? (<div className="login-err">{errorMessage}</div>)
              : <div></div>
          }
          <div className="login-btns">
            <button className="login-signin" onClick={loginRequestHandler}>로그인</button>
            <button className="login-signup" onClick={() => history.push('/signup')}>회원가입</button>
            <div className="login-gbox">
              <button className="login-guest" onClick={guestLoginHandler}>Guest Login</button>
              <button className="login-github" onClick={socialLoginHandler}>Github Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func
};

export default Login;