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
    this.props.getMatches(this.props.currentUser.id);
    window.scrollTo(0,0);
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

            <section className="browse-display-header">
              <div className="browse-ordering-boxes" id={this.props.match.path === "/browse-new" ? "underlined-box" : ""}>
                <span id={this.props.match.path === "/browse-new" ? "bold-browse-link" : ""}>New</span>
              </div>

              <div className="browse-ordering-boxes">
                <span>Online</span>
              </div>

              <div className="browse-ordering-boxes">
                <span>Distance</span>
              </div>

              <div className="browse-ordering-boxes">
                <span>Match %</span>
              </div>

            </section>

            <div className="user-index-profiles-container">
              {Object.values(this.props.currentIndexProfiles).length === 0 ?
                <p className="no-matches-message">It seems we didn't have any luck finding members that
                  match your preferences. But all is not lost.
                  To find more matches, adjust your preferences and try again.</p> : null}

              {Object.values(this.props.currentIndexProfiles).reverse().
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
