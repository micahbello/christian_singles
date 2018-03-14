import React from 'react';
import { Link } from 'react-router-dom';

class UserIndexProfile extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="user-index-profile-box">

        <div className="user-index-profile-box-pic">
          profile pic here
        </div>

        <div>
          <p>Name</p>

        </div>

      </div>
    );
  }
}

export default UserIndexProfile;
