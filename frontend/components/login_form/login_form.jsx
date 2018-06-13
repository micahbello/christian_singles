import React from 'react';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.updateUsername = this.updateUsername.bind(this);
  this.updatePassword = this.updatePassword.bind(this);
  }

  componentWillUnmount() {
    this.props.clearSessionErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.clearSessionErrors();

    const user = merge({}, this.state);
    this.props.login(user);
  }

  updateUsername(e) {
    this.setState({username: e.target.value});
  }

  updatePassword(e) {
    this.setState({password: e.target.value});
  }

  render() {
    return (
    <div>
      <div className="login-welcome-page">

        <section className="login-top">

          <figure>
            <img src={fish} alt="fish"/>
            <Link to='/' className="login-logo-text">Christian Singles</Link>
          </figure>

          <section className="form-link-to-sign-up-section">
            <Link className="form-link-to-sign-up" to='/signup'>Sign Up</Link>
          </section>

        </section>

        <section className="login-form-error">
          {this.props.errors.join(", ")}
        </section>

        <form className="login-form-section" onSubmit={(e) => this.handleSubmit(e)}>

          <section>

            <label for="username">Username</label>
              <input id="username" onChange={this.updateUsername} type="text" value={this.state.username}/>
            <label for="password">Password</label>
              <input id="password" onChange={this.updatePassword} type="password" value={this.state.password}/>
            <button>Login</button>

          </section>

        </form>

      </div>
    <Footer/>
  </div>
   );
  };
};

export default LoginForm;
