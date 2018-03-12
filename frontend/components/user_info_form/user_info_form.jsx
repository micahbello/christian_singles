import React from 'react';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';
import TopHeaderContainer from '../top_header/top_header_container';

class userInfoForm extends React.Component {


  constructor(props) {
    super(props);
    this.state = this.props.currentProfile;

  this.handleSubmit = this.handleSubmit.bind(this);
  this.updateValue = this.updateValue.bind(this);
  this.showCheckboxes = this.showCheckboxes.bind(this);
  this.updateCheckBoxValue = this.updateCheckBoxValue.bind(this);
  }

  componentDidMount() {
    if (this.state) {
      null
    } else {
      this.props.getCurrentProfile(this.props.currentUser.id).then((action) => {
        this.setState(action.currentProfile)
      })
    }
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
// debugger


    return (e) => {
      console.log(`this is the current state of ethnicity: ${this.state[field]}`)
      if (this.state[field] === null || this.state[field] === "") {
        this.setState({[field]: e.currentTarget.value});
      }
      else if (!this.state[field].includes(e.currentTarget.value)) {
      this.setState({[field]: this.state[field].concat(`, ${e.currentTarget.value}`)})
      } else {

        let oldCheckedOptions = this.state[field].split(",");
        let newCheckedOptions = [];

        oldCheckedOptions.forEach(option => {
          if (option !== e.currentTarget.value) {
            newCheckedOptions.push(option);
          }
        });
        console.log(`these should be replacing ethnicities ${newCheckedOptions}`)
        this.setState({[field]: newCheckedOptions.join(",") })
      }
      console.log(`this is the current state of ethnicity after code: ${this.state[field]}`)
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = merge({}, this.state, {id: this.props.currentUser.id});
    this.props.updateUserInfo(user);
  }

  render() {
    if (!this.state) {
      return <p>...Loading...</p>
    } else {
      return (


        <div className="edit-profile-page">
          <TopHeaderContainer />

          <span class="user-profile-span">

          <h2 className="edit-profile-text">Edit Profile</h2>

        {this.props.currentUser.id === this.props.currentProfile.id
            ?
            <div id="user-profile-edit-button">
            <Link id="user-profile-edit-link" to={`/profile/${this.props.currentUser.id}`} >View Profile</Link>
            </div>
            : null}

          </span>

          <div className="info-forms">


          <div className="user-info-pic-container"> PICS HERE </div>

          <div className="main-info-fillout">

            <label className="user-info-input-label">{this.state.display_name
              ? "Display Name" : ""}</label>
              <br/>
              <input onChange={this.updateValue("display_name")}
                onBlur={this.handleSubmit}
                className="user-info-input-box" type="text"
                value={this.state.display_name ? this.state.display_name : " Display Name"}/>
              <br/>
              <br/>




            <label className="user-info-input-label">{this.state.have_kids
              ? "Have Kids" : ""}</label>
              <br/>
              <select onChange={this.updateValue("have_kids")}
                onBlur={this.handleSubmit}
                className="user-info-select-box">
                <option default hidden>{this.state.have_kids ? this.state.have_kids : "Have Kids"}</option>
                <option value="No kids">No kids</option>
                <option value="Have kids and they live with me">Have kids and they live with me</option>
                <option value="Have kids and they sometimes live with me">Have kids and they sometimes live with me</option>
                <option value="Have grown children">Have grown children</option>
              </select>
              <br/>
              <br/>

            <label className="user-info-input-label">{this.state.want_kids
              ? "Want Kids" : ""}</label>
              <br/>
              <select onChange={this.updateValue("want_kids")}
                onBlur={this.handleSubmit}
                className="user-info-select-box">
                <option default hidden>{this.state.want_kids ? this.state.want_kids : "Want Kids"}</option>
                <option value="Want kids">Want kids</option>
                <option value="Don't want kids">Don't want kids</option>
                <option value="Don't want to have kids but welcome yours">Don't want to have kids but welcome yours</option>
                <option value="Have grown children">Have grown children</option>
              </select>
              <br/>
              <br/>

            <label className="user-info-input-label">{this.state.marital_status
              ? "Marital Status" : ""}</label>
              <br/>
              <select onChange={this.updateValue("marital_status")}
                onBlur={this.handleSubmit}
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
                onBlur={this.handleSubmit}
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
                onBlur={this.handleSubmit}
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
                onBlur={this.handleSubmit}
                className="user-info-select-box">
                <option default hidden>{this.state.attendance ? this.state.attendance : "Church Attendance"}</option>
                <option value="Attend church every week">Attend church every week</option>
                <option value="Attend church on special occasions">Attend church on sepecial occasions</option>
                <option value="Attend church once or twice a month">Attend church once or twice a month</option>
                <option value="Attend church several times a year">Attend church several times a year</option>
              </select>
              <br/>
              <br/>

            <label className="user-info-input-label">{this.state.occupation
              ? "Occupation" : ""}</label>
              <br/>
              <input onChange={this.updateValue("occupation")}
                onBlur={this.handleSubmit}
                className="user-info-input-box" type="text"
                value={this.state.occupation ? this.state.occupation : " Occupation"}/>
              <br/>
              <br/>


            <label className="user-info-input-label">{this.state.education
              ? "Level of Education" : ""}</label>
            <br/>
            <select onChange={this.updateValue("education")}
              onBlur={this.handleSubmit}
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
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="African" />African</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Asian"/>Asian</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Black/African Descent"/>Black/African Descent</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Caribbean"/>Caribbean</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Caucasian/White"/>Caucasian/ White</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="East Indian"/>East Indian</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Hispanic/ Latin"/>Hispanic/ Latin</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Middle Eastern" />Middle Eastern</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Native American" />Native American</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Pacific Islander" />Pacific Islander</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Other Ethnicity"/>Other Ethnicity</label>
                </div>
               </div>

              <br/>
              <br/>

              <div className="selectBox" onClick={() => this.showCheckboxes("language-checkboxes")}>
                <label className="user-info-select-box" id="check-box-select">Language</label>
              <div className="overSelect"></div>
                <div id="language-checkboxes">
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Arabic"/>Arabic</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Bengali" />Bengali</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Bulgarian" />Bulgarian</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Chinese" />Chinese</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Czech" />Czech</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Dutch" />Dutch</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="English" />English</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Fijian" />Fijian</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="French" />French</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="German" />German</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Greek" />Greek</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Hebrew" />Hebrew</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Hindi" />Hindi</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Italian" />Italian</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Japanese" />Japanese</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Korean" />Korean</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Malay" />Malay</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Mandarin" />Manadarin</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Norwegianc" />Norwegian</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Polish" />Polish</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Portuguese"/>Portuguese</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Romanian" />Romanian</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Russian" />Russian</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Samoan" />Samoan</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Spanish" />Spanish</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Swedish" />Swedish</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Tagalog" />Tagalog</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Thai" />Thai</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language")} type="checkbox" value="Vietnamese" />Vietnamese</label>
                  </div>
               </div>

              <br/>
              <br/>

              <div className="selectBox" onClick={() => this.showCheckboxes("pets-checkboxes")}>
                <label className="user-info-select-box" id="check-box-select">Pets</label>
              <div className="overSelect"></div>
                <div id="pets-checkboxes">
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("pets")} type="checkbox" value="Have bird(s)" />Have bird(s)</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("pets")} type="checkbox" value="Have cat(s)" />Have cat(s)</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("pets")} type="checkbox" value="Have dog(s)" />Have dog(s)</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("pets")} type="checkbox" value="Have fish" />Have fish</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("pets")} type="checkbox" value="No pets but want them" />No pets but want them</label>
                  <label className="check-box-text">
                    <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("pets")} type="checkbox" value="Have a pet (ask me)" />Have a pet (ask me)</label>
                </div>
               </div>

               <br/>

          <label className="user-info-input-label">{this.state.drink
            ? "Drinking Habits" : ""}</label>
            <br/>
            <select onChange={this.updateValue("drink")}
              onBlur={this.handleSubmit}
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
                onBlur={this.handleSubmit}
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
                <label className="check-box-text">
                  <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("first_date")} type="checkbox" value="Coffee or tea" />Coffee or tea</label>
                <label className="check-box-text">
                  <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("first_date")} type="checkbox" value="Drinks"  />Drinks</label>
                <label className="check-box-text">
                  <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("first_date")} type="checkbox" value="A meal"  />A meal</label>
                <label className="check-box-text">
                  <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("first_date")} type="checkbox" value="To be surprised" />To be surprised</label>
                <label className="check-box-text">
                  <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("first_date")} type="checkbox" value="A walk or hike"  />A walk or hike</label>
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


}

export default userInfoForm;
