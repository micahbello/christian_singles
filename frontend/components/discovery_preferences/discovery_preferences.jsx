import React from 'react';
import { Link } from 'react-router-dom';
import { merge } from 'lodash';
import TopHeaderContainer from '../top_header/top_header_container';

class DiscoveryPreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.currentProfile;


    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showCheckboxes = this.showCheckboxes.bind(this);
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


  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props.updateUserInfo(user);
    this.props.updateUiWindow(null);
  }

  updateValue(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }

  handleClick() {
    this.props.updateUiWindow(null);
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

  render() {

    if (!this.state) {
      return <p>...Loading...</p>
    } else {

    return (
      <div className="preferences-page">

      <TopHeaderContainer />


      <span className="user-profile-span">

      <h2 className="edit-profile-text">Discovery Preferences</h2>

        <div id="user-profile-edit-button">
        <Link id="user-profile-edit-link" to='/editprofile' >Back</Link>
        </div>

      </span>

      <div className="preferences-box">

        <div className="selectBox" onClick={() => this.showCheckboxes("sex-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">Im Seeking</label>
        <div className="overSelect"></div>
          <div id="sex-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("sex_seek")} type="checkbox" value="Men" />Men</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("sex_seek")} type="checkbox" value="Women"/>Women</label>
          </div>
         </div>

        <br/>
        <br/>

        <div className="selectBox" onClick={() => this.showCheckboxes("religion-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">Religion</label>
        <div className="overSelect"></div>
          <div id="religion-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Anglican" />Anglican</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Apostolic"/>Apostolic</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Assembly of God"/>Assembly of God</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Baptist"/>Baptist</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Catholic"/>Catholic</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Charismatic"/>Charismatic</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Christian Reformed"/>Christian Reformed</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Church of Christ" />Church of Christ</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Episcopelian/Anglican" />Episcopelian/Anglican</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Evangelical" />Evangelical</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Interdenominational"/>Interdenominational</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Lutheran" />Lutheran</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Messianic"/>Messianic</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Methodist"/>Methodist</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Nazarene"/>Nazarene</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Non-denominational"/>Non-denominational</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Not sure yet"/>Not sure yet</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Orthodox"/>Orthodox</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Pentecostal" />Pentecostal</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Presbyeterian" />Presbyeterian</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Seventh-Day Adventist" />Seventh-Day Adventist</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Southern Baptist"/>Southern Baptist</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Other Religion"/>Other Religion</label>
          </div>
         </div>

        <br/>
        <br/>


        <div className="selectBox" onClick={() => this.showCheckboxes("relationship-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">Relationship Type</label>
        <div className="overSelect"></div>
          <div id="relationship-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("relationship_seek")} type="checkbox" value="Friendly/Activity Partner" />Friendly/Activity Partner</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("relationship_seek")} type="checkbox" value="Long Term Relationship"/>Long Term Relationship</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("relationship_seek")} type="checkbox" value="Marriage"/>Marriage</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("relationship_seek")} type="checkbox" value="Marriage and Kids"/>Marriage and Kids</label>
          </div>
         </div>

        <br/>
        <br/>


        <div className="selectBox" onClick={() => this.showCheckboxes("education-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">Level of Education</label>
        <div className="overSelect"></div>
          <div id="education-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("education_seek")} type="checkbox" value="High School" />High School</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("education_seek")} type="checkbox" value="Some College"/>Some College</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("education_seek")} type="checkbox" value="Master's Degree"/>Master's Degree</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("education_seek")} type="checkbox" value="Jd/Ph/Post Doc"/>Jd/Ph/Post Doc</label>
          </div>
         </div>

        <br/>
        <br/>


        <div className="selectBox" onClick={() => this.showCheckboxes("attendance-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">Church Attendance</label>
        <div className="overSelect"></div>
          <div id="attendance-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("attendance_seek")} type="checkbox" value="Attend church every week" />Attend church every week</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("attendance_seek")} type="checkbox" value="Attend church on special occassions"/>Attend church on special occassions</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("attendance_seek")} type="checkbox" value="Attend church once or twice a month"/>Attend church once or twice a month</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("attendance_seek")} type="checkbox" value="Attend church several times a year"/>Attend church several times a year</label>
          </div>
         </div>

        <br/>
        <br/>


        <div className="selectBox" onClick={() => this.showCheckboxes("smoke-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">Smoking Habits</label>
        <div className="overSelect"></div>
          <div id="smoke-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("smoke-seek")} type="checkbox" value="Smoke regularly" />Smoke regularly</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("smoke-seek")} type="checkbox" value="Smoke occasionally"/>Smoke occasionally</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("smoke-seek")} type="checkbox" value="Non-Smoker"/>Non-Smoker</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("smoke-seek")} type="checkbox" value="Trying to quit smoking"/>Trying to quit smoking</label>
          </div>
         </div>

        <br/>
        <br/>

        <div className="selectBox" onClick={() => this.showCheckboxes("drink-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">Drinking Habits</label>
        <div className="overSelect"></div>
          <div id="drink-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("drink_seek")} type="checkbox" value="Drink Frequently" />Drink Frequently</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("drink_seek")} type="checkbox" value="Drink Socially"/>Drink Socially</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("drink_seek")} type="checkbox" value="Drink On Occassion"/>Drink On Occassion</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("drink_seek")} type="checkbox" value="Never Drink"/>Never Drink</label>
          </div>
         </div>

        <br/>
        <br/>


        <div className="selectBox" onClick={() => this.showCheckboxes("have-kids-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">Have Kids</label>
        <div className="overSelect"></div>
          <div id="have-kids-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("have_kids_seek")} type="checkbox" value="No Kids" />No Kids</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("have_kids_seek")} type="checkbox" value="Have kids and they live with me"/>Have kids and they live with me</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("have_kids_seek")} type="checkbox" value="Have kids and they sometimes live with me"/>Have kids and they sometimes live with me</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("have_kids_seek")} type="checkbox" value="Have kids that don't live with me"/>Have kids that don't live with me</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("have_kids_seek")} type="checkbox" value="Have grown kids"/>Have grown kids</label>
          </div>
         </div>

        <br/>
        <br/>


        <div className="selectBox" onClick={() => this.showCheckboxes("want-kids-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">Want Kids</label>
        <div className="overSelect"></div>
          <div id="want-kids-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("want_kids_seek")} type="checkbox" value="Want Kids" />Want Kids</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("want_kids_seek")} type="checkbox" value="Don't want kids"/>Don't want kids</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("want_kids_seek")} type="checkbox" value="Don't want to have kids but welcome yours"/>Don't want to have kids but welcome yours</label>
         </div>
         </div>
        <br/>
        <br/>


        <div className="selectBox" onClick={() => this.showCheckboxes("relocate-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">Willingness to Relocate</label>
        <div className="overSelect"></div>
          <div id="relocate-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("relocate_seek")} type="checkbox" value="Would consider relocating" />Would consider relocating</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("relocate_seek")} type="checkbox" value="I'd relocate"/>I'd relocate</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("relocate_seek")} type="checkbox" value="Won't relocate"/>Won't relocate</label>
         </div>
         </div>
        <br/>
        <br/>


        <div className="selectBox" onClick={() => this.showCheckboxes("marital-status-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">Marital Status</label>
        <div className="overSelect"></div>
          <div id="marital-status-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("marital_status_seek")} type="checkbox" value="Divorced" />Divorced</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("marital_status_seek")} type="checkbox" value="Widowed"/>Widowed</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("marital_status_seek")} type="checkbox" value="Never Married"/>Never Married</label>
         </div>
         </div>
        <br/>
        <br/>


        <div className="selectBox" onClick={() => this.showCheckboxes("language-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">Language</label>
        <div className="overSelect"></div>
          <div id="language-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Arabic"/>Arabic</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Bengali" />Bengali</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Bulgarian" />Bulgarian</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Chinese" />Chinese</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Czech" />Czech</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Dutch" />Dutch</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="English" />English</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Fijian" />Fijian</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="French" />French</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="German" />German</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Greek" />Greek</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Hebrew" />Hebrew</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Hindi" />Hindi</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Italian" />Italian</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Japanese" />Japanese</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Korean" />Korean</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Malay" />Malay</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Mandarin" />Manadarin</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Norwegianc" />Norwegian</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Polish" />Polish</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Portuguese"/>Portuguese</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Romanian" />Romanian</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Russian" />Russian</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Samoan" />Samoan</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Spanish" />Spanish</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Swedish" />Swedish</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Tagalog" />Tagalog</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Thai" />Thai</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Vietnamese" />Vietnamese</label>
            </div>
         </div>

        <br/>
        <br/>


        <div className="selectBox" onClick={() => this.showCheckboxes("ethnicity-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">Ethnicity</label>
        <div className="overSelect"></div>
          <div id="ethnicity-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="African" />African</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Asian"/>Asian</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Black/African Descent"/>Black/African Descent</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Caribbean"/>Caribbean</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Caucasian/White"/>Caucasian/White</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="East Indian"/>East Indian</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Hispanic/Latin"/>Hispanic/Latin</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Middle Eastern" />Middle Eastern</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Native American" />Native American</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Pacific Islander" />Pacific Islander</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Other Ethnicity"/>Other Ethnicity</label>
          </div>
         </div>

        <br/>
        <br/>

        <div class="preferces-submit-button">

          <Link to="/editprofile">Submit</Link>
        </div>

      </div>

      </div>
    );
    }
  }
}

export default DiscoveryPreferences;
