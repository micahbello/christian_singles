import React from 'react';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';
import TopHeaderContainer from '../top_header/top_header_container';
import LoadingPage from '../loading_page/loading_page';
import ProfilePicsModal from '../profile_pics_modal/profile_pics_modal_container';



class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = null;
  }

  componentDidMount() {
    if (this.state) {
      null
    } else {
      this.props.getCurrentProfile(this.props.match.params.id).then((action) => {
        this.setState(action.currentProfile)
      });
    }
  }

  componentWillUnmount() {
    this.props.clearCurrentProfile();
  }

  inchesToFeet(inches) {
    let feet = Math.floor(inches/12);
    let remainingInches = inches % 12;

    return `${feet}'${remainingInches}"`
  }

  openModal() {
    //this will not open the modal is the pic is just the user icon bc user has not uploaded pic yet

    if (this.props.currentProfile.image != "/assets/user_icon-c979c5188d8fcd98b2a1d0776ecf465fa8088100e0df965ebead09efa89df371.png") {
      this.props.updateUiWindow("ProfilePicsModal");
    } else {
      null
    }
  }

  render() {

    if (!this.state) {
      return <LoadingPage />
      } else {
      return (

        <div>
          <TopHeaderContainer />

          {this.props.currentWindow === "ProfilePicsModal" ? <ProfilePicsModal currentProfilePic={this.props.currentProfile.image }/> : null}
          {this.props.currentWindow != "ProfilePicsModal" ? document.getElementsByTagName("body")[0].style="overflow: scroll" : document.getElementsByTagName("body")[0].style="overflow: hidden"}

          <section className="user-profile-body">

            <div className="user-profile-middle">

              <span className="user-profile-top-span">

                  <Link className="back-browse-link" to="/browse">
                    <i className="fas fa-chevron-left"><span>Back</span></i>
                  </Link>

                  {this.props.currentUser.likes.includes(this.props.currentProfile.id) && this.props.currentProfile.gender === "male" ? <span className="you-like-text">You like him!</span> : ""}
                  {this.props.currentUser.likes.includes(this.props.currentProfile.id) && this.props.currentProfile.gender === "female" ? <span className="you-like-text">You like her!</span> : ""}
                  <p className="my-profile-label">{this.props.currentUser.id === this.props.currentProfile.id ? "My Profile" : ""}</p>


                  {this.props.currentUser.id === this.props.currentProfile.id ?
                    <Link className="edit-profile-button" to='/editprofile'>Edit Profile</Link> : " "
                  }
              </span>

              <section className="user-profile-pic-info-container">

                <section className="profile-pic-section">
                  <figure onClick={() => this.openModal()} className="full-pic-container">
                      <img src={this.props.currentProfile.image} className="profile-full-pic"/>
                  </figure>

                  <section className="profile-interaction-section">
                  </section>


                    {this.props.currentUser.likes.includes(this.props.currentProfile.id) ? <div className="heart-circle"><i className="fas fa-heart fa-2x"></i></div>
                    : <div className="heart-circle" id="heart-circle-unliked"><i className="far fa-heart fa-2x"></i></div>}

                </section>


                <section className="profile-info-container">

                    <section className="profile-info-box-top-part">

                      <span className="profile-name-age">

                        <span className="profile-name">
                          {this.props.currentProfile.display_name ?
                          this.props.currentProfile.display_name : this.props.currentProfile.username }
                        </span>

                        <span>
                          {this.props.currentProfile.age ? `, ${this.props.currentProfile.age}` : ""}
                            {this.props.currentProfile.match_percentage === "no_percent_allowed"
                            ? "" : ` | ${this.props.currentProfile.match_percentage}% Match`}
                        </span>

                      </span>

                      <br/>

                      <span>
                        {this.props.currentProfile.city}
                        {this.props.currentProfile.state ? `, ${this.props.currentProfile.state}` : ""}
                      </span>

                      <p className={this.props.currentProfile.description ? "user-about-me" : "currently-hidden"}>{this.props.currentProfile.description}</p>


                    </section>

                    <section className="profile-info-box-second-part">

                      <span className=
                        {(this.props.currentProfile.height ||
                        this.props.currentProfile.have_kids ||
                        this.props.currentProfile.want_kids ||
                        this.props.currentProfile.relocate) ?
                        "user-personal-info" :
                        "currently-hidden"}>


                        <span>
                          {(this.props.currentProfile.height ||
                          this.props.currentProfile.have_kids ||
                          this.props.currentProfile.want_kids ||
                          this.props.currentProfile.relocate ) ?
                          <i className="fas fa-user"></i>: ""}
                        </span>

                        <span>{this.props.currentProfile.height ? this.inchesToFeet(this.props.currentProfile.height) : null }

                          {(this.props.currentProfile.height && this.props.currentProfile.have_kids) ? `, ${this.props.currentProfile.have_kids}` : ""}
                          {(!this.props.currentProfile.height && this.props.currentProfile.have_kids) ? this.props.currentProfile.have_kids : ""}

                          {((this.props.currentProfile.have_kids || this.props.currentProfile.height) && this.props.currentProfile.want_kids ) ? `, ${this.props.currentProfile.want_kids}` : ""}
                          {((!this.props.currentProfile.have_kids && !this.props.currentProfile.height) && this.props.currentProfile.want_kids ) ? this.props.currentProfile.want_kids : ""}


                          {((this.props.currentProfile.have_kids || this.props.currentProfile.want_kids || this.props.currentProfile.height) && this.props.currentProfile.relocate) ? `, ${this.props.currentProfile.relocate}` : ""}
                          {((!this.props.currentProfile.have_kids && !this.props.currentProfile.want_kids && !this.props.currentProfile.height) && this.props.currentProfile.relocate) ? this.props.currentProfile.relocate : ""}

                          {((this.props.currentProfile.have_kids || this.props.currentProfile.want_kids || this.props.currentProfile.height || this.props.currentProfile.relocate) && this.props.currentProfile.marital_status) ? `, ${this.props.currentProfile.marital_status}` : ""}
                          {((!this.props.currentProfile.have_kids && !this.props.currentProfile.want_kids && !this.props.currentProfile.height && !this.props.currentProfile.relocate) && this.props.currentProfile.marital_status) ? this.props.currentProfile.marital_status : ""}
                        </span>

                      </span>

                      <span className=
                        {(this.props.currentProfile.religion ||
                        this.props.currentProfile.attendance) ?
                        "user-personal-info" :
                        "currently-hidden"}>

                        <span className="user-info-icon">
                          {(this.props.currentProfile.religion ||
                          this.props.currentProfile.attendance) ?
                          <i className="fas fa-church"></i> : ""}
                        </span>

                        <span>
                          {this.props.currentProfile.religion}

                          {(this.props.currentProfile.religion && this.props.currentProfile.attendance) ? `, ${this.props.currentProfile.attendance}` : ""}
                          {(!this.props.currentProfile.religion && this.props.currentProfile.attendance) ? this.props.currentProfile.attendance : ""}
                        </span>

                      </span>

                        <span className=
                          {(this.props.currentProfile.occupation ||
                          this.props.currentProfile.education) ?
                          "user-personal-info" :
                          "currently-hidden"}>

                          <span className="user-info-icon">
                            {(this.props.currentProfile.occupation ||
                            this.props.currentProfile.education) ?
                            <i className="fas fa-building"></i> : ""}
                          </span>
                          <span>
                            {this.props.currentProfile.occupation}

                            {(this.props.currentProfile.occupation && this.props.currentProfile.education) ? `, ${this.props.currentProfile.education}` : "" }
                            {(!this.props.currentProfile.occupation && this.props.currentProfile.education) ? this.props.currentProfile.education : "" }
                          </span>

                        </span>

                        <span className={this.props.currentProfile.language ?
                            "user-personal-info" :
                            "currently-hidden"}>

                          <span className="user-info-icon">
                            {(this.props.currentProfile.language ||
                              this.props.currentProfile.ethnicity) ?
                            <i className="fas fa-home"></i> : ""}
                          </span>
                          <span>

                          {(this.props.currentProfile.ethnicity && this.props.currentProfile.ethnicity.includes(",")) ? this.props.currentProfile.ethnicity.split(",").join(", ") : this.props.currentProfile.ethnicity}

                          <span id="make-reg-font">{(this.props.currentProfile.language && !this.props.currentProfile.ethnicity) ? "Speaks: " : ""}</span>
                          <span id="make-reg-font">{(this.props.currentProfile.language && this.props.currentProfile.ethnicity) ? ", Speaks: " : ""}</span>
                          {(this.props.currentProfile.language && this.props.currentProfile.language.includes(",")) ? this.props.currentProfile.language.split(",").join(", ") : this.props.currentProfile.language}

                        </span>
                      </span>

                      <span className=
                        {(this.props.currentProfile.pets ||
                        this.props.currentProfile.drink ||
                        this.props.currentProfile.smoke) ?
                        "user-personal-info" :
                        "currently-hidden"}>

                        <span className="user-info-icon">
                          {(this.props.currentProfile.pets ||
                          this.props.currentProfile.drink ||
                          this.props.currentProfile.smoke) ?
                          <i className="fas fa-flag"></i>: ""}
                        </span>
                        <span>
                          {(this.props.currentProfile.pets && this.props.currentProfile.pets.includes(",")) ? this.props.currentProfile.pets.split(",").join(", ") : this.props.currentProfile.pets}

                          {(this.props.currentProfile.pets && this.props.currentProfile.drink) ? `, ${this.props.currentProfile.drink}` : "" }
                          {(!this.props.currentProfile.pets && this.props.currentProfile.drink) ? this.props.currentProfile.drink : "" }

                          {((this.props.currentProfile.pets || this.props.currentProfile.drink) && this.props.currentProfile.smoke ) ? `, ${this.props.currentProfile.smoke}` : ""}
                          {((!this.props.currentProfile.pets && !this.props.currentProfile.drink) && this.props.currentProfile.smoke ) ? this.props.currentProfile.smoke : ""}
                        </span>
                      </span>

                      <span className=
                        {this.props.currentProfile.hobbies ?
                        "user-personal-info" :
                        "currently-hidden"}>

                        <span className="user-info-icon">
                          {this.props.currentProfile.hobbies ?
                          <i className="fas fa-smile"></i>: ""}
                        </span>
                        <span>
                          {this.props.currentProfile.hobbies ? `I like ${this.props.currentProfile.hobbies.split(",").join(", ")}` : null }
                        </span>
                      </span>

                        <span className={
                            this.props.currentProfile.first_date ?
                            "user-personal-info" :
                            "currently-hidden"}>

                          <span className="user-info-icon">
                            {this.props.currentProfile.first_date ? <i className="fas fa-coffee"></i> : ""}
                          </span>
                          <span>
                            {this.props.currentProfile.first_date ? <span id="make-reg-font">On a first date I prefer:</span> : "" }
                            {this.props.currentProfile.first_date ? ` ${this.props.currentProfile.first_date.split(",").join(", ")}` : "" }
                          </span>
                        </span>

                        <span className="user-personal-info">
                          <span className="user-info-icon"><i className="fas fa-search"></i></span>
                          <span className="">
                            <span id="make-reg-font">I am looking for:</span> {this.props.currentProfile.sex_seek.split(",").join(", ")}
                            {(!this.props.currentProfile.sex_seek && this.props.currentProfile.gender === "male") ? "Women" : ""}
                            {(!this.props.currentProfile.sex_seek && this.props.currentProfile.gender === "female") ? "Men" : ""}
                            , Ages {this.props.currentProfile.min_age_seek}-{this.props.currentProfile.max_age_seek}
                            {this.props.currentProfile.relationship_seek ? `, ${this.props.currentProfile.relationship_seek.split(",").join(", ")}` : ""}
                            , Within {this.props.currentProfile.distance_seek === 500 ? "500+ miles" : `${this.props.currentProfile.distance_seek} miles` } of {this.props.currentProfile.city}, {this.props.currentProfile.state}
                          </span>
                        </span>

                        <span className="user-personal-info">
                          <span className="user-info-icon"><i className="fas fa-clock"></i></span>
                          <span>
                            <span id="make-reg-font">Last Online:</span> {this.props.currentProfile.online === true ? <span id="online-now-text">Online Now</span> : <span>{this.props.currentProfile.last_online}</span>}
                          </span>
                        </span>

                    </section>

                </section>

              </section>


            </div>

          </section>

        </div>

      );
    }
  }

}


export default UserProfile;
