import React from 'react';
import { Link } from 'react-router-dom';
import { merge } from 'lodash';
import TopHeaderContainer from '../top_header/top_header_container';
import LoadingPage from '../loading_page/loading_page';
import * as Attributes from '../attributes';
import 'nouislider';



class DiscoveryPreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showCheckboxes = this.showCheckboxes.bind(this);
    this.constructCheckboxes = this.constructCheckboxes.bind(this);
    this.inchesToFeet = this.inchesToFeet.bind(this);
  }

  componentDidMount() {
      this.props.getCurrentProfile(this.props.currentUser.id).then((action) => {
        this.setState(action.currentProfile)
      });
      window.scrollTo(0,0);
    }

  componentWillUnmount() {
    this.props.clearErrors(null);
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

    delete user.image;
    //make sure that the sex_seek is not empty
    if (this.state.sex_seek === "") {
      this.props.receiveErrors("Gender field empty");
      return;
    } else {
      this.props.clearErrors(null);
    }

    this.props.updateUserInfo(user);
    this.props.updateUiWindow(null);
  }


  updateValue(field) {

    return (e) => {

      let value = e.currentTarget.value;
      //make sure that if the field is related to height or
      //age, the min and max do not get switched
      if (field === "max_age_seek" && value < this.state.min_age_seek ) {
          return;
      } else if (field === "min_age_seek" && value > this.state.max_age_seek) {
        return;
      } else if (field === "max_height_seek" && value < this.state.min_height_seek) {
        return;
      } else if (field === "min_height_seek" && value > this.state.max_height_seek) {
        return;
      }


      this.setState({[field]: value});
    }
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

  constructCheckboxes(attribute) {

    let attributeInState = Attributes.setAttributeInStateVariable(attribute, this.state);
    let options = Attributes.setAttributesArrayVariable(attribute);

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

          <div className="checkbox-options-container" id={`${attribute}-checkboxes`} onMouseOut={(e) => this.handleSubmit(e)}>

            {options.map((choice, idx) => {
              return (
                <label key={idx} onClick={(e) => e.stopPropagation(e)} >
                  <input key={idx} onChange={this.updateCheckBoxValue(attribute)} type="checkbox" value={choice} checked={(attributeInState && attributeInState.split(",").includes(choice)) ? "true" : ''}/>{choice}</label>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }

  constructDropDownMenuForDistance (attribute) {

    let attributeInState = Attributes.setAttributeInStateVariable(attribute, this.state);
    let options = Attributes.setAttributesArrayVariable(attribute);

    return (
      <div className="user-info-input-attribute" >


        <div className="user-info-input-label">{attributeInState
          ? Attributes.checkboxesLabelText[attribute] : ""}</div>


          <select onChange={this.updateValue(attribute)}
            className="user-info-select-box" id="distance-discovery"
            onMouseOut={(e) => this.handleSubmit(e)}>
            {attributeInState && attributeInState === 500 ? attributeInState = attributeInState.toString().concat("+") : null }
            <option checked hidden>{attributeInState ? `${attributeInState} mi` : Attributes.checkboxesLabelText[attribute]}</option>

            {options.map((choice, idx) => {
              return (
                <option key={idx} value={choice}>{choice === 500 ? `${choice}+ mi` : `${choice} mi`}</option>
                );
              })
            }

          </select>
          <i className="fas fa-chevron-down" id="icon-for-select-box"></i>

      </div>
    );
  }

  inchesToFeet(inches) {
    let feet = Math.floor(inches/12);
    let remainingInches = inches % 12;

    return `${feet}'${remainingInches}"`
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
                <Link className="back-browse-link" to="/browse-new">
                  <i className="fas fa-chevron-left"><span>Back</span></i>
                </Link>

                <p className="my-profile-label">Discovery Preferences</p>

                <div className="empty-div"></div>
              </span>

              <section className="discovery-preferences-container">

{/* gender attribute*/}
                {this.props.errors.includes("Gender field empty") ? <span className="gender-error-span">You need to pick a gender</span> : "" }

                {this.constructCheckboxes("sex_seek")}

  {/* age attribute RANGE SLIDER eventually*/}
                <div className="user-info-input-attribute" onMouseOut={(e) => this.handleSubmit(e)}>


                    <div>Ages: {this.state.min_age_seek} - {this.state.max_age_seek === "75" || this.state.max_age_seek === 75 ? "75+" : this.state.max_age_seek}</div>

                      <input className="age-discovery-range" type="range" min="18" max="75"
                        onChange={this.updateValue("min_age_seek")} value={this.state.min_age_seek}></input>
                      <input className="age-discovery-range" type="range" min="18" max="75"
                        onChange={this.updateValue("max_age_seek")} value={this.state.max_age_seek}></input>

                </div>

{/* distance*/}

                <section className="distance-discovery-section" onMouseOut={(e) => this.handleSubmit(e)}>
                  <div className="distance-discovery-dropdown">
                    {this.constructDropDownMenuForDistance("distance_seek")}
                  </div>

                  <div className="distance-discovery-location">
                    <span>of</span>
                    <span>{this.props.currentProfile.city}, {this.props.currentProfile.state}</span>
                  </div>

                </section>
{/* religion attribute*/}

                {this.constructCheckboxes("religion_seek")}
{/* relationship type attribute*/}

                {this.constructCheckboxes("relationship_seek")}

{/* height attribute*/}

                <div className="user-info-input-attribute" onMouseOut={(e) => this.handleSubmit(e)}>


                    <div>Height: {this.inchesToFeet(this.state.min_height_seek)} - {this.state.max_height_seek === "96" || this.state.max_height_seek === 96 ? `8'0"+` : this.inchesToFeet(this.state.max_height_seek)}</div>

                      <input className="age-discovery-range" type="range" min="48" max="96"
                        onChange={this.updateValue("min_height_seek")} value={this.state.min_height_seek}></input>
                      <input className="age-discovery-range" type="range" min="48" max="96"
                        onChange={this.updateValue("max_height_seek")} value={this.state.max_height_seek}></input>

                </div>

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
