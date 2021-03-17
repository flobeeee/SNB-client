import React from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.socialLoginHandler = this.socialLoginHandler.bind(this);
    this.loginRequestHandler = this.loginRequestHandler.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  socialLoginHandler() {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=a9141b639cb5a1982bb6');
  }

  async loginRequestHandler() {
    const { email, password } = this.state;
    await axios.post('https://songnumberbook.ga:4000/login',
      { email, password },
      { 'Content-Type': 'application/json', withCredentials: true });
    this.props.login();
  }

  render() {
    return (
      <div className="login-box" >
        <div className="login-title">Login</div>
        <div className="login-items">
          <div className="login-input">
            <input
              name="email"
              className="login-email"
              placeholder="Email"
              type="email"
              onChange={(e) => this.inputHandler(e)}
              value={this.state.email}
            />
            <input
              name="password"
              className="login-password"
              placeholder="Password"
              type="password"
              onChange={(e) => this.inputHandler(e)}
              value={this.state.password}
            />
          </div>
          <div className="login-btns">
            <button className="login-signin" onClick={this.loginRequestHandler}>로그인</button>
            <button className="login-signup">회원가입</button>
            <button className="login-github" onClick={this.socialLoginHandler}>Github Login</button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func
};

export default Login;