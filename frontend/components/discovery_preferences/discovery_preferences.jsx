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
    this.constructCheckboxes = this.constructCheckboxes.bind(this);
    this.setAttributesArrayVariable = this.setAttributesArrayVariable.bind(this);
    this.setAttributeInStateVariable = this.setAttributeInStateVariable.bind(this);
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
      else if (!this.state[field].split(",").includes(e.currentTarget.value)) {
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

  setAttributeInStateVariable (attribute) {
    let attributeInState;

    attribute === "relationship_seek" ? attributeInState = this.state.relationship_seek : null;
    attribute === "sex_seek" ? attributeInState = this.state.sex_seek : null;
    attribute === "religion_seek" ? attributeInState = this.state.religion_seek : null;
    attribute === "attendance_seek" ? attributeInState = this.state.attendance_seek : null;
    attribute === "education_seek" ? attributeInState = this.state.education_seek : null;
    attribute === "smoke_seek" ? attributeInState = this.state.smoke_seek : null;
    attribute === "drink_seek" ? attributeInState = this.state.drink_seek : null;
    attribute === "have_kids_seek" ? attributeInState = this.state.have_kids_seek : null;
    attribute === "want_kids_seek" ? attributeInState = this.state.want_kids_seek : null;
    attribute === "relocate_seek" ? attributeInState = this.state.relocate_seek : null;
    attribute === "marital_status_seek" ? attributeInState = this.state.marital_status_seek : null;
    attribute === "language_seek" ? attributeInState = this.state.language_seek : null;
    attribute === "ethnicity_seek" ? attributeInState = this.state.ethnicity_seek : null;

    return attributeInState;
  }

  setAttributesArrayVariable(attribute) {
    let options;

    attribute === "relationship_seek" ? options = Attributes.relationship : null;
    attribute === "sex_seek" ? options = Attributes.sex : null;
    attribute === "religion_seek" ? options = Attributes.religion : null;
    attribute === "education_seek" ? options = Attributes.education : null;
    attribute === "attendance_seek" ? options = Attributes.attendance : null;
    attribute === "smoke_seek" ? options = Attributes.smokingHabits : null;
    attribute === "drink_seek" ? options = Attributes.drinkingHabits : null;
    attribute === "have_kids_seek" ? options = Attributes.haveKids : null;
    attribute === "want_kids_seek" ? options = Attributes.wantKids : null;
    attribute === "relocate_seek" ? options = Attributes.relocate : null;
    attribute === "marital_status_seek" ? options = Attributes.maritalStatus : null;
    attribute === "language_seek" ? options = Attributes.languages : null;
    attribute === "ethnicity_seek" ? options = Attributes.ethnicities : null;

    return options;
  }

  constructCheckboxes(attribute) {

    let attributeInState = this.setAttributeInStateVariable(attribute);
    let options = this.setAttributesArrayVariable(attribute);

    return (
      <div className="user-info-input-attribute">

        <div className="user-info-input-label">{attributeInState
              ? Attributes.checkboxesLabelText[attribute] : ""}</div>

        <div onClick={() => this.showCheckboxes(`${attribute}-checkboxes`)}>

          <div className="dropdown-line-and-icon">

            <div className="user-info-dropdown-select-box">
              {attributeInState
                ? `${attributeInState.split(",")[0]}...` : Attributes.checkboxesLabelText[attribute]}
            </div>
            <i className="fas fa-chevron-down"></i>
          </div>

          <div id={`${attribute}-checkboxes`} onMouseOut={this.handleSubmit}>

            {options.map((choice) => {
              return (
                <label onClick={(e) => e.stopPropagation()} >
                  <input onClick={this.updateCheckBoxValue(attribute)} type="checkbox" value={choice} checked={(attributeInState && attributeInState.split(",").includes(choice)) ? "true" : ''}/>{choice}</label>
                );
              })
            }
          </div>
        </div>
      </div>
    );
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
                {this.constructCheckboxes("sex_seek")}

{/* religion attribute*/}

                {this.constructCheckboxes("religion_seek")}
{/* relationship type attribute*/}

                {this.constructCheckboxes("relationship_seek")}

{/* education_seek attribute*/}

                {this.constructCheckboxes("education_seek")}

{/* attendance_seek attribute */}

                {this.constructCheckboxes("attendance_seek")}

{/* smoking attribute */}

                {this.constructCheckboxes("smoke_seek")}

{/* drinking attribute */}

                {this.constructCheckboxes("drink_seek")}

{/* have_kidsattribute */}

                {this.constructCheckboxes("have_kids_seek")}

{/* want_kids attribute */}

                {this.constructCheckboxes("want_kids_seek")}

{/* relocate attribute */}

                {this.constructCheckboxes("relocate_seek")}

{/* marital_status attribute */}

                {this.constructCheckboxes("marital_status_seek")}

{/* language attribute */}

                {this.constructCheckboxes("language_seek")}

{/* ethnicity attribute */}

                {this.constructCheckboxes("ethnicity_seek")}

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
