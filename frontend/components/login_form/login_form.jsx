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
    debugger
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
    <div className="login-welcome-page">

    <div className="login-nav">
      <div className="login-logo">
        <img className="login-fish" src={fish} alt="fish"/>
        <Link to='/' className="login-logo-text">Christian Singles</Link>
      </div>
      <div className="form-link-to-sign-up-container">
        <Link className="form-link-to-sign-up" to='/signup'>Sign Up</Link>
      </div>
    </div>

      <br/>
      <form className="login-form-container" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="login-form">
      {this.props.errors.map(error => <div className="login-form-error">{error}</div>)}
          <label className="login-field">Username</label>
          <br/>
          <input className="login-input" onChange={this.updateUsername} type="text" value={this.state.username}/>
          <br/>
          <br/>
          <br/>
          <br/>
          <label className="login-field">Password</label>
          <br/>
          <input className="login-input" onChange={this.updatePassword} type="password" value={this.state.password}/>
          <br/>
          <br/>
        <button className="login-button">Login</button>
        </div>
      </form>
    </div>
   );
  };
};

export default LoginForm;
