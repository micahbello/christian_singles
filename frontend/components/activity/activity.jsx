import React from 'react';
import { Link } from 'react-router-dom';
import TopHeaderContainer from '../top_header/top_header_container';



class Activity  extends React.Component {
  constructor(props) {
    super(props);
  }

  countLikes() {
    return this.props.currentUser.likes.length;
  }

  countMutualLikes() {
    let mutualLikes = 0;

    this.props.currentUser.like_profiles.forEach((profile) => {
      if (profile.mutual === true) {
        mutualLikes = mutualLikes + 1;
      } else {
        null
      }
    });

    return mutualLikes;
  }

  mapMutualLikes() {

    this.props.currentUser.like_profiles.map((profile, idx) => {
      if (profile.mutual === true) {
        debugger
        return (
          <div key={idx} className="activity-index-profile">
            <figure className="activity-user-image"style={{backgroundImage: `url(${profile.image})`}}>
            </figure>

            <div className="activity-user-info">
              <h4>{profile.display_name ? profile.display_name : profile.username}</h4>
              <p>{profile.age}</p>
              <span>{profile.city}, {profile.state}</span>
            </div>

            <div>
              <div className="heart-circle-in-activity">
                <i className="fas fa-heart fa-2x"></i>
              </div>
            </div>
          </div>
        );
      } else {
        null
      }
    });
  }

  render() {
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
                      this.props.currentUser.like_profiles.map((profile, idx) => {
                        return (
                          <div key={idx} className="activity-index-profile">
                            <figure className="activity-user-image"style={{backgroundImage: `url(${profile.image})`}}>
                            </figure>

                            <div className="activity-user-info">
                              <h4>{profile.display_name ? profile.display_name : profile.username}</h4>
                              <p>{profile.age}</p>
                              <span>{profile.city}, {profile.state}</span>
                            </div>

                            <div>
                              <div className="heart-circle-in-activity">
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

                </section>

    {/*  he styling from here down is unique to this compoent */}
              </section>

            </div>
          </section>
      </div>
    );
  }
}

export default Activity;
