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

  componentWillUnmount() {
    this.props.clearCurrentIndexProfiles();
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
            map((profile, idx) => <Link id="link-to-profiles" to={`/profile/${profile.id}`}>
            <UserIndexProfileContainer key={idx} id={profile.id} imgUrl={profile.image}
              displayName={profile.display_name} age={profile.age} userName={profile.username}
              onlineStatus={profile.online}/>
          </Link>) }


        </div>

        </div>
      );
    }
  }
}

export default UserIndex;

// <Link to="/editprofile"><UserIndexProfileContainer /></Link>
