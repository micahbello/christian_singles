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

        <div className="user-index-profile-box-pic">
          {this.props.profileId}
        </div>

        <div>
          <p></p>

        </div>

      </div>
    );
  }
}

export default UserIndexProfile;
