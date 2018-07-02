import React from 'react';
import { Link } from 'react-router-dom';

class UserIndexProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){

  }

  //<b><font color="#00FF00">Online Now</font></b>


  render() {
    return (

      <div className="user-index-profile-box">

        <div style={{backgroundImage: `url(${this.props.profileImgUrl})`}} className="user-index-profile-box-pic">

        </div>

          <span className="user-index-profile-name-text">
            {this.props.profileDisplayName ? this.props.profileDisplayName : this.props.profileUsername}, {this.props.profileAge}
            {this.props.profileOnlineStatus === true ? <div className="online-green-circle"></div> : ""}
          </span>

          <span className="user-index-city-state-text">
            {this.props.profileCity}, {this.props.profileState}
          </span>

          <span className="user-index-match">
            {this.props.matchPercent}% Match
          </span>

          <span className="user-index-religion-occupation">
            {this.props.profileReligion ? this.props.profileReligion : ""}
            {this.props.profileOccupation && this.props.profileReligion ? `, ${this.props.profileOccupation}` : ""}
            {this.props.profileOccupation && !this.props.profileReligion ? this.props.profileOccupation : ""}
          </span>

      </div>
    );
  }
}

export default UserIndexProfile;
