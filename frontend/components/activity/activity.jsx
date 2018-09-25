import React from 'react';
import { Link } from 'react-router-dom';
import TopHeaderContainer from '../top_header/top_header_container';
import Loading from '../loading_page/loading_page';



class Activity  extends React.Component {
  constructor(props) {
    super(props);
    this.loading = false;
    this.likeIconCreateAnimation = this.likeIconCreateAnimation.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentUserActivity(this.props.currentUser.id);
    window.scrollTo(0,0);
  }

  componentWillUnmount() {

  }

  countLikes() {
    return this.props.currentUser.likes.length;
  }

  countMyViews() {
    return this.props.viewedProfiles.length;
  }

  countOthersViewsOfMe(){
    return this.props.usersThatViewedMe.length;
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

  mapMutualLikes() {

    let mutualLikesProfiles = [];

    this.props.likedProfiles.forEach((profile) => {
      if (mutualLikesProfiles.length < 4 && profile.mutual === true) {
        mutualLikesProfiles.push(profile)
      }
    })

    return (
    mutualLikesProfiles.map((profile, idx) => {
        return (
          <div key={idx} className="activity-index-profile">
            <Link to={`/profile/${profile.id}`}>
              <figure className="activity-user-image"style={{backgroundImage: `url(${profile.image})`}}>
              </figure>
            </ Link>

            <div className="activity-user-info">
              <Link to={`/profile/${profile.id}`}>
                <h4>{profile.display_name ? profile.display_name : profile.username}</h4>
              </Link>
              <p>{profile.age}</p>
              <span>{profile.city}, {profile.state}</span>
            </div>

            <div className="activity-heart-and-time">
              <div className="heart-circle-in-activity" onClick={(e) => this.deleteLikeIcon(e, profile.id)}>
                <i className="fas fa-heart fa-2x"></i>
              </div>
              <span >{this.measureElapsedTime(profile.created_at)}</span>
            </div>
        </div>
      );
    })
  );
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
    if (this.loading === false) {
      this.loading = true
      this.props.createLike(this.props.currentUser.id, liked_id);
      $(e.target).attr("id", "heart-clicked-animation");
      setTimeout(() => {this.loading = false}, 2000);
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

                    <Link className="back-browse-link" to="/browse-new">
                      <i className="fas fa-chevron-left"><span>Back</span></i>
                    </Link>

                    <p className="my-profile-label">Activity</p>

                    <div className="empty-div"></div>
                </span>

      {/* The styling from here down is unique to this compoent */}
                <section className="activity-middle-section">

                  <section className="activity-middle-split-container">

                    <section className="specific-activity-section">
                      <div className="my-likes-div">
                        <div className="specific-activity-section-header">
                          <h3 className="activity-heading">My Likes ({this.countLikes()})</h3>
                          <h3> <Link className= "activity-index-link" to="/my-likes">View All</Link></h3>
                        </div>

                      {
                        this.props.likedProfiles.slice(0, 4).map((profile, idx) => {
                          return (
                            <div key={idx} className="activity-index-profile">
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
                                <div className="heart-circle-in-activity" onClick={(e) => this.deleteLikeIcon(e, profile.id)}>
                                  <i className="fas fa-heart fa-2x"></i>
                                </div>
                                <span>{this.measureElapsedTime(profile.created_at)}</span>
                              </div>
                            </div>
                          );
                        })
                      }

                      </div>
                    </section>

                    <section className="specific-activity-section">
                      <div className="my-mutual-likes-div">
                        <div className="specific-activity-section-header">
                          <h3>Mutual Likes ({this.countMutualLikes()})</h3>
                          <h3><Link className= "activity-index-link" to="/my-mutual-likes">View All</Link></h3>
                        </div>
                          {this.mapMutualLikes()}
                      </div>
                    </section>

                  </section>

                  <section className="activity-middle-split-container">
                    <section className="specific-activity-section">
                      <div className="my-views-div">
                        <div className="specific-activity-section-header">
                          <h3 className="activity-heading">I Viewed ({this.countMyViews()})</h3>
                          <h3><Link className= "activity-index-link" to="/my-views">View All</Link></h3>
                        </div>
                          {
                            this.props.viewedProfiles.slice(0, 4).map((profile, idx) => {
                              return (
                                <div key={idx} className="activity-index-profile">
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
                                  </div>

                                </div>
                              );
                            })
                          }
                      </div>
                    </section>

                    <section className="specific-activity-section">
                      <div className="views-of-me-div">
                        <div className="specific-activity-section-header">
                          <h3 className="activity-heading">Viewed Me ({this.countOthersViewsOfMe()})</h3>
                          <h3><Link className= "activity-index-link" to="/viewed-me">View All</Link></h3>
                        </div>

                          {
                            this.props.usersThatViewedMe.slice(0, 4).map((profile, idx) => {
                              return (
                                <div key={idx} className="activity-index-profile">
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
                                  </div>
                                </div>
                              );
                            })
                          }
                      </div>
                    </section>

                  </section>

      {/*  he styling from here up is unique to this compoent */}
                </section>

              </div>
            </section>
        </div>
      );
    }
  }
}

export default Activity;
