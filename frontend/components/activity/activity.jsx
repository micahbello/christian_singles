import React from 'react';
import { Link } from 'react-router-dom';
import TopHeaderContainer from '../top_header/top_header_container';
import Loading from '../loading_page/loading_page';



class Activity  extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrentUserActivity(this.props.currentUser.id);
    window.scrollTo(0,0);
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
    return (
    this.props.likedProfiles.map((profile, idx) => {
      if (profile.mutual === true) {
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

            <div>
              <div className="heart-circle-in-activity" onClick={() => this.props.deleteLike(this.props.currentUser.id, profile.id)}>
                <i className="fas fa-heart fa-2x"></i>
              </div>
            </div>
          </div>
        );
        } else {
          null
        }
    })
  );
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

                    <Link className="back-browse-link" to="/browse">
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
                        <h3 className="activity-heading">My Likes ({this.countLikes()})</h3>

                      {
                        this.props.likedProfiles.map((profile, idx) => {
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

                              <div>
                                <div className="heart-circle-in-activity" onClick={() => this.props.deleteLike(this.props.currentUser.id, profile.id)}>
                                  <i className="fas fa-heart fa-2x"></i>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      }

                      </div>
                    </section>

                    <section className="specific-activity-section">
                      <div className="my-mutual-likes-div">
                        <h3>Mutual Likes ({this.countMutualLikes()})</h3>
                          {this.mapMutualLikes()}
                      </div>
                    </section>

                  </section>

                  <section className="activity-middle-split-container">
                    <section className="specific-activity-section">
                      <div className="my-views-div">
                        <h3 className="activity-heading">I Viewed ({this.countMyViews()})</h3>
                          {
                            this.props.viewedProfiles.map((profile, idx) => {
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

                                  <div>
                                    {this.props.currentUser.likes.includes(profile.id) ? this.uncreateLikeIcon(profile.id) : this.createlikeIcon(profile.id)}
                                  </div>
                                </div>
                              );
                            })
                          }
                      </div>
                    </section>

                    <section className="specific-activity-section">
                      <div className="views-of-me-div">
                        <h3 className="activity-heading">Viewed Me ({this.countOthersViewsOfMe()})</h3>
                          {
                            this.props.usersThatViewedMe.map((profile, idx) => {
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
                                    {this.props.currentUser.likes.includes(profile.id) ? this.uncreateLikeIcon(profile.id) : this.createlikeIcon(profile.id)}
                                  <div>

                                  </div>
                                </div>
                              );
                            })
                          }
                      </div>
                    </section>

                  </section>

      {/*  he styling from here down is unique to this compoent */}
                </section>

              </div>
            </section>
        </div>
      );
    }
  }
}

export default Activity;
