import React from 'react';
import { Link } from 'react-router-dom';

class UserIndexProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){

  }


  render() {


    return (

      <div className="user-index-profile-box">

        <div style={{backgroundImage: `url(${this.props.profileImgUrl})`}} className="user-index-profile-box-pic">


        </div>

        <p className="user-index-profile-name-text">
          {this.props.profileDisplayName ? this.props.profileDisplayName : this.props.profileUsername}, {this.props.profileAge}
        </p>

        <p>
          <b><font color="black">{this.props.matchPercent}% Match</font></b>  {this.props.profileOnlineStatus === true ? <b><font color="#00FF00">Online Now</font></b> : ""}
        </p>



      </div>
    );
  }
}

export default UserIndexProfile;
