import React from 'react';
import { merge } from 'lodash';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      gender: '',
      birth_date: '',
      zip_code: '',
      password: ''
    };

  this.handleSubmit = this.handleSubmit.bind(this);
  // this.updateUsername = this.updateUsername.bind(this);
  // this.updatePassword = this.updatePassword.bind(this);
  this.updateValue = this.updateValue.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    const zip_code = parseInt(user["zip_code"]);
    user["zip_code"] = zip_code;
    this.props.signup(user);
  }

  updateValue(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }

  // updateUsername(e) {
  //   this.setState({username: e.target.value});
  // }
  //
  // updatePassword(e) {
  //   this.setState({password: e.target.value});
  // }

  render () {
    return (
    <div>
      <p>temporary signup form header</p>
      {this.props.errors.map(error => <div>{error}</div>)}
      <br/>
      <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>Username</label>
          <br/>
          <input onChange={this.updateValue("username")} type="text" value={this.state.username}/>
          <br/>
          <br/>


          <label>First Name</label>
          <br/>
          <input onChange={this.updateValue("first_name")}type="text" value={this.state.first_name}/>
          <br/>
          <br/>
          <label>Last Name</label>
          <br/>
          <input onChange={this.updateValue("last_name")} type="text" value={this.state.last_name}/>

          <br/>
            <p>I am a:</p>
            <input onClick={this.updateValue("gender")} type="radio" name="gender" value="male" /> Male
            <input onClick={this.updateValue("gender")} type="radio" name="gender" value="female"/> Female
            <br/>
            <br/>

          <label>Birthday</label>
            <br/>
            <input onChange={this.updateValue("birth_date")} type="date" value={this.state.birth_date} />
            <br/>
            <br/>
          <label>Zip Code</label>
          <br/>
            <input onChange={this.updateValue("zip_code")} type= "number" value={this.state.zip_code} />



          <br/>
          <br/>
          <label>Password</label>
          <br/>
          <input onChange={this.updateValue("password")} type="password" value={this.state.password}/>
          <br/>
          <br/>
        <button>Sign Up</button>
      </form>
    </div>
   );
  };
};

export default SignupForm;
