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
      age: '',
      description: '',
      min_height_seek: 48,
      max_height_seek: 96,
      distance_seek: 100,
    };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.updateValue = this.updateValue.bind(this);
  // this.updateUsername = this.updateUsername.bind(this);
  // this.updatePassword = this.updatePassword.bind(this);
  }

  componentWillUnmount() {
    this.props.clearSessionErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.clearSessionErrors();
    //validate that all fields are filled. This is also done on backend,
    //but it will lighten the workload if done here as well as
    //elimiate lag when the zip code geocoding validation fails on backend
    let currentErrors = [];

    this.state.username === "" ? currentErrors.push("Username can't be blank") : null;
    this.state.first_name === "" ? currentErrors.push("First name can't be blank") : null;
    this.state.last_name === "" ? currentErrors.push("Last name can't be blank") : null;
    this.state.gender === "" ? currentErrors.push("Gender can't be blank") : null;
    this.state.birth_date === "" ? currentErrors.push("Birth date can't be blank") : null;
    this.state.zip_code === "" || this.state.zip_code.length != 5 ? currentErrors.push("Requires a valid zipcode") : null;
    this.state.password === "" || this.state.password.length < 6 ? currentErrors.push("Password is too short (minimum is 6 characters)") : null;

    if (currentErrors.length > 0) {
      this.props.receiveErrors(currentErrors);
      return;
    }

    const user = merge({}, this.state);
    // if validations above passed, some of the following attributes need to be set by default
    //sex_seek is set by default depending on the gender of user
    user.gender === "male" ? user.sex_seek = "Women" : user.sex_seek = "Men";
    //display name is set to the username
    user.display_name = user.username;
    //set the age based on birth_date
    let age =  Math.abs((new Date(Date.now() - (new Date(this.state.birth_date)
                  .getTime()))).getUTCFullYear() - 1970);

    user.age = age;
    //validate that user is 18 or older otherwise return out
    if (user.age < 18) {
      this.props.receiveErrors("Too young to date");
      return;
    }
    //set the default min_age_seek and max_age_seek
    if (user.age < 29) {
      user.min_age_seek = 18;
      user.max_age_seek = user.age + 10;
    } else {
      user.min_age_seek = user.age - 10;
      user.max_age_seek = user.age + 10;
    }

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

// {this.props.errors.map((error, idx) => <div className="login-form-error" key={idx}>{error}</div>)}

  errors() {
    let errors = this.props.errors;
    return errors;
  }

  render() {
    return (

      <div className="login-welcome-page">

        <section className="login-top">

          <Link className="logo" to='/'>
            <img src={fish} alt="fish"/>
            <span>Christian Singles</span>
          </Link>

          <section className="member-login-link-section">
            <span>Already a Member?</span>
            <Link className="link-to-log-in" to='/login' >Login Here</Link>
          </section>

        </section>

        <form className="login-form-section" id="sign-up-section-specific" onSubmit={(e) => this.handleSubmit(e)}>

          <section id="signup-form-box">

            <span className="signup-form-error">{this.errors().includes("Username can't be blank") ?
            "Username cannot be blank" : " "}</span>

            <label>{this.state.username ? "Username" : " "}</label>
              <input onChange={this.updateValue("username")} type="text"
              value={this.state.username} placeholder="Username"/>

            <span className="signup-form-error">{this.errors().includes("First name can't be blank") ?
            "First name cannot be blank" : " "}</span>

            <label>{this.state.first_name ? "First Name" : " "}</label>
              <input onChange={this.updateValue("first_name")}type="text"
              value={this.state.first_name} placeholder="First Name"/>

            <span className="signup-form-error">{this.errors().includes("Last name can't be blank") ?
            "Last name cannot be blank" : " "}</span>

            <label>{this.state.last_name ? "Last Name" : " "}</label>
              <input onChange={this.updateValue("last_name")} type="text"
              value={this.state.last_name} placeholder="Last Name"/>

            <span className="signup-form-error">{this.errors().includes("Gender can't be blank") ?
              "Gender cannot be blank" : " "}</span>

              <div className="gender-section">
                <label id="gender-signup-label">Male
                  <input onClick={this.updateValue("gender")} type="radio" name="gender"
                  value="male" />
                </label>

                <label id="gender-signup-label"> Female
                  <input onClick={this.updateValue("gender")} type="radio" name="gender"
                  value="female"/>
                </label>
              </div>

            <span className="signup-form-error">{this.errors().includes("Birth date can't be blank") ?
            "Birth date cannot be blank" : " "}</span>

          <span className="signup-form-error">{this.errors().includes("Too young to date") ?
            "You must be at least 18 years old to use this site" : " "}</span>

            <label>{this.state.birth_date ? "Birthday" : " "}</label>
              <input className="birth_date-input-field" onChange={this.updateValue("birth_date")} type="date"
              value={this.state.birth_date} placeholder="Birthday"/>

            <span className="signup-form-error">{this.errors().includes("Zipcode can't be blank") || this.errors().includes("Requires a valid zipcode")  ?
            "Requires a valid zip code" : " "}</span>

            <label>{this.state.zip_code ? "Zip Code" : " "}</label>
              <input onChange={this.updateValue("zip_code")} type= "number"
              value={this.state.zip_code} placeholder="Zip Code"/>

            <span className="signup-form-error">{this.errors().includes("Password is too short (minimum is 6 characters)") ?
            "Password is too short (minimum is 6 characters)" : " "}</span>

            <label>{this.state.password ? "Password" : " "}</label>
              <input onChange={this.updateValue("password")} type="password"
              value={this.state.password} placeholder="Password"/>

            <button>Sign Up</button>

          </section>

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
