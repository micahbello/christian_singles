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

  componentDidMount() {
    window.scrollTo(0,0);
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

      <div className="login-welcome-page">

        <section className="login-top">

          <Link className="logo" to='/'>
            <img src={fish} alt="fish"/>
            <span>Christian Singles</span>
          </Link>

          <section>
            <Link className="form-link-to-sign-up" to='/signup'>Sign Up</Link>
          </section>

        </section>

        <form className="login-form-section" onSubmit={(e) => this.handleSubmit(e)}>

          <section>

            <span className="login-form-error">
              {this.props.errors.join(", ")}
            </span>

            <label>{this.state.username ? "Username" : " "}</label>
              <input id="username" onChange={this.updateUsername} type="text"
                     placeholder= "Username" value={this.state.username}/>

            <label>{this.state.password ? "Password" : " "}</label>
              <input id="password" onChange={this.updatePassword} type="password"
                     placeholder="Password" value={this.state.password}/>

            <button>Login</button>

          </section>

        </form>

      </div>

   );
  };
};

export default LoginForm;
