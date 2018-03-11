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
  this.handleSubmit = this.handleSubmit.bind(this);
  this.updateValue = this.updateValue.bind(this);
  }

  updateValue(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});

  }

  handleSubmit(e) {
    e.preventDefault();

    const user = merge({}, this.state, {id: this.props.currentUser.id});
    this.props.updateUserInfo(user);
  }
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
            <input onChange={this.updateValue("display_name")}
              onBlur={(e) => this.handleSubmit(e)}
              className="user-info-input-box" type="text"
              value={this.state.display_name ? this.state.display_name : " Display Name"}/>
            <br/>
            <br/>

          <label>About You</label>
          <br/>
            link will go here
          <br/>
          <br/>


          <label className="user-info-input-label">{(this.state.have_kids !== '')
            ? "Have Kids" : ""}</label>
            <br/>
            <select onChange={this.updateValue("have_kids")}
              onBlur={(e) => this.handleSubmit(e)}
              className="user-info-select-box">
              <option default hidden>Have kids</option>
              <option value="no">No kids</option>
              <option value="kids_live">Have kids and they live with me</option>
              <option value="kids_sometimes">Have kids and they sometimes live with me</option>
              <option value="grown">Have grown children</option>
            </select>
            <br/>
            <br/>

          <label className="user-info-input-label">{(this.state.marital_status !== '')
            ? "Marital Status" : ""}</label>
            <br/>
            <select onChange={this.updateValue("marital_status")}
              onBlur={(e) => this.handleSubmit(e)}
              className="user-info-select-box">
              <option default hidden>Marital Status</option>
              <option value="div">Divorced</option>
              <option value="wid">Widowed</option>
              <option value="never">Never Married</option>
            </select>
            <br/>
            <br/>


          <label className="user-info-input-label">{(this.state.relocate !== '')
            ? "Willingness to Relocate" : ""}</label>
            <br/>
            <select onChange={this.updateValue("relocate")}
              onBlur={(e) => this.handleSubmit(e)}
              className="user-info-select-box">
              <option default hidden>Willingness To Relocate</option>
              <option value="consider">Would Consider Relocating</option>
              <option value="yes">I'd Relocate</option>
              <option value="no">Won't Relocate</option>
            </select>
            <br/>
            <br/>

          <label className="user-info-input-label">{(this.state.religion !== '')
            ? "Religion" : ""}</label>
            <br/>
            <select onChange={this.updateValue("religion")}
              onBlur={(e) => this.handleSubmit(e)}
              className="user-info-select-box">
              <option default hidden>Religion</option>
              <option value="ang">Anglican</option>
              <option value="ass">Assembly of God</option>
              <option value="bap">Baptist</option>
              <option value="cath">Catholic</option>
              <option value="char">Charismatic</option>
              <option value="ref">Christian Reformed</option>
              <option value="coc">Church of Christ</option>
              <option value="epis">Episcopalian/Anglican</option>
              <option value="evan">Evangelical</option>
              <option value="inter">Interdenominational</option>
              <option value="luth">Lutheran</option>
              <option value="mess">Messianic</option>
              <option value="naz">Nazerene</option>
              <option value="non">Non-denominational</option>
              <option value="unsure">Not sure yet</option>
              <option value="orth">Orthodox</option>
              <option value="pent">Pentecostal</option>
              <option value="pres">Presbyeterian</option>
              <option value="sev">Seventh-Day Adventist</option>
              <option value="south">Southern Baptist</option>
              <option value="other">Other Religion</option>
            </select>
            <br/>
            <br/>

          <label className="user-info-input-label">{(this.state.attendance !== '')
            ? "Church Attendance" : ""}</label>
            <br/>
            <select onChange={this.updateValue("attendance")}
              onBlur={(e) => this.handleSubmit(e)}
              className="user-info-select-box">
              <option default hidden>Church Attendance</option>
              <option value="weekly">Attend church every week</option>
              <option value="special">Attend church on sepecial occasions</option>
              <option value="twice">Attend church once or twice a month</option>
              <option value="several">Attend church several times a year</option>
            </select>
            <br/>
            <br/>

          <label className="user-info-input-label">{(this.state.education !== '')
            ? "Level of Education" : ""}</label>
          <br/>
          <select onChange={this.updateValue("education")}
            onBlur={(e) => this.handleSubmit(e)}
            className="user-info-select-box">
            <option default hidden>Level Of Education</option>
            <option value="high">High School</option>
            <option value="coll">Some College</option>
            <option value="bach">Bachelor's Degree</option>
            <option value="mast">Master's Degree</option>
            <option value="phd">JD/PhD/Post Doc</option>
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

        <label className="user-info-input-label">{(this.state.drink !== '')
          ? "Drinking Habits" : ""}</label>
          <br/>
          <select onChange={this.updateValue("drink")}
            onBlur={(e) => this.handleSubmit(e)}
            className="user-info-select-box">
            <option default hidden>Drinking Habits</option>
            <option value="freq">Drink Frequently</option>
            <option value="soc">Drink Socially</option>
            <option value="occ">Drink On Occassion</option>
            <option value="never">Never Drink</option>
          </select>
          <br/>
          <br/>

          <label className="user-info-input-label">{(this.state.smoke !== '')
            ? "Smoking Habits" : ""}</label>
            <br/>
            <select onChange={this.updateValue("smoke")}
              onBlur={(e) => this.handleSubmit(e)}
              className="user-info-select-box">
              <option default hidden>Smoking Habits</option>
              <option value="reg">Smoke regularly</option>
              <option value="occ">Smoke ocassionally</option>
              <option value="non">Non-Smoker</option>
              <option value="quit">Trying to quit smoking</option>
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
