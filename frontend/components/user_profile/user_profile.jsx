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

          <h2 className="edit-profile-text">My Profile</h2>

          <div className="info-forms">


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

              <p className="user-about-me">Just a random guy here, nah mean what I am saying.........</p>

            </div>

            <div className="user-attributes-info">

              <div className="user-personal-info">
                <p>image</p>
                <p>{this.props.currentProfile.kids}, {this.props.currentProfile.want_kids},
                  {this.props.currentProfile.relocate}
                </p>
              </div>

              <div className="user-religious-info">
                <p>image</p>
                <p>{this.props.currentProfile.religion}, {this.props.currentProfile.attendance}</p>
              </div>

              <div className="user-background-info">
                <p>image</p>
                <p>I grew up in {this.props.currentProfile.place_as_child}, {this.props.currentProfile.ethnicity},
                  Speak {this.props.currentProfile.language}
                </p>
              </div>

              <div className="animals-smoke-drink-info">
                <p>image</p>
                <p>{this.props.currentProfile.pets}, {this.props.currentProfile.drink}, {this.props.currentProfile.smoke}</p>
              </div>

              <div className="user-hobbies-info">
                <p>image</p>
                <p>i like basketball</p>
              </div>

              <div className="first-date-info">
                <p>image</p>
                <p>On a first date I prefer: {this.props.currentProfile.first_date}</p>
              </div>


              <div className="looking-for-info">
                <p>image</p>
                <p>I am looking for: people</p>
              </div>

              <div className="last-online-info">
                <p>image</p>
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
