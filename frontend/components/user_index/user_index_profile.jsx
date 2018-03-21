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

      </div>
    );
  }
}

export default UserIndexProfile;
