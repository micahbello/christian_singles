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
      });
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

  handleCheckBoxClick(e) {
    this.updateCheckBoxValue("ethnicity");
  }


  render() {

    if (!this.state) {
      return <LoadingPage />
      } else {
      return (

        <div>
          <TopHeaderContainer />

{/* About you window modal*/}
          {this.props.currentWindow === "AboutYouWindow" ? <AboutYouWindowContainer /> : null}
{/* */}

          <section className="user-profile-body">

            <div className="user-profile-middle">

              <span className="user-profile-top-span">

                  <Link className="back-browse-link" to={`/profile/${this.props.currentUser.id}`}>
                    <i className="fas fa-chevron-left"><span>View Profile</span></i>
                  </Link>

                  <p className="my-profile-label">{this.props.currentUser.id === this.props.currentProfile.id ? "My Profile" : ""}</p>

                  <div className="empty-div"></div>
              </span>

              <section className="user-profile-pic-info-container">

                <figure>
                  <img src={this.props.currentProfile.image} className="profile-full-pic"/>
                </figure>

{/* display name attribute*/}
                <section className="profile-edit-info-container">

                  <div className="user-info-input-attribute">
                    <div className="user-info-input-label">{this.state.display_name
                      ? "Display Name" : ""}</div>

                    <input onChange={this.updateValue("display_name")}
                      onBlur={this.handleSubmit}
                      className="user-info-input-box" type="text"
                      placeholder={this.state.display_name ? "" : "Display Name"}
                      value={this.state.display_name ? this.state.display_name : ""}
                      />
                  </div>

{/* about you attribute*/}

                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.state.description
                      ? "About You" : ""}</div>

                      {/* onClick={() => this.handleClick()} */}
                      {/* value={this.props.currentProfile.description ? this.props.currentProfile.description : "About You"}/>*/}
                      <input onChange={this.updateValue("description")}
                        onBlur={this.handleSubmit}
                        className="user-info-input-box" type="text"
                        placeholder="About You"
                        value={this.state.description ? this.state.description : ""}/>
                  </div>

{/* have kids attribute*/}

                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.state.have_kids
                      ? "Have Kids" : ""}</div>

                      <select onChange={this.updateValue("have_kids")}
                        onMouseOut={this.handleSubmit}
                        className="user-info-select-box">
                        <option default hidden>{this.state.have_kids ? this.state.have_kids : "Have Kids"}</option>

                        {haveKids.map((choice) => {
                          return (
                            <option value={choice}>{choice}</option>
                            );
                          })
                        }

                      </select>
                      <i className="fas fa-chevron-down"></i>

                  </div>

{/* want kids attribute*/}

                  <div className="user-info-input-attribute">

                  <div className="user-info-input-label">{this.state.want_kids
                    ? "Want Kids" : ""}</div>

                    <select onChange={this.updateValue("want_kids")}
                      onMouseOut={this.handleSubmit}
                      className="user-info-select-box">
                      <option default hidden>{this.state.want_kids ? this.state.want_kids : "Want Kids"}</option>

                      {wantKids.map((choice) => {
                        return (
                          <option value={choice}>{choice}</option>
                          );
                        })
                      }

                    </select>
                    <i className="fas fa-chevron-down"></i>
                  </div>

{/* marital status attribute*/}

                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.state.marital_status
                      ? "Marital Status" : ""}</div>

                      <select onChange={this.updateValue("marital_status")}
                        onMouseOut={this.handleSubmit}
                        className="user-info-select-box">
                        <option default hidden>{this.state.marital_status ? this.state.marital_status : "Marital Status"}</option>

                        {maritalStatus.map((choice) => {
                          return (
                            <option value={choice}>{choice}</option>
                            );
                          })
                        }

                      </select>
                      <i className="fas fa-chevron-down"></i>
                  </div>

{/* Willingness to relocate attribute*/}

                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.state.relocate
                      ? "Willingness to Relocate" : ""}</div>

                      <select onChange={this.updateValue("relocate")}
                        onMouseOut={this.handleSubmit}
                        className="user-info-select-box">
                        <option default hidden>{this.state.relocate ? this.state.relocate : "Willingness To Relocate"}</option>

                        {relocate.map((choice) => {
                          return (
                            <option value={choice}>{choice}</option>
                            );
                          })
                        }

                      </select>
                      <i className="fas fa-chevron-down"></i>
                  </div>

{/* religion attribute*/}

                  <div className="user-info-input-attribute">

                  <div className="user-info-input-label">{this.state.religion
                    ? "Religion" : ""}</div>

                    <select onChange={this.updateValue("religion")}
                      onMouseOut={this.handleSubmit}
                      className="user-info-select-box">
                      <option default hidden>{this.state.religion ? this.state.religion : "Religion"}</option>

                      {religion.map((choice) => {
                        return (
                          <option value={choice}>{choice}</option>
                          );
                        })
                      }

                    </select>
                    <i className="fas fa-chevron-down"></i>

                  </div>

{/* church attendance attribute*/}

                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.state.attendance
                      ? "Church Attendance" : ""}</div>

                      <select onChange={this.updateValue("attendance")}
                        onMouseOut={this.handleSubmit}
                        className="user-info-select-box">
                        <option default hidden>{this.state.attendance ? this.state.attendance : "Church Attendance"}</option>

                        {attendance.map((choice) => {
                          return (
                            <option value={choice}>{choice}</option>
                            );
                          })
                        }

                      </select>
                      <i className="fas fa-chevron-down"></i>
                  </div>

{/* occupation attribute*/}

                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.state.occupation
                      ? "Occupation" : ""}</div>

                      <input onChange={this.updateValue("occupation")}
                        onBlur={this.handleSubmit}
                        className="user-info-input-box" type="text"
                        placeholder={this.state.occupation ? "" : "Occupation"}
                        value={this.state.occupation ? this.state.occupation : ""}
                        />
                  </div>

{/* education attribute*/}

                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.state.education
                      ? "Level of Education" : ""}</div>

                    <select onChange={this.updateValue("education")}
                      onMouseOut={this.handleSubmit}
                      className="user-info-select-box">
                      <option default hidden>{this.state.education ? this.state.education : "Level of Education"}</option>

                      {education.map((choice) => {
                        return (
                          <option value={choice}>{choice}</option>
                          );
                        })
                      }

                    </select>
                    <i className="fas fa-chevron-down"></i>
                  </div>

{/* ethnicity attribute*/}

                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.state.ethnicity
                      ? "Ethnicity" : ""}</div>

                    <div onClick={() => this.showCheckboxes("ethnicity-checkboxes")}>

                      <div className="dropdown-line-and-icon">
                        <div className="user-info-dropdown-select-box">
                          {this.state.ethnicity
                            ? `${this.state.ethnicity.split(",")[0]}...` : "Ethnicity"}
                        </div>
                        <i className="fas fa-chevron-down"></i>
                      </div>

                      <div id="ethnicity-checkboxes" onMouseOut={this.handleSubmit}>

                        {ethnicities.map((ethnicity) => {
                          return (
                            <label onClick={(e) => e.stopPropagation()} >
                              <input onClick={this.updateCheckBoxValue("ethnicity")} type="checkbox" value={ethnicity} checked={(this.state.ethnicity && this.state.ethnicity.includes(ethnicity)) ? "true" : ''}/>{ethnicity}</label>
                            );
                          })
                        }

                      </div>
                    </div>
                  </div>

{/* Language attribute*/}
                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.state.language
                      ? "Language" : ""}</div>

                    <div onClick={() => this.showCheckboxes("language-checkboxes")}>

                      <div className="dropdown-line-and-icon">

                        <div className="user-info-dropdown-select-box">
                          {this.state.language
                            ? `${this.state.language.split(",")[0]}...` : "Language"}
                        </div>
                        <i className="fas fa-chevron-down"></i>
                      </div>

                      <div id="language-checkboxes" onMouseOut={this.handleSubmit}>

                        {languages.map((language) => {
                          return (
                            <label onClick={(e) => e.stopPropagation()} >
                              <input onClick={this.updateCheckBoxValue("language")} type="checkbox" value={language} checked={(this.state.language && this.state.language.includes(language)) ? "true" : ''}/>{language}</label>
                            );
                          })
                        }

                      </div>
                    </div>
                  </div>

{/* pets attribute*/}

                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.state.pets
                      ? "Pets" : ""}</div>

                    <div onClick={() => this.showCheckboxes("pets-checkboxes")}>

                      <div className="dropdown-line-and-icon">

                        <div className="user-info-dropdown-select-box" id="check-box-select">
                          {this.state.pets
                            ? `${this.state.pets.split(",")[0]}...` : "Pets"}
                        </div>
                          <i className="fas fa-chevron-down"></i>
                      </div>

                      <div id="pets-checkboxes" onMouseOut={this.handleSubmit}>

                        {pets.map((pets) => {
                          return (
                            <label onClick={(e) => e.stopPropagation()} >
                              <input onClick={this.updateCheckBoxValue("pets")} type="checkbox" value={pets} checked={(this.state.pets && this.state.pets.includes(pets)) ? "true" : ''}/>{pets}</label>
                            );
                          })
                        }

                      </div>
                    </div>
                  </div>

{/* drinking habits */}

                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.state.drink
                      ? "Drinking Habits" : ""}</div>

                    <select onChange={this.updateValue("drink")}
                      onMouseOut={this.handleSubmit}
                      className="user-info-select-box">
                      <option default hidden>{this.state.drink ? this.state.drink : "Drinking Habits"}</option>

                      {drinkingHabits.map((choice) => {
                        return (
                          <option value={choice}>{choice}</option>
                          );
                        })
                      }

                    </select>
                    <i className="fas fa-chevron-down"></i>
                  </div>

{/* smoking habits */}

                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.state.smoke
                      ? "Smoking Habits" : ""}</div>

                    <select onChange={this.updateValue("smoke")}
                      onMouseOut={this.handleSubmit}
                      className="user-info-select-box">
                      <option default hidden>{this.state.smoke ? this.state.smoke : "Smoking Habits"}</option>

                      {smokingHabits.map((choice) => {
                        return (
                          <option value={choice}>{choice}</option>
                          );
                        })
                      }

                    </select>
                    <i className="fas fa-chevron-down"></i>

                  </div>
{/* pets attribute*/}

                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.state.first_date
                      ? "Preferred First Date" : ""}</div>

                    <div onClick={() => this.showCheckboxes("dates-checkboxes")}>

                      <div className="dropdown-line-and-icon">

                        <div className="user-info-dropdown-select-box" id="check-box-select">
                          {this.state.first_date
                            ? `${this.state.first_date.split(",")[0]}...` : "Preferred First Date"}
                        </div>
                          <i className="fas fa-chevron-down"></i>
                      </div>

                      <div id="dates-checkboxes" onMouseOut={this.handleSubmit}>

                        {firstDates.map((date) => {
                          return (
                            <label onClick={(e) => e.stopPropagation()} >
                              <input onClick={this.updateCheckBoxValue("first_date")} type="checkbox" value={date} checked={(this.state.first_date && this.state.first_date.includes(date)) ? "true" : ''}/>{date}</label>
                            );
                          })
                        }

                      </div>
                    </div>
                  </div>
{/* end of attributes*/}
                </section>
              </section>


            </div>

          </section>

        </div>

      );
    }
  }
}

export default userInfoForm;

const smokingHabits = [
    "Smoke regularly",
    "Smoke ocassionally",
    "Non-Smoker",
    "Trying to quit smoking"
];

const drinkingHabits = [
    "Drink Frequently",
    "Drink Socially",
    "Drink On Occassion",
    "Never Drink"
  ];

const education = [
    "High School",
    "College",
    "Bachelor's Degree",
    "Master's Degree",
    "JD/PhD/Post Doc"
  ];

const attendance = [
    "Attend church every week",
    "Attend church on special occasions",
    "Attend church once or twice a month",
    "Attend church several times a year"
  ];

const religion = [
    "Anglican",
    "Assembly",
    "Baptist",
    "Catholic",
    "Charismatic",
    "Christian Reformed",
    "Church of Christ",
    "Episcopalian",
    "Evangelical",
    "Interdenominational",
    "Lutheran",
    "Messianic",
    "Nazerene",
    "Non-denominational",
    "Not sure yet",
    "Orthodox",
    "Pentecostal",
    "Presbyeterian",
    "Seventh-Day Adventist",
    "Southern Baptist",
    "Other Religion"
];

const relocate = [
    "Would Consider Relocating",
    "I'd Relocate",
    "Won't Relocate"
  ];

const maritalStatus = [
    "Divorced",
    "Widowed",
    "Never Married"
  ];

const wantKids = [
    "Want kids",
    "Don't want kids",
    "Don't want to have kids but welcome yours"
  ];

const haveKids = [
  "No kids",
  "Have kids and they live with me",
  "Have kids and they sometimes live with me",
  "Have grown children"
  ];

const languages = [
    "Arabic",
    "Bengali",
    "Bulgarian",
    "Chinese",
    "Czech",
    "Dutch",
    "English",
    "Fijian",
    "French",
    "German",
    "Greek",
    "Hebrew",
    "Hindi",
    "Italian",
    "Japanese",
    "Korean",
    "Malay",
    "Manadarin",
    "Norwegian",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Samoan",
    "Spanish",
    "Swedish",
    "Tagalog",
    "Thai",
    "Vietnamese"
  ];

const ethnicities = [
    "African",
    "Asian",
    "Black",
    "Caribbean",
    "Caucasian/White",
    "East Indian",
    "Hispanic/Latin",
    "Middle Eastern",
    "Native American",
    "Pacific Islander",
    "Other Ethnicity"
  ];

const pets = [
    "Have bird(s)",
    "Have cat(s)",
    "Have dog(s)",
    "Have fish",
    "No pets but want them",
    "Have a pet (ask me)"
  ];

const firstDates = [
      "Coffee or tea",
      "Drinks",
      "A meal",
      "To be surprised",
      "A walk or hike"
    ];
