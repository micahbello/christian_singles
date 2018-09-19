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
      <div className="heart-circle-in-activity" id="heart-circle-unliked" onClick={(e) => this.likeIconCreateAnimation(e, liked_id)}>
        <i className="far fa-heart fa-2x"></i>
      </div>
    )
  }

  uncreateLikeIcon(liked_id) {
    return (
      <div className="heart-circle-in-activity" onClick={(e) => this.deleteLikeIcon(e, liked_id)}>
        <i className="fas fa-heart fa-2x"></i>
      </div>
    )
  }

  deleteLikeIcon(e, liked_id) {
    $(e.target).attr("id", " ");
    this.props.deleteLike(this.props.currentUser.id, liked_id);
  }


  likeIconCreateAnimation(e, liked_id) {
    $(e.target).attr("id", "heart-clicked-animation");
    this.props.createLike(this.props.currentUser.id, liked_id);
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

  measureElapsedTime(timeStamp) {
    let endTime = new Date();
    let startTime = new Date(timeStamp);

    let differenceInSeconds = ((endTime - startTime) / 1000);

    if (differenceInSeconds < 60) {
      return `${Math.round(differenceInSeconds)} sec`;
    } else if (differenceInSeconds > 60 && differenceInSeconds < 3600) {
      return `${Math.round(differenceInSeconds / 60)} min`;
    } else if (differenceInSeconds > 3600 && differenceInSeconds < 86400) {
      return `${Math.round(differenceInSeconds / 60 / 60)} hr`;
    } else if (differenceInSeconds > 86400) {
      return `${Math.round(differenceInSeconds / 86400)} d`;
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

                          <div className="activity-heart-and-time">
                            {this.props.currentUser.likes.includes(profile.id) ? this.uncreateLikeIcon(profile.id) : this.createlikeIcon(profile.id)}
                            <span>{this.measureElapsedTime(profile.time_last_viewed)}</span>
                            <span>{this.measureElapsedTime(profile.created_at)}</span>
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
