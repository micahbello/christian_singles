import React from 'react';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';
import TopHeaderContainer from '../top_header/top_header_container';

class userInfoForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {};
    this.state = this.props.currentProfile;

  this.handleSubmit = this.handleSubmit.bind(this);
  this.updateValue = this.updateValue.bind(this);
  this.showCheckboxes = this.showCheckboxes.bind(this);
  }


  showCheckboxes(id) {


    let checkboxes = document.getElementById(id);
    if(checkboxes.style.display === "inline-grid") {
      checkboxes.style.display = "none";;
    } else {
      checkboxes.style.display = "inline-grid";
    }
  }


  updateValue(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});

  }

  updateCheckBoxValue(field) {

    if (!this.state[field].includes(e.currentTarget.value)) {
      this.setState({[field]: this.state[field].concat(`, ${e.currentTarget.value}`)});
    }

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

          <label className="user-info-input-label">{this.state.display_name
            ? "Display Name" : ""}</label>
            <br/>
            <input onChange={this.updateValue("display_name")}
              onBlur={(e) => this.handleSubmit(e)}
              className="user-info-input-box" type="text"
              value={this.state.display_name ? this.state.display_name : " Display Name"}/>
            <br/>
            <br/>




          <label className="user-info-input-label">{this.state.have_kids
            ? "Have Kids" : ""}</label>
            <br/>
            <select onChange={this.updateValue("have_kids")}
              onBlur={(e) => this.handleSubmit(e)}
              className="user-info-select-box">
              <option default hidden>{this.state.have_kids ? this.state.have_kids : "Have Kids"}</option>
              <option value="No kids">No kids</option>
              <option value="Have kids and they live with me">Have kids and they live with me</option>
              <option value="Have kids and they sometimes live with me">Have kids and they sometimes live with me</option>
              <option value="Have grown children">Have grown children</option>
            </select>
            <br/>
            <br/>

          <label className="user-info-input-label">{this.state.marital_status
            ? "Marital Status" : ""}</label>
            <br/>
            <select onChange={this.updateValue("marital_status")}
              onBlur={(e) => this.handleSubmit(e)}
              className="user-info-select-box">
              <option default hidden>{this.state.marital_status ? this.state.marital_status : "Marital Status"}</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
              <option value="Never Married">Never Married</option>
            </select>
            <br/>
            <br/>


          <label className="user-info-input-label">{this.state.relocate
            ? "Willingness to Relocate" : ""}</label>
            <br/>
            <select onChange={this.updateValue("relocate")}
              onBlur={(e) => this.handleSubmit(e)}
              className="user-info-select-box">
              <option default hidden>{this.state.relocate ? this.state.relocate : "Willingness To Relocate"}</option>
              <option value="Would Consider Relocating">Would Consider Relocating</option>
              <option value="I'd Relocate">I'd Relocate</option>
              <option value="Won't Relocate">Won't Relocate</option>
            </select>
            <br/>
            <br/>

          <label className="user-info-input-label">{this.state.religion
            ? "Religion" : ""}</label>
            <br/>
            <select onChange={this.updateValue("religion")}
              onBlur={(e) => this.handleSubmit(e)}
              className="user-info-select-box">
              <option default hidden>{this.state.religion ? this.state.religion : "Religion"}</option>
              <option value="Anglican">Anglican</option>
              <option value="Assembly">Assembly of God</option>
              <option value="Baptist">Baptist</option>
              <option value="Catholic">Catholic</option>
              <option value="Charismatic">Charismatic</option>
              <option value="Christian Reformed">Christian Reformed</option>
              <option value="Church of Christ">Church of Christ</option>
              <option value="Episcopalian/Anglican">Episcopalian/Anglican</option>
              <option value="Evangelical">Evangelical</option>
              <option value="Interdenominational">Interdenominational</option>
              <option value="Lutheran">Lutheran</option>
              <option value="Messianic">Messianic</option>
              <option value="Nazerene">Nazerene</option>
              <option value="Non-denominational">Non-denominational</option>
              <option value="Not sure yet">Not sure yet</option>
              <option value="Orthodox">Orthodox</option>
              <option value="Pentecostal">Pentecostal</option>
              <option value="Presbyeterian">Presbyeterian</option>
              <option value="Seventh-Day Adventist">Seventh-Day Adventist</option>
              <option value="Southern Baptist">Southern Baptist</option>
              <option value="Other Religion">Other Religion</option>
            </select>
            <br/>
            <br/>

          <label className="user-info-input-label">{this.state.attendance
            ? "Church Attendance" : ""}</label>
            <br/>
            <select onChange={this.updateValue("attendance")}
              onBlur={(e) => this.handleSubmit(e)}
              className="user-info-select-box">
              <option default hidden>{this.state.attendance ? this.state.attendance : "Church Attendance"}</option>
              <option value="Attend church every week">Attend church every week</option>
              <option value="Attend church on sepecial occasions">Attend church on sepecial occasions</option>
              <option value="Attend church once or twice a month">Attend church once or twice a month</option>
              <option value="Attend church several times a year">Attend church several times a year</option>
            </select>
            <br/>
            <br/>

          <label className="user-info-input-label">{this.state.occupation
            ? "Occupation" : ""}</label>
            <br/>
            <input onChange={this.updateValue("occupation")}
              onBlur={(e) => this.handleSubmit(e)}
              className="user-info-input-box" type="text"
              value={this.state.occupation ? this.state.occupation : " Occupation"}/>
            <br/>
            <br/>


          <label className="user-info-input-label">{this.state.education
            ? "Level of Education" : ""}</label>
          <br/>
          <select onChange={this.updateValue("education")}
            onBlur={(e) => this.handleSubmit(e)}
            className="user-info-select-box">
            <option default hidden>{this.state.education ? this.state.education : "Level of Education"}</option>
            <option value="High School">High School</option>
            <option value="College">Some College</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="JD/PhD/Post Doc">JD/PhD/Post Doc</option>
          </select>
            <br/>
            <br/>
            <br/>

            <div className="selectBox" onClick={() => this.showCheckboxes("ethnicity-checkboxes")}>
              <label className="user-info-select-box" id="check-box-select">Ethnicity</label>
            <div className="overSelect"></div>
              <div id="ethnicity-checkboxes">
                <label class="check-box-text">
                  <input type="checkbox" />African</label>
                <label class="check-box-text">
                  <input type="checkbox" />Asian</label>
                <label class="check-box-text">
                  <input type="checkbox" />Black/African Descent</label>
                <label class="check-box-text">
                  <input type="checkbox" />Caribbean</label>
                <label class="check-box-text">
                  <input type="checkbox" />Caucasian/ White</label>
                <label class="check-box-text">
                  <input type="checkbox" />East Indian</label>
                <label class="check-box-text">
                  <input type="checkbox" />Hispanic/ Latin</label>
                <label class="check-box-text">
                  <input type="checkbox" />Middle Eastern</label>
                <label class="check-box-text">
                  <input type="checkbox" />Native American</label>
                <label class="check-box-text">
                  <input type="checkbox" />Pacific Islander</label>
                <label class="check-box-text">
                  <input type="checkbox" />Other Ethnicity</label>
              </div>
             </div>

            <br/>
            <br/>

            <div className="selectBox" onClick={() => this.showCheckboxes("language-checkboxes")}>
              <label className="user-info-select-box" id="check-box-select">Language</label>
            <div className="overSelect"></div>
              <div id="language-checkboxes">
                <label class="check-box-text">
                  <input type="checkbox" />Arabic</label>
                <label class="check-box-text">
                  <input type="checkbox" />Bengali</label>
                <label class="check-box-text">
                  <input type="checkbox" />Bulgarian</label>
                <label class="check-box-text">
                  <input type="checkbox" />Chinese</label>
                <label class="check-box-text">
                  <input type="checkbox" />Czech</label>
                <label class="check-box-text">
                  <input type="checkbox" />Dutch</label>
                <label class="check-box-text">
                  <input type="checkbox" />English</label>
                <label class="check-box-text">
                  <input type="checkbox" />Fijian</label>
                <label class="check-box-text">
                  <input type="checkbox" />French</label>
                <label class="check-box-text">
                  <input type="checkbox" />German</label>
                <label class="check-box-text">
                  <input type="checkbox" />Greek</label>
                <label class="check-box-text">
                  <input type="checkbox" />Hebrew</label>
                <label class="check-box-text">
                  <input type="checkbox" />Hindi</label>
                <label class="check-box-text">
                  <input type="checkbox" />Italian</label>
                <label class="check-box-text">
                  <input type="checkbox" />Japanese</label>
                <label class="check-box-text">
                  <input type="checkbox" />Korean</label>
                <label class="check-box-text">
                  <input type="checkbox" />Malay</label>
                <label class="check-box-text">
                  <input type="checkbox" />Manadarin</label>
                <label class="check-box-text">
                  <input type="checkbox" />Norwegian</label>
                <label class="check-box-text">
                  <input type="checkbox" />Polish</label>
                <label class="check-box-text">
                  <input type="checkbox" />Portuguese</label>
                <label class="check-box-text">
                  <input type="checkbox" />Romanian</label>
                <label class="check-box-text">
                  <input type="checkbox" />Russian</label>
                <label class="check-box-text">
                  <input type="checkbox" />Samoan</label>
                <label class="check-box-text">
                  <input type="checkbox" />Spanish</label>
                <label class="check-box-text">
                  <input type="checkbox" />Swedish</label>
                <label class="check-box-text">
                  <input type="checkbox" />Tagalog</label>
                <label class="check-box-text">
                  <input type="checkbox" />Thai</label>
                <label class="check-box-text">
                  <input type="checkbox" />Vietnamese</label>
                </div>
             </div>

            <br/>
            <br/>

            <div className="selectBox" onClick={() => this.showCheckboxes("pets-checkboxes")}>
              <label className="user-info-select-box" id="check-box-select">Pets</label>
            <div className="overSelect"></div>
              <div id="pets-checkboxes">
                <label class="check-box-text">
                  <input type="checkbox" />Have bird(s)</label>
                <label class="check-box-text">
                  <input type="checkbox" />Have cats(s)</label>
                <label class="check-box-text">
                  <input type="checkbox" />Have dogs(s)</label>
                <label class="check-box-text">
                  <input type="checkbox" />Have fish</label>
                <label class="check-box-text">
                  <input type="checkbox" />No pets but want them</label>
                <label class="check-box-text">
                  <input type="checkbox" />Have a pet (ask me)</label>
              </div>
             </div>

             <br/>

        <label className="user-info-input-label">{this.state.drink
          ? "Drinking Habits" : ""}</label>
          <br/>
          <select onChange={this.updateValue("drink")}
            onBlur={(e) => this.handleSubmit(e)}
            className="user-info-select-box">
            <option default hidden>{this.state.drink ? this.state.drink : "Drinking Habits"}</option>
            <option value="Drink Frequently">Drink Frequently</option>
            <option value="Drink Socially">Drink Socially</option>
            <option value="Drink On Occassion">Drink On Occassion</option>
            <option value="Never Drink">Never Drink</option>
          </select>
          <br/>
          <br/>

          <label className="user-info-input-label">{this.state.smoke
            ? "Smoking Habits" : ""}</label>
            <br/>
            <select onChange={this.updateValue("smoke")}
              onBlur={(e) => this.handleSubmit(e)}
              className="user-info-select-box">
              <option default hidden>{this.state.smoke ? this.state.smoke : "Smoking Habits"}</option>
              <option value="Smoke regularly">Smoke regularly</option>
              <option value="Smoke ocassionally">Smoke ocassionally</option>
              <option value="Non-Smoker">Non-Smoker</option>
              <option value="Trying to quit smoking">Trying to quit smoking</option>
            </select>
            <br/>
            <br/>

          <br/>

          <div className="selectBox" onClick={() => this.showCheckboxes("dates-checkboxes")}>
            <label className="user-info-select-box" id="check-box-select">Preferred First Date</label>
          <div className="overSelect"></div>
            <div id="dates-checkboxes">
              <label class="check-box-text">
                <input type="checkbox" />Coffee or tea</label>
              <label class="check-box-text">
                <input type="checkbox" />Drinks</label>
              <label class="check-box-text">
                <input type="checkbox" />A meal</label>
              <label class="check-box-text">
                <input type="checkbox" />To be surprised</label>
              <label class="check-box-text">
                <input type="checkbox" />A walk or hike</label>
            </div>
           </div>

          <br/>
          <br/>


          <br/>
        </div>

        </div>

      </div>
    );
  }


}

export default userInfoForm;
