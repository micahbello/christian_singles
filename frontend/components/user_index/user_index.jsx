import React from 'react';
import { Link } from 'react-router-dom';
import UserIndexProfileContainer from './user_index_profile_container';
import TopHeaderContainer from '../top_header/top_header_container';
class UserIndex extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="user-index-page">

        <TopHeaderContainer />

      <div className="user-index-profiles-container">

        <Link to="/editprofile"><UserIndexProfileContainer /></Link>

      </div>

      </div>
    );
  }
}

export default UserIndex;
