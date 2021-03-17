import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Signup.css';

const Signup = () => {

  const [userEmail, setuserEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [userName, setuserName] = useState('');

  const handleInputValue = () => {
    // eslint-disable-next-line no-empty
    if (userEmail === '' || userPassword === '' || userName === '') {
      alert('모든 정보를 입력하세요');
    } else {
      axios.post('https://songnumberbook.ga:4000/signup',
        { email: userEmail, password: userPassword, username: userName },
        { 'Content-Type': 'application/json', withCredentials: true })
        .then(res => {
          history.push('/search');
        });

    }
  };

  return (
    <div className='signup'>
      <input className="signup-email" placeholder="Email"
        type="email" onChange={e => setuserEmail(e.target.value)} />
      <input className="signup-username" placeholder="UserName"
        type="text" onChange={e => setuserName(e.target.value)} />
      <input className="login-password" placeholder="Password"
        type="password" onChange={e => setPassword(e.target.value)} />
      <button className='signup-button' onClick={() => handleInputValue()}>회원가입</button>
    </div>
  );
};

export default Signup;
