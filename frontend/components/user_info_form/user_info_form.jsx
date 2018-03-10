import React from 'react';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';

class userInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: '',
      marital_status: ''
    };
  // this.handleSubmit = this.handleSubmit.bind(this);
  // this.updateValue = this.updateValue.bind(this);
  }

  // updateValue(field) {
  //   return (e) => this.setState({[field]: e.currentTarget.value});

  // }

  // handleSubmit(e) {
  //   e.preventDefault();
  //
  //   const user = merge({}, this.state, {id: this.props.currentUser.id});
  //   this.props.updateUserInfo(user);
  // }
  // <input onChange={this.updateValue("marital_status")} onBlur={(e) => this.handleSubmit(e)} type="text" value={this.state.marital_status}/>

  render() {
    return (
      <div>

        <h2>Edit Profile</h2>

        <div>PICS SECTION </div>

        <div className="main-info-fillout">

          <label>Display Name</label>
            <br/>
            <input type="text" value={this.state.display_name}/>
            <br/>

          <label>About You</label>
          <br/>
            LINK TO DESCRIPTION WILL GO HERE
          <br/>

          <label>Have Kids</label>
            <br/>
            <select>
              <option default hidden>Have kids</option>
              <option value="1">No kids</option>
              <option value="2">Have kids and they live with me</option>
              <option value="3">Have kids and they sometimes live with me</option>
              <option value="4">Have grown children</option>
            </select>
            <br/>

          <label>Marital Status</label>
            <br/>
            <select>
              <option default hidden>Marital Status</option>
              <option value="1">Divorced</option>
              <option value="2">Widowed</option>
              <option value="3">Never Married</option>
            </select>
            <br/>

          <label>Wllingness to Relocate</label>
            <br/>
            <select>
              <option default hidden>Willingness To Relocate</option>
              <option value="1">Would Consider Relocating</option>
              <option value="2">I'd Relocate</option>
              <option value="3">Won't Relocate</option>
            </select>
            <br/>

          <label>Religion</label>
            <br/>
            <select>
              <option default hidden>Religion</option>
              <option value="1">Anglican</option>
              <option value="2">Assembly of God</option>
              <option value="3">Baptist</option>
              <option value="4">Catholic</option>
              <option value="5">Charismatic</option>
              <option value="6">Christian Reformed</option>
              <option value="7">Church of Christ</option>
              <option value="8">Episcopalian/Anglican</option>
              <option value="9">Evangelical</option>
              <option value="10">Interdenominational</option>
              <option value="11">Lutheran</option>
              <option value="12">Messianic</option>
              <option value="13">Nazerene</option>
              <option value="14">Non-denominational</option>
              <option value="16">Not sure yet</option>
              <option value="17">Orthodox</option>
              <option value="18">Pentecostal</option>
              <option value="14">Presbyeterian</option>
              <option value="16">Seventh-Day Adventist</option>
              <option value="17">Southern Baptist</option>
              <option value="18">Other Religion</option>
            </select>
            <br/>

          <label>Church Attendance</label>
            <br/>
            <select>
              <option default hidden>Church Attendance</option>
              <option value="1">Attend church every week</option>
              <option value="2">Attend church on sepecial occasions</option>
              <option value="3">Attend church once or twice a month</option>
              <option value="3">Attend church several times a year</option>
            </select>
            <br/>

          <level>Level Of Education</level>
            <option default hidden>Level Of Education</option>
            <option value="1">High School</option>
            <option value="2">Some College</option>
            <option value="3">Bachelor's Degree</option>
            <option value="4">Master's Degree</option>
            <option value="5">JD/PhD/Post Doc</option>
            <br/>

          <label>Grew Up In</label>
            Grew up in google goes here
            <br/>

          ethnicity multiselect

          <br/>

          language multiselect

          <br/>

          pets multiselect

          <br/>

        <label>Drinking Habits</label>
          <br/>
          <select>
            <option default hidden>Drinking Habits</option>
            <option value="1">Drink Frequently</option>
            <option value="1">Drink Socially</option>
            <option value="2">Drink On Occassion</option>
            <option value="3">Never Drink</option>
          </select>
          <br/>

          <label>Smoking Habits</label>
            <br/>
            <select>
              <option default hidden>Smoking Habits</option>
              <option value="1">Smoke regularly</option>
              <option value="1">Smoke ocassionally</option>
              <option value="2">Non-Smoker</option>
              <option value="3">Trying to quit smoking</option>
            </select>
            <br/>


          SEARCH INTERESTS

          <br/>
          preferered first date multiselect

          <br/>

        discovery preferences link
        </div>

      </div>
    );
  }


}

export default userInfoForm;
