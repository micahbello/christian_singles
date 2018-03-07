import React from 'react';
import { merge } from 'lodash';

class SignupForm extends React.Component {
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
    this.props.signup(user);
  }

  updateUsername(e) {
    this.setState({username: e.target.value});
  }

  updatePassword(e) {
    this.setState({password: e.target.value});
  }

  render () {
    return (
    <div>
      <p>temporary signup form header</p>
      {this.props.errors.map(error => <div>{error}</div>)}
      <br/>
      <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>Username</label>
          <br/>
          <input onChange={this.updateUsername} type="text" value={this.state.username}/>
          <br/>
          <br/>
          <label>Password</label>
          <br/>
          <input onChange={this.updatePassword} type="password" value={this.state.password}/>
          <br/>
          <br/>
        <button>Sign Up</button>
      </form>
    </div>
   );
  };
};

export default SignupForm;
