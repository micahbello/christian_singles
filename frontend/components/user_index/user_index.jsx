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

  returnProfilesToMap() {
    if (this.props.match.path === "/browse-new") {
      return Object.values(this.props.currentIndexProfiles).reverse();
    } else if (this.props.match.path === "/browse-distance") {
      return this.quickSortDistanceOrder(this.props.currentIndexProfiles);
    } else if (this.props.match.path === "/browse-score") {
      return this.quickSortPercentageOrder(this.props.currentIndexProfiles);
    } else if (this.props.match.path === "/browse-online") {
      return this.sortProfileByOnline()
    }
  }

  quickSortDistanceOrder(profiles) {
    let profilesToOrder = Object.values(profiles);

    if (profilesToOrder.length < 2) {
      return profilesToOrder;
    }

    let pivot = profilesToOrder[0];
    let left = [];
    let right = [];

    profilesToOrder.slice(1).forEach((profile) => {
      if (profile.distance_from_user <= pivot.distance_from_user) {
        left.push(profile);
      } else {
        right.push(profile)
      }
    });

    return (this.quickSortDistanceOrder(left).concat([pivot]).concat(this.quickSortDistanceOrder(right)));

  }

  quickSortPercentageOrder(profiles) {
    let profilesToOrder = Object.values(profiles);

    if (profilesToOrder.length < 2) {
      return profilesToOrder;
    }

    let pivot = profilesToOrder[0];
    let left = [];
    let right = [];

    profilesToOrder.slice(1).forEach((profile) => {
      if (profile.percentage >= pivot.percentage) {
        left.push(profile);
      } else {
        right.push(profile)
      }
    });

    return (this.quickSortPercentageOrder(left).concat([pivot]).concat(this.quickSortPercentageOrder(right)));

  }


  sortProfileByOnline() {
    let profilesToOrder = Object.values(this.props.currentIndexProfiles).reverse();
    let orderedProfiles = [];

    profilesToOrder.forEach(profile => {
      if (profile.online === true ) {
        orderedProfiles.unshift(profile);
      } else {
        orderedProfiles.push(profile);
      }
    });

    return orderedProfiles;
  }

 createLikeIcon(profile) {
   if (this.props.currentUser.likes.includes(profile.id)) {
     return(
     <div className="heart-circle-in-index" onClick={(e) => this.deleteLikeIcon(e, profile.id)}><i className="fas fa-heart fa-2x"></i></div>
     )
   } else {
     return (
    <div className="heart-circle-in-index" id="heart-circle-unliked-index" onClick={(e) => this.likeIconCreateAnimation(e, profile.id)}><i className="far fa-heart fa-2x"></i></div>
    )
   }
 }

 deleteLikeIcon(e, profileId) {
   $(e.target).attr("id", " ");
   this.props.deleteLike(this.props.currentUser.id, profileId);
 }


 likeIconCreateAnimation(e, profileId) {
   $(e.target).attr("id", "heart-clicked-animation");
   this.props.createLike(this.props.currentUser.id, profileId);
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
              <Link to="/browse-new" className="browse-ordering-boxes" id={this.props.match.path === "/browse-new" ? "underlined-box" : ""}>
                <span id={this.props.match.path === "/browse-new" ? "bold-browse-link" : ""}>New</span>
              </Link>

              <Link to="/browse-online" className="browse-ordering-boxes" id={this.props.match.path === "/browse-online" ? "underlined-box" : ""}>
                <span id={this.props.match.path === "/browse-online" ? "bold-browse-link" : ""}>Online</span>
              </Link>


              <Link to="/browse-distance" className="browse-ordering-boxes" id={this.props.match.path === "/browse-distance" ? "underlined-box" : ""}>
                <span id={this.props.match.path === "/browse-distance" ? "bold-browse-link" : ""}>Distance</span>
              </Link>

              <Link to="/browse-score" className="browse-ordering-boxes" id={this.props.match.path === "/browse-score" ? "underlined-box" : ""}>
                <span id={this.props.match.path === "/browse-score" ? "bold-browse-link" : ""}>Match %</span>
              </Link>

            </section>

            <div className="user-index-profiles-container">
              {Object.values(this.props.currentIndexProfiles).length === 0 ?
                <p className="no-matches-message">It seems we didn't have any luck finding members that
                  match your preferences. But all is not lost.
                  To find more matches, adjust your preferences and try again.</p> : null}

              {this.returnProfilesToMap().map((profile, idx) =>
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
