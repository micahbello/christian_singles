import React from 'react';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';
import TopHeaderContainer from '../top_header/top_header_container';


class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.currentProfile;
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
            : null}



        {this.props.currentUser.id === this.props.currentProfile.id
            ?
            <div id="user-profile-edit-button">
            <Link id="user-profile-edit-link" to='/editprofile' >Edit Profile</Link>
            </div>
            : null}

          </div>

          <div className="info-forms">

            <div className="user-info-pic-container"> PICS HERE </div>

          <div className="user-info-container">

            <div className="user-bio">
              <div className="user-name-age-container">
                <p className="user-display_name">{this.props.currentProfile.display_name}</p>
                <p className="user-age">, 48</p>
              </div>

              <div className="user-location">
                <p className="user-city">New York</p>
                <p className="user-state">, NY</p>
              </div>

              <p className="user-about-me">Just a random guy here, nah mean what I am saying.
                wondering how this will loookddddddd........</p>

            </div>

            <div className="user-attributes-info">

              <div className="user-personal-info">
                <p className="user-info-icon">i</p>
                <p>5'9'', {this.props.currentProfile.have_kids}, {this.props.currentProfile.want_kids}, {this.props.currentProfile.relocate}
                </p>
              </div>

              <div className="user-personal-info">
                <p className="user-info-icon">i</p>
                <p>{this.props.currentProfile.religion}, {this.props.currentProfile.attendance}</p>
              </div>

              <div className="user-personal-info">
                <p className="user-info-icon">i</p>
                <p id="make-reg-font">Mechanic</p><p>, {this.props.currentProfile.education}</p>
              </div>



              <div className="user-personal-info">
                <p className="user-info-icon">i</p>
                <p>Have Bird(s), {this.props.currentProfile.drink}, {this.props.currentProfile.smoke}</p>
              </div>

              <div className="user-personal-info">
                <p className="user-info-icon">i</p>
                <p id="make-reg-font">I like </p><p> Basketball</p>
              </div>

              <div className="user-personal-info">
                <p className="user-info-icon">i</p>
                <p id="make-reg-font">On a first date I prefer: </p> <p>{this.props.currentProfile.first_date}</p>
              </div>


              <div className="user-personal-info">
                <p className="user-info-icon">i</p>
                <p>I am looking for: people</p>
              </div>

              <div className="user-personal-info">
                <p className="user-info-icon">i</p>
                <p>Last Online: Today</p>
              </div>



            </div>

          </div>

        </div>

      </div>

      );
    }
  }

}


export default UserProfile;

// <div className="user-personal-info">
//   <p className="user-info-icon">i</p>
//
//   <span>I grew up in <p>Denmark</p><p>, {this.props.getCurrentProfile.language}</p> , Speak <p>this.props.currentProfile.language</p></span>
// </div>
