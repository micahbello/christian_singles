import React from 'react';
import { Link } from 'react-router-dom';
import UserIndexProfileContainer from './user_index_profiles/user_index_profile_container';
import TopHeaderContainer from '../top_header/top_header_container';
import Loading from '../loading_page/loading_page';

class UserIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMatches(this.props.currentUser.id)
  }

  componentWillUnmount() {
    this.props.clearCurrentIndexProfiles();
  }

 createLikeIcon(profile) {
   if (this.props.currentUser.likes.includes(profile.id)) {
     return(
     <div className="heart-circle-in-index" onClick={() => this.props.deleteLike(this.props.currentUser.id, profile.id)}><i className="fas fa-heart fa-2x"></i></div>
     )
   } else {
     return (
    <div className="heart-circle-in-index" id="heart-circle-unliked" onClick={() => this.props.createLike(this.props.currentUser.id, profile.id)}><i className="far fa-heart fa-2x"></i></div>
    )
   }
 }


  render() {
    if (!this.props.currentIndexProfiles) {
      return <Loading />
    } else {

      return (

        <div>
          <TopHeaderContainer />

          <div className="user-index-page">

            <div className="user-index-profiles-container">

              {Object.values(this.props.currentIndexProfiles).
                map((profile, idx) =>
                <section key={idx} className="heart-and-pic-section">

                  {this.createLikeIcon(profile)}

                  <Link id="link-to-profiles" to={`/profile/${profile.id}`}>
                    <UserIndexProfileContainer id={profile.id} imgUrl={profile.image}
                      displayName={profile.display_name} age={profile.age} userName={profile.username}
                      onlineStatus={profile.online} matchPercent={profile.percentage} height={profile.height}
                      occupation={profile.occupation} religion={profile.religion} city={profile.city}
                      state={profile.state}/>
                  </Link>
                </section>) }
            </div>

          </div>
        </div>
      );
    }
  }
}

export default UserIndex;

// <Link to="/editprofile"><UserIndexProfileContainer /></Link>
