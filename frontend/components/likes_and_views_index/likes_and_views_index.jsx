import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../loading_page/loading_page';
import TopHeaderContainer from '../top_header/top_header_container';

class LikesViewsIndex extends React.Component {
  constructor(props) {
    super(props);

    this.returnMutualLikesProfiles = this.returnMutualLikesProfiles.bind(this);

  }

  componentDidMount() {
    this.props.getCurrentUserActivity(this.props.currentUser.id);
    window.scrollTo(0,0);
  }

  createlikeIcon (liked_id) {
    return (
      <div className="heart-circle-in-activity" id="heart-circle-unliked" onClick={() => this.props.createLike(this.props.currentUser.id, liked_id)}>
        <i className="far fa-heart fa-2x" id="heart-in-view-section"></i>
      </div>
    )
  }

  uncreateLikeIcon(liked_id) {
    return (
      <div className="heart-circle-in-activity" onClick={() => this.props.deleteLike(this.props.currentUser.id, liked_id)}>
        <i className="fas fa-heart fa-2x"></i>
      </div>
    )
  }

  createHeaderText() {
    if (this.props.match.path === "/my-likes") {
      return (
        `My Likes (${this.props.likedProfiles.length})`
      );
    } else if (this.props.match.path === "/my-views") {
      return (
        `I Viewed (${this.props.viewedProfiles.length})`
      );
    } else if (this.props.match.path === "/viewed-me") {
      return (
      `Viewed Me (${this.props.usersThatViewedMe.length})`
      );
    } else if (this.props.match.path === "/my-mutual-likes") {
      return (
        `Mutual Likes (${this.countMutualLikes()})`
      );
    }
  }

  returnMutualLikesProfiles() {
    let profiles = [];

    this.props.likedProfiles.forEach((profile) => {
      if (profile.mutual === true) {
        profiles.push(profile)
      }
    });
    return profiles;
  }

  countMutualLikes() {
    let mutualLikes = 0;

    this.props.likedProfiles.forEach((profile) => {
      if (profile.mutual === true) {
        mutualLikes = mutualLikes + 1;
      } else {
        null
      }
    });

    return mutualLikes;
  }

  returnProfiles() {
    if (this.props.match.path === "/my-likes") {
      return this.props.likedProfiles;
    } else if (this.props.match.path === "/my-views") {
      return this.props.viewedProfiles;
    } else if (this.props.match.path === "/viewed-me") {
      return this.props.usersThatViewedMe;
    } else if (this.props.match.path === "/my-mutual-likes") {
      return this.returnMutualLikesProfiles();
    }
  }

  render() {
    if (this.props.likedProfiles === null || this.props.viewedProfiles === null || this.props.usersThatViewedMe === null) {
      return (
        <Loading />
      );
    } else {
      return (
        <div>
          <TopHeaderContainer />
            <section className="user-profile-body">

              <div className="user-profile-middle">

                <span className="user-profile-top-span">

                    <Link className="back-browse-link" to="/activity">
                      <i className="fas fa-chevron-left"><span>Back</span></i>
                    </Link>

                    <p className="my-profile-label">{this.createHeaderText()}</p>

                    <div className="empty-div"></div>
                </span>

                <section className="like-view-index-middle-section">
                  {/* The styling from here down is unique to this compoent */}

                  {
                    this.returnProfiles().map((profile, idx) => {
                      return (
                        <div key={idx} className="likes-views-index-profile">
                          <Link to={`/profile/${profile.id}`}>
                            <figure className="activity-user-image"style={{backgroundImage: `url(${profile.image})`}}>
                            </figure>
                          </Link>

                          <div className="activity-user-info">
                            <Link to={`/profile/${profile.id}`}>
                              <h4>{profile.display_name ? profile.display_name : profile.username}</h4>
                            </Link>
                            <p>{profile.age}</p>
                            <span>{profile.city}, {profile.state}</span>
                          </div>

                          <div className="heart-circle-in-activity" onClick={() => this.props.deleteLike(this.props.currentUser.id, profile.id)}>
                            <i className="fas fa-heart fa-2x"></i>
                          </div>
                        </div>
                      );
                    })
                  }


                  {/*  he styling from here down is unique to this compoent */}
                </section>


              </div>
            </section>
        </div>
      );
    }
  }
}

export default LikesViewsIndex;
