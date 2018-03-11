import React from 'react';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';
import TopHeaderContainer from '../top_header/top_header_container';

class userInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: '',
      marital_status: '',
      height: '',
      want_kids: '',
      have_kids: '',
      relocate: '',
      religion: '',
      attendance: '',
      occupation: '',
      education: '',
      place_as_child: '',
      ethnicity: '',
      language: '',
      pets: '',
      smoke: '',
      drink: '',
      first_date: ''
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
      <div className="edit-profile-page">
        <TopHeaderContainer />

        <h2 className="edit-profile-text">Edit Profile</h2>

        <div className="info-forms">


        <div className="main-info-fillout">

          <label className="user-info-input-label">{(this.state.display_name !== '')
            ? "Display Name" : ""}</label>
            <br/>
            <input className="user-info-input-box" type="text" value={this.state.display_name ? this.state.display_name : " Display Name"}/>
            <br/>
            <br/>

          <label>About You</label>
          <br/>
            link will go here
          <br/>
          <br/>


          <label className="user-info-input-label">{(this.state.display_name !== '')
            ? "Have Kids" : ""}</label>
            <br/>
            <select className="user-info-select-box">
              <option default hidden>Have kids</option>
              <option value="1">No kids</option>
              <option value="2">Have kids and they live with me</option>
              <option value="3">Have kids and they sometimes live with me</option>
              <option value="4">Have grown children</option>
            </select>
            <br/>
            <br/>

          <label className="user-info-input-label">{(this.state.display_name !== '')
            ? "Marital Status" : ""}</label>
            <br/>
            <select className="user-info-select-box">
              <option default hidden>Marital Status</option>
              <option value="1">Divorced</option>
              <option value="2">Widowed</option>
              <option value="3">Never Married</option>
            </select>
            <br/>
            <br/>


          <label className="user-info-input-label">{(this.state.display_name !== '')
            ? "Willingness to Relocate" : ""}</label>
            <br/>
            <select className="user-info-select-box">
              <option default hidden>Willingness To Relocate</option>
              <option value="1">Would Consider Relocating</option>
              <option value="2">I'd Relocate</option>
              <option value="3">Won't Relocate</option>
            </select>
            <br/>
            <br/>

          <label className="user-info-input-label">{(this.state.display_name !== '')
            ? "Religion" : ""}</label>
            <br/>
            <select className="user-info-select-box">
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
            <br/>

          <label className="user-info-input-label">{(this.state.display_name !== '')
            ? "Church Attendance" : ""}</label>
            <br/>
            <select className="user-info-select-box">
              <option default hidden>Church Attendance</option>
              <option value="1">Attend church every week</option>
              <option value="2">Attend church on sepecial occasions</option>
              <option value="3">Attend church once or twice a month</option>
              <option value="3">Attend church several times a year</option>
            </select>
            <br/>
            <br/>

          <label className="user-info-input-label">{(this.state.display_name !== '')
            ? "Level of Education" : ""}</label>
          <br/>
          <select className="user-info-select-box">
            <option default hidden>Level Of Education</option>
            <option value="1">High School</option>
            <option value="2">Some College</option>
            <option value="3">Bachelor's Degree</option>
            <option value="4">Master's Degree</option>
            <option value="5">JD/PhD/Post Doc</option>
          </select>
            <br/>
            <br/>

          <label>Grew Up In</label>
            Grew up in google goes here
            <br/>
            <br/>

          ethnicity multiselect

          <br/>
          <br/>

          language multiselect

          <br/>
          <br/>

          pets multiselect

          <br/>
          <br/>

        <label className="user-info-input-label">{(this.state.display_name !== '')
          ? "Drinking Habits" : ""}</label>
          <br/>
          <select className="user-info-select-box">
            <option default hidden>Drinking Habits</option>
            <option value="1">Drink Frequently</option>
            <option value="1">Drink Socially</option>
            <option value="2">Drink On Occassion</option>
            <option value="3">Never Drink</option>
          </select>
          <br/>
          <br/>

          <label className="user-info-input-label">{(this.state.display_name !== '')
            ? "Smoking Habits" : ""}</label>
            <br/>
            <select className="user-info-select-box">
              <option default hidden>Smoking Habits</option>
              <option value="1">Smoke regularly</option>
              <option value="1">Smoke ocassionally</option>
              <option value="2">Non-Smoker</option>
              <option value="3">Trying to quit smoking</option>
            </select>
            <br/>
            <br/>


          SEARCH INTERESTS

          <br/>
          <br/>
          preferered first date multiselect

          <br/>
          <br/>

        discovery preferences link
          <br/>
        </div>

        </div>

      </div>
    );
  }


}

export default userInfoForm;
