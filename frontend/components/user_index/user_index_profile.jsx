import React from 'react';
import { Link } from 'react-router-dom';

class UserIndexProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount(){
  //
  // }


  render() {


    return (

      <div className="user-index-profile-box">

        <div className="user-index-profile-box-pic">
          <p className="user-index-profile-name-text">
            {this.props.profileDisplayName}
          </p>
        </div>

        <div>


        </div>

      </div>
    );
  }
}

export default UserIndexProfile;
