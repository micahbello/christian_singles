import React from 'react';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';
import TopHeaderContainer from '../top_header/top_header_container';



class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = null;
  }


  componentDidMount() {
    if (this.state) {
      null
    } else {
      this.props.getCurrentProfile(this.props.match.params.id).then((action) => {
        this.setState(action.currentProfile)
      })
    }
  }

  componentWillUnmount() {
    debugger
    this.props.clearCurrentProfile();
  }


  render() {

    if (!this.state) {
      return <p>...Loading...</p>
      } else {
      return (

        <div className="edit-profile-page">

          <TopHeaderContainer />

          <div className="user-profile-span">

        {this.props.currentUser.id === this.props.currentProfile.id
            ?
            <h2 className="edit-profile-text">My Profile</h2>
            : <h2></h2>}



        {this.props.currentUser.id === this.props.currentProfile.id
            ?
            <div id="user-profile-edit-button">
            <Link id="user-profile-edit-link" to='/editprofile' >Edit Profile</Link>
            </div>
            : <h2></h2>}

          </div>

          <div className="info-forms">

            <div className="user-info-pic-container"> PICS HERE </div>

          <div className="user-info-container">

            <div className="user-bio">
              <div className="user-name-age-container">
                <p className="user-display_name">
                  {this.state.display_name ?
                    this.state.display_name : this.state.username }</p>
                  <p className="user-age">{this.state.age ? `{, ${this.state.age}}` : ""}</p>
              </div>

              <div className="user-location">
                <p className="user-city">{this.state.city}</p>
                <p className="user-state">{this.state.state ? `, ${this.state.state}` : ""}</p>
              </div>

              <p className={this.state.description ? "user-about-me" : "currently-hidden"}>{this.state.description}</p>

            </div>

            <div className="user-attributes-info">

              <li className=
                {(this.state.height ||
                this.state.have_kids ||
                this.state.want_kids ||
                this.state.relocate) ?
                "user-personal-info" :
                "currently-hidden"}>


                <p className="user-info-icon">
                {(this.state.height ||
                this.state.have_kids ||
                this.state.want_kids ||
                this.state.relocate ) ?
                "*" : ""}
                </p>

                <p>{this.state.height}

                  {(this.state.height && this.state.have_kids) ? `, ${this.state.have_kids}` : ""}
                  {(!this.state.height && this.state.have_kids) ? this.state.have_kids : ""}

                  {((this.state.have_kids || this.state.height) && this.state.want_kids ) ? `, ${this.state.want_kids}` : ""}
                  {((!this.state.have_kids && !this.state.height) && this.state.want_kids ) ? this.state.want_kids : ""}


                  {((this.state.have_kids || this.state.want_kids || this.state.height) && this.state.relocate) ? `, ${this.state.relocate}` : ""}
                  {((!this.state.have_kids && !this.state.want_kids && !this.state.height) && this.state.relocate) ? this.state.relocate : ""}
                </p>
              </li>



              <li className=
                {(this.state.religion ||
                this.state.attendance) ?
                "user-personal-info" :
                "currently-hidden"}>

                <p className="user-info-icon">
                  {(this.state.religion ||
                  this.state.attendance) ?
                  "*" : ""}
                </p>

                <p>
                  {this.state.religion}

                  {(this.state.religion && this.state.attendance) ? `, ${this.state.attendance}` : ""}
                  {(!this.state.religion && this.state.attendance) ? this.state.attendance : ""}
                </p>
              </li>


              <li className=
                {(this.state.occupation ||
                this.state.education) ?
                "user-personal-info" :
                "currently-hidden"}>

                <p className="user-info-icon">
                  {(this.state.occupation ||
                  this.state.education) ?
                  "*" : ""}
                </p>
                <p id="make-reg-font">
                  {this.state.occupation}

                  {(this.state.occupation && this.state.education) ? `, ${this.state.education}` : "" }
                  {(!this.state.occupation && this.state.education) ? this.state.education : "" }
                </p>
              </li>

              <li className={this.state.language ?
                  "user-personal-info" :
                  "currently-hidden"}>

                <p className="user-info-icon">
                  {(this.state.language ||
                    this.state.ethnicity) ?
                  "*" : ""}
                </p>
                <p>

                {(this.state.ethnicity && this.state.ethnicity.includes(",")) ? this.state.ethnicity.split(",").join(", ") : this.state.ethnicity}

                <span id="make-reg-font">{(this.state.language && !this.state.ethnicity) ? "Speaks: " : ""}</span>
                <span id="make-reg-font">{(this.state.language && this.state.ethnicity) ? ", Speaks: " : ""}</span>
                {(this.state.language && this.state.language.includes(",")) ? this.state.language.split(",").join(", ") : this.state.language}

                </p>
              </li>


              <li className=
                {(this.state.pets ||
                this.state.drink ||
                this.state.smoke) ?
                "user-personal-info" :
                "currently-hidden"}>

                <p className="user-info-icon">
                  {(this.state.pets ||
                  this.state.drink ||
                  this.state.smoke) ?
                  "*" : ""}
                </p>
                <p>

                  {(this.state.pets && this.state.pets.includes(",")) ? this.state.pets.split(",").join(", ") : this.state.pets}

                  {(this.state.pets && this.state.drink) ? `, ${this.state.drink}` : "" }
                  {(!this.state.pets && this.state.drink) ? this.state.drink : "" }

                  {((this.state.pets || this.state.drink) && this.state.smoke ) ? `, ${this.state.smoke}` : ""}
                  {((!this.state.pets && !this.state.drink) && this.state.smoke ) ? this.state.smoke : ""}
                </p>
              </li>

              <li className=
                {this.state.hobbies ?
                "user-personal-info" :
                "currently-hidden"}>

                <p className="user-info-icon">
                  {this.state.hobbies ? "*" : ""}
                </p>
                <p>
                  {this.state.hobbies}
                </p>
              </li>

              <li className={
                  this.state.first_date ?
                  "user-personal-info" :
                  "currently-hidden"}>

                <p className="user-info-icon">
                {this.state.first_date ? "*" : ""}
                </p>
                <p>
                  {this.state.first_date ? `On a first date I prefer: ${this.state.first_date}` : ""}
                </p>
              </li>


              <li className="user-personal-info">
                <p className="user-info-icon">*</p>
                <p className="">
                  I am looking for: {this.sex_seek}
                  {(!this.sex_seek && this.state.gender === "male") ? "Women" : ""}
                  {(!this.sex_seek && this.state.gender === "female") ? "Men" : ""}
                </p>
              </li>

              <li className="user-personal-info">
                <p className="user-info-icon">*</p>
                <p>Last Online: {this.state.last_online}</p>
              </li>



            </div>

          </div>

        </div>

      </div>

      );
    }
  }

}


export default UserProfile;

// {`${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-${(new Date()).getDate()}` === this.state.last_online ? "true" : "false"}


// <div className="user-personal-info">
//   <p className="user-info-icon">i</p>
//
//   <span>I grew up in <p>Denmark</p><p>, {this.props.getCurrentProfile.language}</p> , Speak <p>this.props.currentProfile.language</p></span>
// </div>
