import React from 'react';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';
import AboutYouWindowContainer from '../about_you_window/about_you_window_container';
import TopHeaderContainer from '../top_header/top_header_container';
import LoadingPage from '../loading_page/loading_page';

class userInfoForm extends React.Component {


  constructor(props) {
    super(props);
    this.state = null;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.showCheckboxes = this.showCheckboxes.bind(this);
    this.updateCheckBoxValue = this.updateCheckBoxValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // if (this.state) {
    //   null
    // } else {
      this.props.getCurrentProfile(this.props.currentUser.id).then((action) => {
        this.setState(action.currentProfile)
      })
    }
  // }

  componentWillUnmount() {
    this.props.clearCurrentProfile();
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

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state, {id: this.props.currentUser.id});
    this.props.updateUserInfo(user);
  }

  handleClick() {
    this.props.updateUiWindow("AboutYouWindow");
  }


  render() {

    if (!this.state) {
      return <p>...Loading...</p>
    } else {

      return (



        <div className="edit-profile-page">

          <TopHeaderContainer />


      {this.props.currentWindow === "AboutYouWindow" ? <AboutYouWindowContainer /> : null}


          <span className="user-profile-span">

          <h2 className="edit-profile-text">Edit Profile</h2>

        {this.props.currentUser.id === this.props.currentProfile.id
            ?
            <div id="user-profile-edit-button">
            <Link id="user-profile-edit-link" to={`/profile/${this.props.currentUser.id}`} >View Profile</Link>
            </div>
            : null}

          </span>

          <div className="info-forms">


          <div className="user-info-pic-container">
            <img src={this.state.image} className="profile-full-pic"/>
          </div>

          <div className="main-info-fillout">

            <label className="user-info-input-label">{this.state.display_name
              ? "Display Name" : ""}</label>
              <br/>
              <input onChange={this.updateValue("display_name")}
                onBlur={this.handleSubmit}
                className="user-info-input-box" type="text"
                placeholder={this.state.display_name ? "" : "Display Name"}
                value={this.state.display_name ? this.state.display_name : ""}
                />
              <br/>
              <br/>


            <label className="user-info-input-label">{this.state.description
              ? "About You" : ""}</label>
              <br/>
              <input onClick={() => this.handleClick()}

                className="user-info-input-box" type="text"
                value={this.props.currentProfile.description ? this.props.currentProfile.description : " About You"}/>
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
                <option value="Episcopalian">Episcopalian</option>
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
                placeholder={this.state.occupation ? "" : "Occupation"}
                value={this.state.occupation ? this.state.occupation : ""}
                />
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


            <label className="user-info-input-label">{this.state.ethnicity
              ? "Ethnicity" : ""}</label>
              <br/>

              <div className="selectBox" onClick={() => this.showCheckboxes("ethnicity-checkboxes")}>
                <div className="user-info-dropdown-select-box" id="check-box-select">
                  {this.state.ethnicity
                    ? `${this.state.ethnicity.split(",")[0]}...` : "Ethnicity"}
                </div>
              <div className="overSelect"></div>
                <div id="ethnicity-checkboxes">
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="African" checked={(this.state.ethnicity && this.state.ethnicity.includes("African") )? "true" : ''} />African</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Asian" checked={(this.state.ethnicity && this.state.ethnicity.includes("Asian")) ? "true" : ''}/>Asian</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Black" checked={(this.state.ethnicity && this.state.ethnicity.includes("Black")) ? "true" : ''}/>Black</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Caribbean" checked={(this.state.ethnicity && this.state.ethnicity.includes("Caribbean")) ? "true" : ''}/>Caribbean</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Caucasian/White" checked={(this.state.ethnicity && this.state.ethnicity.includes("Caucasian/White")) ? "true" : ''}/>Caucasian/White</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="East Indian" checked={(this.state.ethnicity && this.state.ethnicity.includes("East Indian")) ? "true" : ''}/>East Indian</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Hispanic/Latin" checked={(this.state.ethnicity && this.state.ethnicity.includes("Hispanic/Latin")) ? "true" : ''}/>Hispanic/Latin</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Middle Eastern" checked={(this.state.ethnicity && this.state.ethnicity.includes("Middle Eastern")) ? "true" : ''}/>Middle Eastern</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Native American" checked={(this.state.ethnicity && this.state.ethnicity.includes("Native American")) ? "true" : ''}/>Native American</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Pacific Islander" checked={(this.state.ethnicity && this.state.ethnicity.includes("Pacific Islander")) ? "true" : ''}/>Pacific Islander</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("ethnicity")} type="checkbox" value="Other Ethnicity" checked={(this.state.ethnicity && this.state.ethnicity.includes("Other Ethnicity")) ? "true" : ''}/>Other Ethnicity</label>

                  <button onClick={this.handleSubmit}>Save changes</button>

                </div>
               </div>


              <br/>

              <label className="user-info-input-label">{this.state.language
                ? "Language" : ""}</label>
                <br/>

              <div className="selectBox" onClick={() => this.showCheckboxes("language-checkboxes")}>
                <div className="user-info-dropdown-select-box" id="check-box-select">
                  {this.state.language
                    ? `${this.state.language.split(",")[0]}...` : "Language"}
                  </div>


              <div className="overSelect"></div>
                <div id="language-checkboxes">
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Arabic" checked={(this.state.language && this.state.language.includes("Arabic") )? "true" : ''}/>Arabic</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Bengali" checked={(this.state.language && this.state.language.includes("Bengali") )? "true" : ''}/>Bengali</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Bulgarian" checked={(this.state.language && this.state.language.includes("Bulgarian") )? "true" : ''}/>Bulgarian</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Chinese" checked={(this.state.language && this.state.language.includes("Chinese") )? "true" : ''}/>Chinese</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Czech" checked={(this.state.language && this.state.language.includes("Czech") )? "true" : ''}/>Czech</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Dutch" checked={(this.state.language && this.state.language.includes("Dutch") )? "true" : ''}/>Dutch</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="English" checked={(this.state.language && this.state.language.includes("English") )? "true" : ''}/>English</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Fijian" checked={(this.state.language && this.state.language.includes("Fijian") )? "true" : ''}/>Fijian</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="French" checked={(this.state.language && this.state.language.includes(" French") )? "true" : ''}/>French</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="German" checked={(this.state.language && this.state.language.includes("German") )? "true" : ''}/>German</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Greek" checked={(this.state.language && this.state.language.includes("Greek") )? "true" : ''}/>Greek</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Hebrew" checked={(this.state.language && this.state.language.includes("Hebrew") )? "true" : ''}/>Hebrew</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Hindi" checked={(this.state.language && this.state.language.includes("Hindi") )? "true" : ''}/>Hindi</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Italian" checked={(this.state.language && this.state.language.includes("Italian") )? "true" : ''}/>Italian</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Japanese" checked={(this.state.language && this.state.language.includes("Japanese") )? "true" : ''}/>Japanese</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Korean" checked={(this.state.language && this.state.language.includes("Korean") )? "true" : ''}/>Korean</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Malay" checked={(this.state.language && this.state.language.includes("Malay") )? "true" : ''}/>Malay</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Mandarin" checked={(this.state.language && this.state.language.includes("Mandarin") )? "true" : ''}/>Manadarin</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Norwegian" checked={(this.state.language && this.state.language.includes("Norwegian") )? "true" : ''}/>Norwegian</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Polish" checked={(this.state.language && this.state.language.includes("Polish") )? "true" : ''}/>Polish</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Portuguese"checked={(this.state.language && this.state.language.includes("Portuguese") )? "true" : ''}/>Portuguese</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Romanian" checked={(this.state.language && this.state.language.includes("Romanian") )? "true" : ''}/>Romanian</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Russian" checked={(this.state.language && this.state.language.includes("Russian") )? "true" : ''}/>Russian</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Samoan" checked={(this.state.language && this.state.language.includes("Samoan") )? "true" : ''}/>Samoan</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Spanish" checked={(this.state.language && this.state.language.includes("Spanish") )? "true" : ''}/>Spanish</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Swedish" checked={(this.state.language && this.state.language.includes("Swedish") )? "true" : ''}/>Swedish</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Tagalog" checked={(this.state.language && this.state.language.includes("Tagalog") )? "true" : ''}/>Tagalog</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Thai" checked={(this.state.language && this.state.language.includes("Thai") )? "true" : ''}/>Thai</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("language")} type="checkbox" value="Vietnamese" checked={(this.state.language && this.state.language.includes("Vietnamese") )? "true" : ''}/>Vietnamese</label>

                  <button onClick={this.handleSubmit}>Save changes</button>
                  </div>
               </div>

              <br/>

            <label className="user-info-input-label">{this.state.pets
              ? "Pets" : ""}</label>
              <br/>

              <div className="selectBox" onClick={() => this.showCheckboxes("pets-checkboxes")}>
                <div className="user-info-dropdown-select-box" id="check-box-select">
                  {this.state.pets
                    ? `${this.state.pets.split(",")[0]}...` : "Pets"}
                </div>
              <div className="overSelect"></div>
                <div id="pets-checkboxes">
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("pets")} type="checkbox" value="Have bird(s)" checked={(this.state.pets && this.state.pets.includes("Have bird(s)") )? "true" : ''} />Have bird(s)</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("pets")} type="checkbox" value="Have cat(s)" checked={(this.state.pets && this.state.pets.includes("Have cat(s)") )? "true" : ''} />Have cat(s)</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("pets")} type="checkbox" value="Have dog(s)" checked={(this.state.pets && this.state.pets.includes("Have dog(s)") )? "true" : ''} />Have dog(s)</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("pets")} type="checkbox" value="Have fish" checked={(this.state.pets && this.state.pets.includes("Have fish") )? "true" : ''} />Have fish</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("pets")} type="checkbox" value="No pets but want them" checked={(this.state.pets && this.state.pets.includes("No pets but want them") )? "true" : ''} />No pets but want them</label>
                  <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                    <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("pets")} type="checkbox" value="Have a pet (ask me)" checked={(this.state.pets && this.state.pets.includes("Have a pet (ask me)") )? "true" : ''} />Have a pet (ask me)</label>

                    <button onClick={this.handleSubmit}>Save changes</button>

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


          <label className="user-info-input-label">{this.state.first_date
            ? "Peferred First Date" : ""}</label>
            <br/>

            <div className="selectBox" onClick={() => this.showCheckboxes("dates-checkboxes")}>
              <div className="user-info-dropdown-select-box" id="check-box-select">
                {this.state.first_date
                  ? `${this.state.first_date.split(",")[0]}...` : "Peferred First Date"}
              </div>
            <div className="overSelect"></div>
              <div id="dates-checkboxes">
                <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                  <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("first_date")} type="checkbox" value="Coffee or tea" checked={(this.state.first_date && this.state.first_date.includes("Coffee or tea") )? "true" : ''}  />Coffee or tea</label>
                <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                  <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("first_date")} type="checkbox" value="Drinks"  checked={(this.state.first_date && this.state.first_date.includes("Drinks") )? "true" : ''}  />Drinks</label>
                <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                  <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("first_date")} type="checkbox" value="A meal"  checked={(this.state.first_date && this.state.first_date.includes("A meal") )? "true" : ''}  />A meal</label>
                <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                  <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("first_date")} type="checkbox" value="To be surprised" checked={(this.state.first_date && this.state.first_date.includes("To be surprised") )? "true" : ''}  />To be surprised</label>
                <label onClick={(e) => e.stopPropagation()} className="check-box-text">
                  <input onClick={(e) => e.stopPropagation()} onChange={this.updateCheckBoxValue("first_date")} type="checkbox" value="A walk or hike"  checked={(this.state.first_date && this.state.first_date.includes("A walk or hike") )? "true" : ''}  />A walk or hike</label>

                    <button onClick={this.handleSubmit}>Save changes</button>

              </div>
             </div>

            <br/>

          <label className="user-info-input-label">Discovery Preferences</label>
            <br/>
          <Link className="edit-preferences-link" to="/discoverypreferences">Edit preferences</Link>

            </div>

          </div>

        </div>
      );
    }

  }


}

export default userInfoForm;








///


// if (!this.state) {
//   return <LoadingPage />
//   } else {
//   return (
//
//     <div>
//       <TopHeaderContainer />
//
//       <section className="user-profile-body">
//
//         <div className="user-profile-middle">
//
//           <span className="user-profile-top-span">
//
//               <Link className="back-browse-link" to="/browse">
//                 <i class="fas fa-chevron-left"><span>Back</span></i>
//               </Link>
//
//               <p className="my-profile-label">{this.props.currentUser.id === this.props.currentProfile.id ? "My Profile" : ""}</p>
//
//               {this.props.currentUser.id === this.props.currentProfile.id ?
//                 <Link className="edit-profile-button" to='/editprofile'>Edit Profile</Link> : " "
//               }
//           </span>
//
//           <section className="user-profile-pic-info-container">
//
//             <figure>
//
//             </figure>
//
//             <section className="profile-info-container">
//
//                 <section className="profile-info-box-top-part">
//
//
//                 </section>
//
//                 <section className="profile-info-box-second-part">
//
//                 </section>
//
//             </section>
//
//           </section>
//
//
//         </div>
//
//       </section>
//
//     </div>
//
//   );
// }
