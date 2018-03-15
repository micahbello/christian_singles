import React from 'react';
import { Link } from 'react-router-dom';
import { merge } from 'lodash';
import TopHeaderContainer from '../top_header/top_header_container';


class DiscoveryPreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showCheckboxes = this.showCheckboxes.bind(this);
  }

  componentDidMount() {
      this.props.getCurrentProfile(this.props.currentUser.id).then((action) => {
        this.setState(action.currentProfile)
      })
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
    return (e) => {
      if (this.state[field] === null || this.state[field] === "") {
        this.setState({[field]: e.currentTarget.value});
      }
      else if (!this.state[field].includes(e.currentTarget.value)) {
      this.setState({[field]: this.state[field].concat(`,${e.currentTarget.value}`)})
      } else {
        let oldCheckedOptions = this.state[field].split(",");
        let newCheckedOptions = [];

        oldCheckedOptions.forEach(option => {
          if (option !== e.currentTarget.value) {
            newCheckedOptions.push(option);
          }
        });
        this.setState({[field]: newCheckedOptions.join(",") })
      }
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

      <label className="user-info-input-label">{this.state.sex_seek
        ? "I'm Seeking" : ""}</label>
        <br/>

        <div className="selectBox" onClick={() => this.showCheckboxes("sex-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">
            {this.state.sex_seek
              ? `${this.state.sex_seek.split(",")[0]}...` : "I'm seeking"}
          </label>
        <div className="overSelect"></div>
          <div id="sex-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("sex_seek")} type="checkbox" value="Men" checked={(this.state.sex_seek && this.state.sex_seek.includes("Men") )? "true" : ''}  />Men</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("sex_seek")} type="checkbox" value="Women" checked={(this.state.sex_seek && this.state.sex_seek.includes("Women") )? "true" : ''}  />Women</label>

            <button onClick={this.handleSubmit}>Save changes</button>
          </div>
         </div>

        <br/>

        <label className="user-info-input-label">Minimum Age:</label>
          <br/>
          <input onChange={this.updateValue("min_age_seek")}
            onBlur={this.handleSubmit}
            className="user-info-input-box" type="number" min= "18" max="75"
            value={this.state.min_age_seek? this.state.min_age_seek : 18}/>
          <br/>
        <label className="user-info-input-label">Maximum Age:</label>
          <br/>
          <input onChange={this.updateValue("max_age_seek")}
            onBlur={this.handleSubmit}
            className="user-info-input-box" type="number" min= "18" max="75"
            value={this.state.max_age_seek? this.state.max_age_seek : 75}/>
          <br/>
          <br/>


        <div className="selectBox" onClick={() => this.showCheckboxes("distance-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">Distance</label>
        <div className="overSelect"></div>
          <div id="distance-seek-checkboxes">
            <label className="check-box-text">
              <input  onChange={this.updateCheckBoxValue("distance_seek")} type="checkbox" value="5"  />5</label>
            <label className="check-box-text">
              <input  onChange={this.updateCheckBoxValue("distance_seek")} type="checkbox" value="10" />10</label>
            <label className="check-box-text">
              <input  onChange={this.updateCheckBoxValue("distance_seek")} type="checkbox" value="25" />25</label>
            <label className="check-box-text">
              <input  onChange={this.updateCheckBoxValue("distance_seek")} type="checkbox" value="50" />50</label>
            <label className="check-box-text">
              <input  onChange={this.updateCheckBoxValue("distance_seek")} type="checkbox" value="100"  />100</label>
            <label className="check-box-text">
              <input  onChange={this.updateCheckBoxValue("distance_seek")} type="checkbox" value="500"  />500</label>

            <button onClick={this.handleSubmit}>Save changes</button>

          </div>
         </div>
         <p>of</p>
         <input onChange={this.updateValue("zip_code")}
           onBlur={this.handleSubmit}
           className="user-info-input-box" type="number"
           value={this.state.zip_code}/>

        <br/>

      <label className="user-info-input-label">{this.state.religion_seek
        ? "Religion" : ""}</label>
        <br/>

        <div className="selectBox" onClick={() => this.showCheckboxes("religion-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">
            {this.state.religion_seek
              ? `${this.state.religion_seek.split(",")[0]}...` : "Religion"}
          </label>
        <div className="overSelect"></div>
          <div id="religion-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Anglican"  checked={(this.state.religion_seek && this.state.religion_seek.includes("Anglican") )? "true" : ''} />Anglican</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Apostolic" checked={(this.state.religion_seek && this.state.religion_seek.includes("Apostolic") )? "true" : ''} />Apostolic</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Assembly of God" checked={(this.state.religion_seek && this.state.religion_seek.includes("Assembly of God") )? "true" : ''} />Assembly of God</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Baptist" checked={(this.state.religion_seek && this.state.religion_seek.includes("Baptist") )? "true" : ''} />Baptist</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Catholic" checked={(this.state.religion_seek && this.state.religion_seek.includes("Catholic") )? "true" : ''} />Catholic</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Charismatic" checked={(this.state.religion_seek && this.state.religion_seek.includes("Charismatic") )? "true" : ''} />Charismatic</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Christian Reformed" checked={(this.state.religion_seek && this.state.religion_seek.includes("Christian Reformed") )? "true" : ''} />Christian Reformed</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Church of Christ"  checked={(this.state.religion_seek && this.state.religion_seek.includes("Church of Christ") )? "true" : ''} />Church of Christ</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Episcopalian"  checked={(this.state.religion_seek && this.state.religion_seek.includes("Episcopalian") )? "true" : ''} />Episcopelian</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Evangelical"  checked={(this.state.religion_seek && this.state.religion_seek.includes("Evangelical") )? "true" : ''} />Evangelical</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Interdenominational" checked={(this.state.religion_seek && this.state.religion_seek.includes("Interdenominational") )? "true" : ''} />Interdenominational</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Lutheran"  checked={(this.state.religion_seek && this.state.religion_seek.includes("Lutheran") )? "true" : ''} />Lutheran</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Messianic" checked={(this.state.religion_seek && this.state.religion_seek.includes("Messianic") )? "true" : ''} />Messianic</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Methodist" checked={(this.state.religion_seek && this.state.religion_seek.includes("Methodist") )? "true" : ''} />Methodist</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Nazarene" checked={(this.state.religion_seek && this.state.religion_seek.includes("Nazarene") )? "true" : ''} />Nazarene</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Non-denominational" checked={(this.state.religion_seek && this.state.religion_seek.includes("Non-denom") )? "true" : ''} />Non-denominational</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Not sure yet" checked={(this.state.religion_seek && this.state.religion_seek.includes("Not sure yet") )? "true" : ''} />Not sure yet</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Orthodox" checked={(this.state.religion_seek && this.state.religion_seek.includes("Orthodox") )? "true" : ''} />Orthodox</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Pentecostal"  checked={(this.state.religion_seek && this.state.religion_seek.includes("Pentecostal") )? "true" : ''} />Pentecostal</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Presbyterian"  checked={(this.state.religion_seek && this.state.religion_seek.includes("Presbyterian") )? "true" : ''} />Presbyterian</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Seventh-Day Adventist"  checked={(this.state.religion_seek && this.state.religion_seek.includes("Seventh-Day Adventist") )? "true" : ''} />Seventh-Day Adventist</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Southern Baptist" checked={(this.state.religion_seek && this.state.religion_seek.includes("Southern Baptist") )? "true" : ''} />Southern Baptist</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("religion_seek")} type="checkbox" value="Other Religion" checked={(this.state.religion_seek && this.state.religion_seek.includes("Other Religion") )? "true" : ''} />Other Religion</label>

            <button onClick={this.handleSubmit}>Save changes</button>
          </div>
         </div>

        <br/>

        <label className="user-info-input-label">{this.state.relationship_seek
          ? "Relationship Type" : ""}</label>
          <br/>
        <div className="selectBox" onClick={() => this.showCheckboxes("relationship-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">
            {this.state.relationship_seek
              ? `${this.state.relationship_seek.split(",")[0]}...` : "Relationship Type"}
          </label>
        <div className="overSelect"></div>
          <div id="relationship-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("relationship_seek")} type="checkbox" value="Friendly/Activity Partner"  checked={(this.state.relationship_seek && this.state.relationship_seek.includes("Friendly/Activity Partner") )? "true" : ''} />Friendly/Activity Partner</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("relationship_seek")} type="checkbox" value="Long Term Relationship" checked={(this.state.relationship_seek && this.state.relationship_seek.includes("Long Term Relationship") )? "true" : ''} />Long Term Relationship</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("relationship_seek")} type="checkbox" value="Marriage" checked={(this.state.relationship_seek && this.state.relationship_seek.includes("Marriage") )? "true" : ''} />Marriage</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("relationship_seek")} type="checkbox" value="Marriage and Kids" checked={(this.state.relationship_seek && this.state.relationship_seek.includes("Marriage and Kids") )? "true" : ''} />Marriage and Kids</label>

            <button onClick={this.handleSubmit}>Save changes</button>
          </div>
         </div>

        <br/>

      <label className="user-info-input-label">{this.state.education_seek
        ? "Education" : ""}</label>
        <br/>

        <div className="selectBox" onClick={() => this.showCheckboxes("education-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">
            {this.state.education_seek
              ? `${this.state.education_seek.split(",")[0]}...` : "Level of Education"}
          </label>
        <div className="overSelect"></div>
          <div id="education-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("education_seek")} type="checkbox" value="High School"  checked={(this.state.education_seek && this.state.education_seek.includes("High School") )? "true" : ''} />High School</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("education_seek")} type="checkbox" value="Some College" checked={(this.state.education_seek && this.state.education_seek.includes("Some College") )? "true" : ''} />Some College</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("education_seek")} type="checkbox" value="Master's Degree" checked={(this.state.education_seek && this.state.education_seek.includes("Master's Degree") )? "true" : ''} />Master's Degree</label>
            <label className="check-box-text">
              <input onChange={this.handleSubmit} onClick={this.updateCheckBoxValue("education_seek")} type="checkbox" value="Jd/Ph/Post Doc" checked={(this.state.education_seek && this.state.education_seek.includes("Jd/Ph/Post Doc") )? "true" : ''} />Jd/Ph/Post Doc</label>

            <button onClick={this.handleSubmit}>Save changes</button>
          </div>
         </div>

        <br/>

      <label className="user-info-input-label">{this.state.attendance_seek
        ? "Church Attendance" : ""}</label>
        <br/>

        <div className="selectBox" onClick={() => this.showCheckboxes("attendance-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">
            {this.state.attendance_seek
              ? `${this.state.attendance_seek.split(",")[0]}...` : "Church Attendance"}
          </label>
        <div className="overSelect"></div>
          <div id="attendance-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("attendance_seek")} type="checkbox" value="Attend church every week"   checked={(this.state.attendance_seek && this.state.attendance_seek.includes("Attend church every week") )? "true" : ''}/>Attend church every week</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("attendance_seek")} type="checkbox" value="Attend church on special occassions"  checked={(this.state.attendance_seek && this.state.attendance_seek.includes("Attend church on special occassions") )? "true" : ''}/>Attend church on special occassions</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("attendance_seek")} type="checkbox" value="Attend church once or twice a month"  checked={(this.state.attendance_seek && this.state.attendance_seek.includes("Attend church once or twice a month") )? "true" : ''}/>Attend church once or twice a month</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("attendance_seek")} type="checkbox" value="Attend church several times a year"  checked={(this.state.attendance_seek && this.state.attendance_seek.includes("Attend church several times a year") )? "true" : ''}/>Attend church several times a year</label>

            <button onClick={this.handleSubmit}>Save changes</button>
          </div>
         </div>

        <br/>

      <label className="user-info-input-label">{this.state.smoke_seek
        ? "Smoking Habits" : ""}</label>
        <br/>

        <div className="selectBox" onClick={() => this.showCheckboxes("smoke-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">
            {this.state.smoke_seek
              ? `${this.state.smoke_seek.split(",")[0]}...` : "Smoking Habits"}
          </label>
        <div className="overSelect"></div>
          <div id="smoke-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("smoke_seek")} type="checkbox" value="Smoke regularly"  checked={(this.state.smoke_seek && this.state.smoke_seek.includes("Smoke regularly") )? "true" : ''}/>Smoke regularly</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("smoke_seek")} type="checkbox" value="Smoke occasionally" checked={(this.state.smoke_seek && this.state.smoke_seek.includes("Smoke occasionally") )? "true" : ''}/>Smoke occasionally</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("smoke_seek")} type="checkbox" value="Non-Smoker" checked={(this.state.smoke_seek && this.state.smoke_seek.includes("Non-Smoker") )? "true" : ''}/>Non-Smoker</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("smoke_seek")} type="checkbox" value="Trying to quit smoking" checked={(this.state.smoke_seek && this.state.smoke_seek.includes("Trying to quit smoking") )? "true" : ''}/>Trying to quit smoking</label>

            <button onClick={this.handleSubmit}>Save changes</button>

          </div>
         </div>

        <br/>

      <label className="user-info-input-label">{this.state.drink_seek
        ? "Drinking Habits" : ""}</label>
        <br/>

        <div className="selectBox" onClick={() => this.showCheckboxes("drink-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">
            {this.state.drink_seek
              ? `${this.state.drink_seek.split(",")[0]}...` : "Drinking Habits"}
          </label>
        <div className="overSelect"></div>
          <div id="drink-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("drink_seek")} type="checkbox" value="Drink Frequently"  checked={(this.state.drink_seek && this.state.drink_seek.includes("Drink Frequently") )? "true" : ''}/>Drink Frequently</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("drink_seek")} type="checkbox" value="Drink Socially" checked={(this.state.drink_seek && this.state.drink_seek.includes("Drink Socially") )? "true" : ''}/>Drink Socially</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("drink_seek")} type="checkbox" value="Drink On Occassion" checked={(this.state.drink_seek && this.state.drink_seek.includes("Drink On Occassion") )? "true" : ''}/>Drink On Occassion</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("drink_seek")} type="checkbox" value="Never Drink" checked={(this.state.drink_seek && this.state.drink_seek.includes("Never Drink") )? "true" : ''}/>Never Drink</label>

              <button onClick={this.handleSubmit}>Save changes</button>

          </div>
         </div>


        <br/>

      <label className="user-info-input-label">{this.state.have_kids_seek
        ? "Have Kids" : ""}</label>
        <br/>

        <div className="selectBox" onClick={() => this.showCheckboxes("have-kids-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">
            {this.state.have_kids_seek
              ? `${this.state.have_kids_seek.split(",")[0]}...` : "Have Kids"}
          </label>
        <div className="overSelect"></div>
          <div id="have-kids-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("have_kids_seek")} type="checkbox" value="No Kids"  checked={(this.state.have_kids_seek && this.state.have_kids_seek.includes("No Kids") )? "true" : ''}/>No Kids</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("have_kids_seek")} type="checkbox" value="Have kids and they live with me" checked={(this.state.have_kids_seek && this.state.have_kids_seek.includes("Have kids and they live with me") )? "true" : ''}/>Have kids and they live with me</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("have_kids_seek")} type="checkbox" value="Have kids and they sometimes live with me" checked={(this.state.have_kids_seek && this.state.have_kids_seek.includes("Have kids and they sometimes live with me") )? "true" : ''}/>Have kids and they sometimes live with me</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("have_kids_seek")} type="checkbox" value="Have kids that don't live with me" checked={(this.state.have_kids_seek && this.state.have_kids_seek.includes("Have kids that don't live with me") )? "true" : ''}/>Have kids that don't live with me</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("have_kids_seek")} type="checkbox" value="Have grown kids" checked={(this.state.have_kids_seek && this.state.have_kids_seek.includes("Have grown kids") )? "true" : ''}/>Have grown kids</label>

            <button onClick={this.handleSubmit}>Save changes</button>
          </div>
         </div>

        <br/>

      <label className="user-info-input-label">{this.state.want_kids_seek
        ? "Want Kids" : ""}</label>
        <br/>

        <div className="selectBox" onClick={() => this.showCheckboxes("want-kids-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">
            {this.state.want_kids_seek
              ? `${this.state.want_kids_seek.split(",")[0]}...` : "Want Kids"}
          </label>
        <div className="overSelect"></div>
          <div id="want-kids-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("want_kids_seek")} type="checkbox" value="Want Kids" checked={(this.state.want_kids_seek && this.state.want_kids_seek.includes("Want Kids") )? "true" : ''}/>Want Kids</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("want_kids_seek")} type="checkbox" value="Don't want kids" checked={(this.state.want_kids_seek && this.state.want_kids_seek.includes("Don't want kids") )? "true" : ''}/>Don't want kids</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("want_kids_seek")} type="checkbox" value="Don't want to have kids but welcome yours" checked={(this.state.want_kids_seek && this.state.want_kids_seek.includes("Don't want to have kids but welcome yours") )? "true" : ''}/>Don't want to have kids but welcome yours</label>
              <button onClick={this.handleSubmit}>Save changes</button>
         </div>
         </div>
        <br/>

      <label className="user-info-input-label">{this.state.relocate_seek
        ? "Willingness to Relocate" : ""}</label>
        <br/>

        <div className="selectBox" onClick={() => this.showCheckboxes("relocate-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">
            {this.state.relocate_seek
              ? `${this.state.relocate_seek.split(",")[0]}...` : "Willingness to Relocate"}
          </label>
        <div className="overSelect"></div>
          <div id="relocate-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("relocate_seek")} type="checkbox" value="Would consider relocating"  checked={(this.state.relocate_seek && this.state.relocate_seek.includes("Would consider relocating") )? "true" : ''}/>Would consider relocating</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("relocate_seek")} type="checkbox" value="I'd relocate" checked={(this.state.relocate_seek && this.state.relocate_seek.includes("I'd relocate") )? "true" : ''}/>I'd relocate</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("relocate_seek")} type="checkbox" value="Won't relocate" checked={(this.state.relocate_seek && this.state.relocate_seek.includes("Won't relocate") )? "true" : ''}/>Won't relocate</label>
              <button onClick={this.handleSubmit}>Save changes</button>
         </div>
         </div>
        <br/>

      <label className="user-info-input-label">{this.state.marital_status_seek
        ? "Marital Status" : ""}</label>
        <br/>

        <div className="selectBox" onClick={() => this.showCheckboxes("marital-status-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">
            {this.state.marital_status_seek
              ? `${this.state.marital_status_seek.split(",")[0]}...` : "Marital Status"}
          </label>
        <div className="overSelect"></div>
          <div id="marital-status-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("marital_status_seek")} type="checkbox" value="Divorced"  checked={(this.state.marital_status_seek && this.state.marital_status_seek.includes("Divorced") )? "true" : ''}/>Divorced</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("marital_status_seek")} type="checkbox" value="Widowed" checked={(this.state.marital_status_seek && this.state.marital_status_seek.includes("Widowed") )? "true" : ''}/>Widowed</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("marital_status_seek")} type="checkbox" value="Never Married" checked={(this.state.marital_status_seek && this.state.marital_status_seek.includes("Never Married") )? "true" : ''}/>Never Married</label>
              <button onClick={this.handleSubmit}>Save changes</button>
         </div>
         </div>
        <br/>

      <label className="user-info-input-label">{this.state.language_seek
        ? "Language" : ""}</label>
        <br/>

        <div className="selectBox" onClick={() => this.showCheckboxes("language-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">
            {this.state.language_seek
              ? `${this.state.language_seek.split(",")[0]}...` : "Language"}
          </label>
        <div className="overSelect"></div>
          <div id="language-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Arabic" checked={(this.state.language_seek && this.state.language_seek.includes("Arabic") )? "true" : ''}/>Arabic</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Bengali" checked={(this.state.language_seek && this.state.language_seek.includes("Bengali") )? "true" : ''}/>Bengali</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Bulgarian" checked={(this.state.language_seek && this.state.language_seek.includes("Bulgarian") )? "true" : ''}/>Bulgarian</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Chinese" checked={(this.state.language_seek && this.state.language_seek.includes("Chinese") )? "true" : ''}/>Chinese</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Czech" checked={(this.state.language_seek && this.state.language_seek.includes("Czech") )? "true" : ''}/>Czech</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Dutch" checked={(this.state.language_seek && this.state.language_seek.includes("Dutch") )? "true" : ''}/>Dutch</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="English" checked={(this.state.language_seek && this.state.language_seek.includes("English") )? "true" : ''}/>English</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Fijian" checked={(this.state.language_seek && this.state.language_seek.includes("Fijian") )? "true" : ''}/>Fijian</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="French" checked={(this.state.language_seek && this.state.language_seek.includes("French") )? "true" : ''}/>French</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="German" checked={(this.state.language_seek && this.state.language_seek.includes("German") )? "true" : ''}/>German</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Greek" checked={(this.state.language_seek && this.state.language_seek.includes("Greek") )? "true" : ''}/>Greek</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Hebrew" checked={(this.state.language_seek && this.state.language_seek.includes("Hebrew") )? "true" : ''}/>Hebrew</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Hindi" checked={(this.state.language_seek && this.state.language_seek.includes("Hindi") )? "true" : ''}/>Hindi</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Italian" checked={(this.state.language_seek && this.state.language_seek.includes("Italian") )? "true" : ''}/>Italian</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Japanese" checked={(this.state.language_seek && this.state.language_seek.includes("Japanese") )? "true" : ''}/>Japanese</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Korean" checked={(this.state.language_seek && this.state.language_seek.includes("Korean") )? "true" : ''}/>Korean</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Malay" checked={(this.state.language_seek && this.state.language_seek.includes("Malay") )? "true" : ''}/>Malay</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Mandarin" checked={(this.state.language_seek && this.state.language_seek.includes("Mandarin") )? "true" : ''}/>Manadarin</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Norwegianc" checked={(this.state.language_seek && this.state.language_seek.includes("Norwegian") )? "true" : ''}/>Norwegian</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Polish" checked={(this.state.language_seek && this.state.language_seek.includes("Polish") )? "true" : ''}/>Polish</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Portuguese"checked={(this.state.language_seek && this.state.language_seek.includes("Portuguese") )? "true" : ''}/>Portuguese</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Romanian" checked={(this.state.language_seek && this.state.language_seek.includes("Romanian") )? "true" : ''}/>Romanian</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Russian" checked={(this.state.language_seek && this.state.language_seek.includes("Ruassian") )? "true" : ''}/>Russian</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Samoan" checked={(this.state.language_seek && this.state.language_seek.includes("Samoan") )? "true" : ''}/>Samoan</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Spanish" checked={(this.state.language_seek && this.state.language_seek.includes("Spanish") )? "true" : ''}/>Spanish</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Swedish" checked={(this.state.language_seek && this.state.language_seek.includes("Swedish") )? "true" : ''}/>Swedish</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Tagalog" checked={(this.state.language_seek && this.state.language_seek.includes("Tagalog") )? "true" : ''}/>Tagalog</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Thai" checked={(this.state.language_seek && this.state.language_seek.includes("Thai") )? "true" : ''}/>Thai</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("language_seek")} type="checkbox" value="Vietnamese" checked={(this.state.language_seek && this.state.language_seek.includes("Vietnamese") )? "true" : ''}/>Vietnamese</label>

              <button onClick={this.handleSubmit}>Save changes</button>
            </div>
         </div>

        <br/>

      <label className="user-info-input-label">{this.state.ethnicity_seek
        ? "Ethnicity" : ""}</label>
        <br/>

        <div className="selectBox" onClick={() => this.showCheckboxes("ethnicity-seek-checkboxes")}>
          <label className="user-info-select-box" id="check-box-select">
            {this.state.ethnicity_seek
              ? `${this.state.ethnicity_seek.split(",")[0]}...` : "Ethnicity"}
          </label>
        <div className="overSelect"></div>
          <div id="ethnicity-seek-checkboxes">
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="African"  checked={(this.state.ethnicity_seek && this.state.ethnicity_seek.includes("African") )? "true" : ''}/>African</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Asian" checked={(this.state.ethnicity_seek && this.state.ethnicity_seek.includes("Asian") )? "true" : ''}/>Asian</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Black/African Descent" checked={(this.state.ethnicity_seek && this.state.ethnicity_seek.includes("Black") )? "true" : ''}/>Black/African Descent</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Caribbean" checked={(this.state.ethnicity_seek && this.state.ethnicity_seek.includes("Caribbean") )? "true" : ''}/>Caribbean</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Caucasian/White" checked={(this.state.ethnicity_seek && this.state.ethnicity_seek.includes("Caucasian/White") )? "true" : ''}/>Caucasian/White</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="East Indian" checked={(this.state.ethnicity_seek && this.state.ethnicity_seek.includes("East Indian") )? "true" : ''}/>East Indian</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Hispanic/Latin" checked={(this.state.ethnicity_seek && this.state.ethnicity_seek.includes("Hispanic/Latin") )? "true" : ''}/>Hispanic/Latin</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Middle Eastern"  checked={(this.state.ethnicity_seek && this.state.ethnicity_seek.includes("Middle Eastern") )? "true" : ''}/>Middle Eastern</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Native American"  checked={(this.state.ethnicity_seek && this.state.ethnicity_seek.includes("Native American") )? "true" : ''}/>Native American</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Pacific Islander"  checked={(this.state.ethnicity_seek && this.state.ethnicity_seek.includes("Pacific Islander") )? "true" : ''}/>Pacific Islander</label>
            <label className="check-box-text">
              <input onChange={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value="Other Ethnicity" checked={(this.state.ethnicity_seek && this.state.ethnicity_seek.includes("Other Ethnicity") )? "true" : ''}/>Other Ethnicity</label>

              <button onClick={this.handleSubmit}>Save changes</button>
          </div>
         </div>

        <br/>
        <br/>

        <div className="preferces-submit-button">

          <Link to="/editprofile">Submit</Link>
        </div>

      </div>

      </div>
    );
    }
  }
}

export default DiscoveryPreferences;
