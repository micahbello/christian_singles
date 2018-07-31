import React from 'react';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';
import AboutYouWindowContainer from '../about_you_window/about_you_window_container';
import TopHeaderContainer from '../top_header/top_header_container';
import LoadingPage from '../loading_page/loading_page';
import HobbiesWindowContainer from  '../hobbies/hobbies_container';
import PicUpload from '../pic_upload/pic_upload_container';
import * as Attributes from '../attributes';


class userInfoForm extends React.Component {


  constructor(props) {
    super(props);
    this.state = null;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.showCheckboxes = this.showCheckboxes.bind(this);
    this.updateCheckBoxValue = this.updateCheckBoxValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.constructCheckboxes = this.constructCheckboxes.bind(this);
    this.constructDropDownMenu = this.constructDropDownMenu.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.inchesToFeet = this.inchesToFeet.bind(this);
    // this.triggerClick = this.triggerClick.bind(this);
  }

  componentDidMount() {
    // if (this.state) {
    //   null
    // } else {
      this.props.getCurrentProfile(this.props.currentUser.id).then((action) => {
        this.setState(action.currentProfile)
      });
      window.scrollTo(0,0);
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
                ? `${attributeInState.split(",").join(", ")}` : Attributes.checkboxesLabelText[attribute]}
            </div>
            <i className="fas fa-chevron-down"></i>
          </div>

          <div className="checkbox-options-container" id={`${attribute}-checkboxes`}>


            {options.map((choice, idx) => {
              return (
                <label key={idx} onClick={(e) => e.stopPropagation(e)} onMouseOut={(e) => this.handleSubmit(e)} >
                  <input key={idx} onChange={this.updateCheckBoxValue(attribute)} type="checkbox" value={choice} checked={(attributeInState && attributeInState.split(",").includes(choice)) ? "true" : ''}/>{choice}</label>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }

  constructDropDownMenu (attribute) {

    let attributeInState = Attributes.setAttributeInStateVariable(attribute, this.state);
    let options = Attributes.setAttributesArrayVariable(attribute);

    return (
      <div className="user-info-input-attribute" >

        <div className="user-info-input-label">{attributeInState
          ? Attributes.checkboxesLabelText[attribute] : ""}</div>


          <select onChange={this.updateValue(attribute)} onClick={() => console.log("hello")}
            className="user-info-select-box"
            onMouseOut={(e) => this.handleSubmit(e)}>
            <option checked hidden>{attributeInState ? attributeInState : Attributes.checkboxesLabelText[attribute]}</option>

            {options.map((choice, idx) => {
              return (
                <option key={idx} value={choice}>{choice}</option>
                );
              })
            }

          </select>
          <i className="fas fa-chevron-down" id="icon-for-select-box"></i>

      </div>
    );
  }


  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state, {id: this.props.currentUser.id});
    //deletes hobbies. Hobbies only gets handled on the hobbies component. On this component
    //it only gets displayed, otherwise if it gets handled here, it will not reflect accuracy.
    delete user.hobbies;
    delete user.description;
    delete user.image;
    delete user.zip_code;
    this.props.updateUserInfo(user);
  }

  handleClick(componentName) {
    this.props.updateUiWindow(componentName);
  }

  handleCheckBoxClick(e) {
    this.updateCheckBoxValue("ethnicity");
  }

  killScrollForModal() {
    document.getElementsByTagName("body")[0].style="overflow: hidden";
  }

  updateHeight(e) {
    e.preventDefault();
    this.setState({"height" : e.currentTarget.value})

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

          {this.props.currentWindow != null ? this.killScrollForModal(): null}

          <TopHeaderContainer />
{/* HobbiesWindow*/}

          {this.props.currentWindow === "HobbiesWindow" ? <HobbiesWindowContainer currentUserHobbies={this.props.currentProfile.hobbies}
          currentUserId={this.props.currentProfile.id} /> : null}

{/* About you window modal*/}
          {this.props.currentWindow === "AboutYouWindow" ? <AboutYouWindowContainer /> : null}

{/* pic upload modal */}

          {this.props.currentWindow === "PicUpload" ? <PicUpload /> : null}

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

              <section className="profile-pic-section">
                <figure>
                  <img onClick={() => this.props.updateUiWindow("PicUpload")} src={this.props.currentProfile.image} className="profile-full-pic"/>
                </figure>

                <div className="profile-pic-footer">
                  <span>
                    <i className="fas fa-edit"></i>
                    Click image to update
                  </span>
                </div>
              </section>



{/* display name attribute*/}
                <section className="profile-edit-info-container" onClick={(e)=> this.handleSubmit(e)}>

                  <div className="user-info-input-attribute">
                    <div className="user-info-input-label">{this.state.display_name
                      ? "Display Name" : ""}</div>

                    <input onChange={this.updateValue("display_name")}
                      maxLength="25"
                      onBlur={this.handleSubmit}
                      className="user-info-input-box" type="text"
                      placeholder={this.state.display_name ? "" : "Display Name"}
                      defaultValue={this.state.display_name ? this.state.display_name : ""}
                      />
                  </div>

{/* about you attribute*/}

                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.props.currentProfile.description
                      ? "About You" : ""}</div>

                    <div onClick={() => this.handleClick("AboutYouWindow")}
                      className="user-info-input-box">{this.props.currentProfile.description ? this.props.currentProfile.description : "About You"}
                    </div>
                  </div>

{/* height attribute*/}


                  <div className="user-info-input-attribute">

                    <div className="profile-height">{this.state.height === null ? "Height:" : `Height: ${this.inchesToFeet(this.state.height)}`}</div>

                      <input
                        onMouseOut={(e) => this.handleSubmit(e)}
                        onChange={(e) => this.updateHeight(e)} className="height-edit-range"
                        type="range" min="48" max="96" value={this.state.height ? this.state.height : ""} />
                  </div>



{/* have kids attribute*/}

                  {this.constructDropDownMenu("have_kids")}

{/* want kids attribute*/}

                  {this.constructDropDownMenu("want_kids")}

{/* marital status attribute*/}

                  {this.constructDropDownMenu("marital_status")}

{/* Willingness to relocate attribute*/}

                  {this.constructDropDownMenu("relocate")}

{/* religion attribute*/}

                  {this.constructDropDownMenu("religion")}


{/* church attendance attribute*/}

                  {this.constructDropDownMenu("attendance")}

{/* occupation attribute*/}

                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.state.occupation
                      ? "Occupation" : ""}</div>


                      <input onChange={this.updateValue("occupation")}
                        maxLength="25"
                        onBlur={this.handleSubmit}
                        className="user-info-input-box" type="text"
                        placeholder={this.state.occupation ? "" : "Occupation"}
                        defaultValue={this.state.occupation ? this.state.occupation : ""}
                        />
                  </div>

{/* education attribute*/}

                  {this.constructDropDownMenu("education")}

{/* ethnicity attribute*/}

                  {this.constructCheckboxes("ethnicity")}

{/* Language attribute*/}

                  {this.constructCheckboxes("language")}


{/* pets attribute*/}

                  {this.constructCheckboxes("pets")}


{/* drinking habits */}

                  {this.constructDropDownMenu("drink")}

{/* smoking habits */}

                  {this.constructDropDownMenu("smoke")}

{/* hobbies */}

                  <div className="user-info-input-attribute">

                    <div className="user-info-input-label">{this.props.currentProfile.hobbies
                      ? "Search Interests" : "" }</div>

                      <div className="dropdown-line-and-icon">

                        <div onClick={() => this.handleClick("HobbiesWindow")} className="user-info-input-box" id="remove-border">
                          {this.props.currentProfile.hobbies ? this.props.currentProfile.hobbies.split(",").join(", ") : "Search Interests"}
                        </div>
                        <i className="fas fa-plus"></i>
                      </div>
                  </div>
{/* first_date attribute*/}

                  {this.constructCheckboxes("first_date")}


{/* end of attributes*/}
                  <Link className="edit-preferences-button" to="/discoverypreferences">Edit Discovery Preferences</Link>
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
