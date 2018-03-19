import React from 'react';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';

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
      password: '',
      sex_seek: '',
      display_name: '',
      last_online: '',
      min_age_seek: '',
      max_age_seek: '',
      age: ''
    };

  this.handleSubmit = this.handleSubmit.bind(this);
  // this.updateUsername = this.updateUsername.bind(this);
  // this.updatePassword = this.updatePassword.bind(this);
  this.updateValue = this.updateValue.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);

    //set the zip code to an integer for the back end
    const zip_code = parseInt(user["zip_code"]);
    user["zip_code"] = zip_code;

    //set the default sex_seek to the opposite gender
    let sex_seek = "";
    if (user["gender"] === "male") {
      sex_seek = "Women";
    } else {

      sex_seek = "Men";
    }

    user["sex_seek"] = sex_seek

    //set the default display name to username
    user["display_name"] = this.state.username;
    //set the current age
    user["age"] = Math.abs((new Date(Date.now() - (new Date(user["birth_date"])
                  .getTime()))).getUTCFullYear() - 1970);

    //set min age and max age

    user["min_age_seek"] = user["age"] - 10;
    user["max_age_seek"] = user["age"] + 10;

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


    <div className="login-welcome-page">

      <div className="login-nav">
        <div className="login-logo">
          <img className="login-fish" src={fish} alt="fish"/>
          <Link to='/' className="login-logo-text">Christian Singles</Link>
        </div>
        <div className="form-link-to-sign-up-container">
          <div className="nav-text">Already a Member?</div>
          <Link className="link nav-linker" to='/login' >Login Here</Link>
        </div>
      </div>

      <br/>
      <form className="sign-up-form-container" onSubmit={(e) => this.handleSubmit(e)}>

        <div className="login-form">
          {this.props.errors.map(error => <div className="login-form-error">{error}</div>)}
          <label className="login-field">Username</label>
          <br/>
          <input className="login-input" onChange={this.updateValue("username")} type="text" value={this.state.username}/>
          <br/>
          <br/>


          <label className="login-field">First Name</label>
          <br/>
          <input className="login-input" onChange={this.updateValue("first_name")}type="text" value={this.state.first_name}/>
          <br/>
          <br/>
          <label className="login-field">Last Name</label>
          <br/>
          <input className="login-input" onChange={this.updateValue("last_name")} type="text" value={this.state.last_name}/>

          <br/>
            <p className="login-field">I am a:</p>
            <input onClick={this.updateValue("gender")} type="radio" name="gender" value="male" /> Male
            <input onClick={this.updateValue("gender")} type="radio" name="gender" value="female"/> Female
            <br/>
            <br/>

          <label className="login-field">Birthday</label>
            <br/>
            <input className="birth_date-input-field" onChange={this.updateValue("birth_date")} type="date" value={this.state.birth_date} />
            <br/>
            <br/>
          <label className="login-field">Zip Code</label>
          <br/>
            <input className="login-input" onChange={this.updateValue("zip_code")} type= "number" value={this.state.zip_code} />



          <br/>
          <br/>
          <label className="login-field">Password</label>
          <br/>
          <input className="login-input" onChange={this.updateValue("password")} type="password" value={this.state.password}/>
          <br/>
          <br/>
        <button className="login-button" >Sign Up</button>
        </div>
      </form>
    </div>
   );
  };
};

export default SignupForm;

//original function to calc age, used in handle submit above
// calculate_age(dob) {
//   let diff_ms = Date.now() - dob.getTime();
//   let age_dt = new Date(diff_ms);
//   return Math.abs(age_dt.getUTCFullYear() - 1970);
// }
