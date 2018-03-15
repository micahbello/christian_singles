import React from 'react';
import { Link } from 'react-router-dom';
import UserIndexProfileContainer from './user_index_profile_container';
import TopHeaderContainer from '../top_header/top_header_container';

class UserIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllUsers()
  }


  render() {
    if (!this.props.currentIndexProfiles) {
      return <p>...Loading...</p>
    } else {

      return (
        <div className="user-index-page">

        <TopHeaderContainer />  

        <div className="user-index-profiles-container">

          {Object.values(this.props.currentIndexProfiles).
            map((profile) => <Link to={`/profile/${profile.id}`}>
            <UserIndexProfileContainer key={profile.id} id={profile.id}/></Link>)}


        </div>

        </div>
      );
    }
  }
}

export default UserIndex;

// <Link to="/editprofile"><UserIndexProfileContainer /></Link>
