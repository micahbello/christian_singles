import React from 'react';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.updateUsername = this.updateUsername.bind(this);
  this.updatePassword = this.updatePassword.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props.login(user);
  }

  updateUsername(e) {
    this.setState({username: e.target.value});
  }

  updatePassword(e) {
    this.setState({password: e.target.value});
  }

  render () {
    return (
    <div class="login-welcome-page">

    <div class="login-nav">
      <div class="login-logo">
        <img class="login-fish" src={fish} alt="fish"/>
        <h1 class="login-heading-1"></h1>
      </div>
      <div class="form-link-to-sign-up-container">
        <Link class="form-link-to-sign-up" to='/signup'>Sign Up</Link>
      </div>
    </div>

      <br/>
      <form class="login-form-container" onSubmit={(e) => this.handleSubmit(e)}>
        <div class="login-form">
      {this.props.errors.map(error => <div class="login-form-error">{error}</div>)}
          <label class="login-field">Username</label>
          <br/>
          <input class="login-input" onChange={this.updateUsername} type="text" value={this.state.username}/>
          <br/>
          <br/>
          <br/>
          <br/>
          <label class="login-field">Password</label>
          <br/>
          <input class="login-input" onChange={this.updatePassword} type="password" value={this.state.password}/>
          <br/>
          <br/>
        <button class="login-button">Login</button>
        </div>
      </form>
    </div>
   );
  };
};

export default LoginForm;
