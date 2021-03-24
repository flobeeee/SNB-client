import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import dotenv from 'dotenv';

import './Signup.css';

dotenv.config();

const Signup = (props) => {

  const history = useHistory();

  const [userEmail, setuserEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [userName, setuserName] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errormessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const isEmail = (asValue) => {
    // eslint-disable-next-line no-useless-escape
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴	
  };

  const handleInputValue = () => {
    // eslint-disable-next-line no-empty
    if (userEmail === '' || userPassword === '' || userName === '') {
      setErrorMessage('모든 정보를 입력해야 합니다.');
    } else if (userPassword !== passwordCheck) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
    } else if (userPassword.length < 4) {
      setErrorMessage('비밀번호 길이는 4글자 이상이어야 합니다.');
    } else if (userName.length > 8 || userName.length < 1) {
      setErrorMessage('이름은 4글자 이상 8글자 이이어야 합니다');
    } else if (!isEmail(userEmail)) {
      setErrorMessage('이메일 형식이 올바르지 않습니다.');
    } else {
      axios.post(`${process.env.REACT_APP_MAIN_SERVER_ADDRESS}/signup`,
        { email: userEmail, password: userPassword, username: userName },
        { 'Content-Type': 'application/json', withCredentials: true })
        .then(res => {
          props.login(res.data);
          history.push('/');
        });
    }
  };

  const onchangePasswordCheck = (e) => {
    setPasswordError(e.target.value !== userPassword);
    setPasswordCheck(e.target.value);
  };

  return (
    <div className="login-container">
      <div className="login-neon">Song Number Book ♬</div>
      <div className="signup">
        <div className="signup-inputbox">
          <input className="signup-email" placeholder="Email"
            type="email" onChange={e => setuserEmail(e.target.value)} />
          <input className="signup-username" placeholder="UserName"
            type="text" onChange={e => setuserName(e.target.value)} />
          <input className="signup-password" placeholder="Password"
            type="password" onChange={e => setPassword(e.target.value)} />
          <input className="signup-check" placeholder="Password Check"
            type="password" onChange={onchangePasswordCheck} />
        </div>
        {passwordError || errormessage !== ''
          ? (<div className="signup-error">{errormessage}</div>)
          : (<div></div>)}
        <div className="signup-buttonbox">
          <button className="signup-button" onClick={() => history.push('/login')}>돌아가기</button>
          <button className="signup-button" onClick={() => handleInputValue()}>회원가입</button>
        </div>
      </div>
    </div>
  );
};
Signup.propTypes = {
  login: PropTypes.func
};

export default Signup;
