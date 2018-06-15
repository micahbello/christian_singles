import React from 'react';
import { Link } from 'react-router-dom';
import { merge } from 'lodash';
import TopHeaderContainer from '../top_header/top_header_container';
import LoadingPage from '../loading_page/loading_page';
import * as Attributes from '../attributes';


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
      return <LoadingPage />
      } else {
      return (

        <div>
          <TopHeaderContainer />
          <section className="user-profile-body">
            <section className="discovery-middle-section">

              <span className="user-profile-top-span">
                <Link className="back-browse-link" to="/browse">
                  <i className="fas fa-chevron-left"><span>Back</span></i>
                </Link>

                <p className="my-profile-label">Discovery Preferences</p>

                <div className="empty-div"></div>
              </span>

              <section className="discovery-preferences-container">

{/* gender attribute*/}
                <div className="user-info-input-attribute">

                  <div className="user-info-input-label">{this.state.sex_seek
                      ? "I'm Seeking" : ""}</div>

                  <div onClick={() => this.showCheckboxes("sex-seek-checkboxes")}>

                    <div className="dropdown-line-and-icon">

                      <div className="user-info-dropdown-select-box">
                        {this.state.sex_seek
                          ? `${this.state.sex_seek.split(",")[0]}...` : "I'm seeking"}
                      </div>
                      <i className="fas fa-chevron-down"></i>
                    </div>

                    <div id="sex-seek-checkboxes" onMouseOut={this.handleSubmit}>

                      {["Men", "Women"].map((gender) => {
                        return (
                          <label onClick={(e) => e.stopPropagation()} >
                            <input onClick={this.updateCheckBoxValue("sex_seek")} type="checkbox" value={gender} checked={(this.state.sex_seek && this.state.sex_seek.includes(gender)) ? "true" : ''}/>{gender}</label>
                          );
                        })
                      }

                    </div>
                  </div>
                </div>

{/* religion attribute*/}
                <div className="user-info-input-attribute">

                  <div className="user-info-input-label">{this.state.religion_seek
                      ? "Religion" : ""}</div>

                  <div onClick={() => this.showCheckboxes("religion-seek-checkboxes")}>

                    <div className="dropdown-line-and-icon">

                      <div className="user-info-dropdown-select-box">
                        {this.state.religion_seek
                          ? `${this.state.religion_seek.split(",")[0]}...` : "Religion"}
                      </div>
                      <i className="fas fa-chevron-down"></i>
                    </div>

                    <div id="religion-seek-checkboxes" onMouseOut={this.handleSubmit}>

                      {Attributes.religion.map((choice) => {
                        return (
                          <label onClick={(e) => e.stopPropagation()} >
                            <input onClick={this.updateCheckBoxValue("religion_seek")} type="checkbox" value={choice} checked={(this.state.religion_seek && this.state.religion_seek.includes(choice)) ? "true" : ''}/>{choice}</label>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>

{/* relationship type attribute*/}

                <div className="user-info-input-attribute">

                  <div className="user-info-input-label">{this.state.relationship_seek
                        ? "Relationship Type" : ""}</div>

                  <div onClick={() => this.showCheckboxes("relationship-seek-checkboxes")}>

                    <div className="dropdown-line-and-icon">

                      <div className="user-info-dropdown-select-box">
                        {this.state.relationship_seek
                          ? `${this.state.relationship_seek.split(",")[0]}...` : "Relationship Type"}
                      </div>
                      <i className="fas fa-chevron-down"></i>
                    </div>

                    <div id="relationship-seek-checkboxes" onMouseOut={this.handleSubmit}>

                      {Attributes.relationshipType.map((choice) => {
                        return (
                          <label onClick={(e) => e.stopPropagation()} >
                            <input onClick={this.updateCheckBoxValue("relationship_seek")} type="checkbox" value={choice} checked={(this.state.relationship_seek && this.state.relationship_seek.includes(choice)) ? "true" : ''}/>{choice}</label>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>

{/* education_seek attribute*/}

                <div className="user-info-input-attribute">

                  <div className="user-info-input-label">{this.state.education_seek
                      ? "Education" : ""}</div>

                  <div onClick={() => this.showCheckboxes("education-seek-checkboxes")}>

                    <div className="dropdown-line-and-icon">

                      <div className="user-info-dropdown-select-box">
                        {this.state.education_seek
                          ? `${this.state.education_seek.split(",")[0]}...` : "Level of Education"}
                      </div>
                      <i className="fas fa-chevron-down"></i>
                    </div>

                    <div id="education-seek-checkboxes" onMouseOut={this.handleSubmit}>

                      {Attributes.education.map((choice) => {
                        return (
                          <label onClick={(e) => e.stopPropagation()} >
                            <input onClick={this.updateCheckBoxValue("education_seek")} type="checkbox" value={choice} checked={(this.state.education_seek && this.state.education_seek.includes(choice)) ? "true" : ''}/>{choice}</label>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>

{/* attendance_seek attribute */}

                <div className="user-info-input-attribute">

                  <div className="user-info-input-label">{this.state.attendance_seek
                      ? "Church Attendance" : ""}</div>

                  <div onClick={() => this.showCheckboxes("attendance-seek-checkboxes")}>

                    <div className="dropdown-line-and-icon">

                      <div className="user-info-dropdown-select-box">
                        {this.state.attendance_seek
                          ? `${this.state.attendance_seek.split(",")[0]}...` : "Church Attendance"}
                      </div>
                      <i className="fas fa-chevron-down"></i>
                    </div>

                    <div id="attendance-seek-checkboxes" onMouseOut={this.handleSubmit}>

                      {Attributes.attendance.map((choice) => {
                        return (
                          <label onClick={(e) => e.stopPropagation()} >
                            <input onClick={this.updateCheckBoxValue("attendance_seek")} type="checkbox" value={choice} checked={(this.state.attendance_seek && this.state.attendance_seek.includes(choice)) ? "true" : ''}/>{choice}</label>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>

{/* smoking attribute */}

                <div className="user-info-input-attribute">

                  <div className="user-info-input-label">{this.state.smoke_seek
                      ? "Smoking Habits" : ""}</div>

                  <div onClick={() => this.showCheckboxes("smoke-seek-checkboxes")}>

                    <div className="dropdown-line-and-icon">

                      <div className="user-info-dropdown-select-box">
                        {this.state.smoke_seek
                          ? `${this.state.smoke_seek.split(",")[0]}...` : "Smoking Habits"}
                      </div>
                      <i className="fas fa-chevron-down"></i>
                    </div>

                    <div id="smoke-seek-checkboxes" onMouseOut={this.handleSubmit}>

                      {Attributes.smokingHabits.map((choice) => {
                        return (
                          <label onClick={(e) => e.stopPropagation()} >
                            <input onClick={this.updateCheckBoxValue("smoke_seek")} type="checkbox" value={choice} checked={(this.state.smoke_seek && this.state.smoke_seek.includes(choice)) ? "true" : ''}/>{choice}</label>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>

{/* drinking attribute */}

                <div className="user-info-input-attribute">

                  <div className="user-info-input-label">{this.state.drink_seek
                      ? "Drinking Habits" : ""}</div>

                  <div onClick={() => this.showCheckboxes("drink-seek-checkboxes")}>

                    <div className="dropdown-line-and-icon">

                      <div className="user-info-dropdown-select-box">
                        {this.state.drink_seek
                          ? `${this.state.drink_seek.split(",")[0]}...` : "Drinking Habits"}
                      </div>
                      <i className="fas fa-chevron-down"></i>
                    </div>

                    <div id="drink-seek-checkboxes" onMouseOut={this.handleSubmit}>

                      {Attributes.drinkingHabits.map((choice) => {
                        return (
                          <label onClick={(e) => e.stopPropagation()} >
                            <input onClick={this.updateCheckBoxValue("drink_seek")} type="checkbox" value={choice} checked={(this.state.drink_seek && this.state.drink_seek.includes(choice)) ? "true" : ''}/>{choice}</label>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>

{/* have_kidsattribute */}

                <div className="user-info-input-attribute">

                  <div className="user-info-input-label">{this.state.have_kids_seek
                      ? "Have Kids" : ""}</div>

                  <div onClick={() => this.showCheckboxes("have-kids-seek-checkboxes")}>

                    <div className="dropdown-line-and-icon">

                      <div className="user-info-dropdown-select-box">
                        {this.state.have_kids_seek
                          ? `${this.state.have_kids_seek.split(",")[0]}...` : "Have Kids"}
                      </div>
                      <i className="fas fa-chevron-down"></i>
                    </div>

                    <div id="have-kids-seek-checkboxes" onMouseOut={this.handleSubmit}>

                      {Attributes.haveKids.map((choice) => {
                        return (
                          <label onClick={(e) => e.stopPropagation()} >
                            <input onClick={this.updateCheckBoxValue("have_kids_seek")} type="checkbox" value={choice} checked={(this.state.have_kids_seek && this.state.have_kids_seek.includes(choice)) ? "true" : ''}/>{choice}</label>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>

{/* want_kids attribute */}

                <div className="user-info-input-attribute">

                  <div className="user-info-input-label">{this.state.want_kids_seek
                      ? "Want Kids" : ""}</div>

                  <div onClick={() => this.showCheckboxes("want-kids-seek-checkboxes")}>

                    <div className="dropdown-line-and-icon">

                      <div className="user-info-dropdown-select-box">
                        {this.state.want_kids_seek
                          ? `${this.state.want_kids_seek.split(",")[0]}...` : "Want Kids"}
                      </div>
                      <i className="fas fa-chevron-down"></i>
                    </div>

                    <div id="want-kids-seek-checkboxes" onMouseOut={this.handleSubmit}>

                      {Attributes.wantKids.map((choice) => {
                        return (
                          <label onClick={(e) => e.stopPropagation()} >
                            <input onClick={this.updateCheckBoxValue("want_kids_seek")} type="checkbox" value={choice} checked={(this.state.want_kids_seek && this.state.want_kids_seek.includes(choice)) ? "true" : ''}/>{choice}</label>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>

{/* relocate attribute */}

                <div className="user-info-input-attribute">

                  <div className="user-info-input-label">{this.state.relocate_seek
                      ? "Willingness to Relocate" : ""}</div>

                  <div onClick={() => this.showCheckboxes("relocate-seek-checkboxes")}>

                    <div className="dropdown-line-and-icon">

                      <div className="user-info-dropdown-select-box">
                      {this.state.relocate_seek
                        ? `${this.state.relocate_seek.split(",")[0]}...` : "Willingness to Relocate"}
                      </div>
                      <i className="fas fa-chevron-down"></i>
                    </div>

                    <div id="relocate-seek-checkboxes" onMouseOut={this.handleSubmit}>

                      {Attributes.relocate.map((choice) => {
                        return (
                          <label onClick={(e) => e.stopPropagation()} >
                            <input onClick={this.updateCheckBoxValue("relocate_seek")} type="checkbox" value={choice} checked={(this.state.relocate_seek && this.state.relocate_seek.includes(choice)) ? "true" : ''}/>{choice}</label>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>

{/* marital_status attribute */}


                <div className="user-info-input-attribute">

                  <div className="user-info-input-label">{this.state.marital_status_seek
                      ? "Marital Status" : ""}</div>

                  <div onClick={() => this.showCheckboxes("marital-status-seek-checkboxes")}>

                    <div className="dropdown-line-and-icon">

                      <div className="user-info-dropdown-select-box">
                        {this.state.marital_status_seek
                          ? `${this.state.marital_status_seek.split(",")[0]}...` : "Marital Status"}
                      </div>
                      <i className="fas fa-chevron-down"></i>
                    </div>

                    <div id="marital-status-seek-checkboxes" onMouseOut={this.handleSubmit}>

                      {Attributes.maritalStatus.map((choice) => {
                        return (
                          <label onClick={(e) => e.stopPropagation()} >
                            <input onClick={this.updateCheckBoxValue("marital_status_seek")} type="checkbox" value={choice} checked={(this.state.marital_status_seek && this.state.marital_status_seek.includes(choice)) ? "true" : ''}/>{choice}</label>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>

{/* language attribute */}


                <div className="user-info-input-attribute">

                  <div className="user-info-input-label">{this.state.language_seek
                      ? "Language" : ""}</div>

                  <div onClick={() => this.showCheckboxes("language-seek-checkboxes")}>

                    <div className="dropdown-line-and-icon">

                      <div className="user-info-dropdown-select-box">
                        {this.state.language_seek
                          ? `${this.state.language_seek.split(",")[0]}...` : "Language"}
                      </div>
                      <i className="fas fa-chevron-down"></i>
                    </div>

                    <div id="language-seek-checkboxes" onMouseOut={this.handleSubmit}>

                      {Attributes.languages.map((choice) => {
                        return (
                          <label onClick={(e) => e.stopPropagation()} >
                            <input onClick={this.updateCheckBoxValue("language_seek")} type="checkbox" value={choice} checked={(this.state.language_seek && this.state.language_seek.includes(choice)) ? "true" : ''}/>{choice}</label>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>

{/* ethnicity attribute */}


                <div className="user-info-input-attribute">

                  <div className="user-info-input-label">{this.state.ethnicity_seek
                      ? "Ethnicity" : ""}</div>

                  <div onClick={() => this.showCheckboxes("ethnicity-seek-checkboxes")}>

                    <div className="dropdown-line-and-icon">

                      <div className="user-info-dropdown-select-box">
                        {this.state.ethnicity_seek
                          ? `${this.state.ethnicity_seek.split(",")[0]}...` : "Ethnicity"}
                      </div>
                      <i className="fas fa-chevron-down"></i>
                    </div>

                    <div id="ethnicity-seek-checkboxes" onMouseOut={this.handleSubmit}>

                      {Attributes.ethnicities.map((choice) => {
                        return (
                          <label onClick={(e) => e.stopPropagation()} >
                            <input onClick={this.updateCheckBoxValue("ethnicity_seek")} type="checkbox" value={choice} checked={(this.state.ethnicity_seek && this.state.ethnicity_seek.includes(choice)) ? "true" : ''}/>{choice}</label>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>

                <Link className="done-button" to='/editprofile'>Done</Link>

              </section>

            </section>
          </section>
        </div>

      );
    }
  }
}


export default DiscoveryPreferences;



    //   <div id="preferences-ages-container">
    //
    //     <div>
    //     <label className="user-info-input-label">Minimum Age:</label>
    //       <br/>
    //       <input onChange={this.updateValue("min_age_seek")}
    //         onBlur={this.handleSubmit}
    //         className="user-info-input-box" id="age-choose" type="number" min= "18" max="75"
    //         value={this.state.min_age_seek? this.state.min_age_seek : 18}/>
    //       <br/>
    //     </div>
    //
    //     <div id="max-age">
    //     <label className="user-info-input-label">Maximum Age:</label>
    //       <br/>
    //       <input onChange={this.updateValue("max_age_seek")}
    //         onBlur={this.handleSubmit}
    //         className="user-info-input-box" id="age-choose" type="number" min= "18" max="75"
    //         value={this.state.max_age_seek? this.state.max_age_seek : 75}/>
    //       <br/>
    //       <br/>
    //     </div>
    //
    //     </div>
    //
    //
    //       <label className="user-info-input-label" id="distance-heading">{this.state.distance_seek
    //         ? "Distance" : ""}</label>
    //
    //     <div id="preferences-distance-container">
    //
    //
    //
    //       <select onChange={this.updateValue("distance_seek")}
    //         onBlur={this.handleSubmit}
    //         class="user-info-select-box" id="distance-choose">
    //           <option default hidden>{this.state.distance_seek ? `${this.state.distance_seek} mi` : "Distance"}</option>
    //
    //           <option  value="5"> 5 mi</option>
    //
    //           <option  value="10">10 mi</option>
    //
    //           <option  value="25">25 mi</option>
    //
    //           <option  value="50">50 mi</option>
    //
    //           <option  value="100"> 100 mi</option>
    //
    //           <option  value="500"> 500 mi</option>
    //       </select>
    //
    //
    //      <span id="of-distance">of</span>
    //      <input onChange={this.updateValue("zip_code")}
    //        onBlur={this.handleSubmit}
    //        className="user-info-input-box" id="zip-choose" type="number"
    //        value={this.state.zip_code}/>
    //
    //    </div>
