import React from 'react';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';
import TopHeaderContainer from '../top_header/top_header_container';



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
      })
    }
  }

  componentWillUnmount() {
    this.props.clearCurrentProfile();
  }


  render() {
debugger
    if (!this.state) {
      return <p>...Loading...</p>
      } else {
      return (

        <div className="edit-profile-page">

          <TopHeaderContainer />

          <div className="user-profile-span">

        {this.props.currentUser.id === this.props.currentProfile.id
            ?
            <h2 className="edit-profile-text">My Profile</h2>
            : <h2></h2>}



        {this.props.currentUser.id === this.props.currentProfile.id
            ?
            <div id="user-profile-edit-button">
            <Link id="user-profile-edit-link" to='/editprofile' >Edit Profile</Link>
            </div>
            : <h2></h2>}

          </div>

          <div className="info-forms">

            <div className="user-info-pic-container">
              <img src={this.props.currentProfile.image} className="profile-full-pic"/>
             </div>

          <div className="user-info-container">

            <div className="user-bio">
              <div className="user-name-age-container">
                <p className="user-display_name">
                  {this.props.currentProfile.display_name ?
                    this.props.currentProfile.display_name : this.props.currentProfile.username }</p>
                  <p className="user-age">{this.props.currentProfile.age ? `, ${this.props.currentProfile.age}` : ""}</p>
              </div>

              <div className="user-location">
                <p className="user-city">{this.props.currentProfile.city}</p>
                <p className="user-state">{this.props.currentProfile.state ? `, ${this.props.currentProfile.state}` : ""}</p>
              </div>

              <p className={this.props.currentProfile.description ? "user-about-me" : "currently-hidden"}>{this.props.currentProfile.description}</p>

            </div>

            <div className="user-attributes-info">

              <li className=
                {(this.props.currentProfile.height ||
                this.props.currentProfile.have_kids ||
                this.props.currentProfile.want_kids ||
                this.props.currentProfile.relocate) ?
                "user-personal-info" :
                "currently-hidden"}>


                <p className="user-info-icon">
                {(this.props.currentProfile.height ||
                this.props.currentProfile.have_kids ||
                this.props.currentProfile.want_kids ||
                this.props.currentProfile.relocate ) ?
                <img src="https://www.iconsdb.com/icons/preview/caribbean-blue/user-6-xxl.png" width="16"/> : ""}
                </p>

                <p>{this.props.currentProfile.height}

                  {(this.props.currentProfile.height && this.props.currentProfile.have_kids) ? `, ${this.props.currentProfile.have_kids}` : ""}
                  {(!this.props.currentProfile.height && this.props.currentProfile.have_kids) ? this.props.currentProfile.have_kids : ""}

                  {((this.props.currentProfile.have_kids || this.props.currentProfile.height) && this.props.currentProfile.want_kids ) ? `, ${this.props.currentProfile.want_kids}` : ""}
                  {((!this.props.currentProfile.have_kids && !this.props.currentProfile.height) && this.props.currentProfile.want_kids ) ? this.props.currentProfile.want_kids : ""}


                  {((this.props.currentProfile.have_kids || this.props.currentProfile.want_kids || this.props.currentProfile.height) && this.props.currentProfile.relocate) ? `, ${this.props.currentProfile.relocate}` : ""}
                  {((!this.props.currentProfile.have_kids && !this.props.currentProfile.want_kids && !this.props.currentProfile.height) && this.props.currentProfile.relocate) ? this.props.currentProfile.relocate : ""}
                </p>
              </li>



              <li className=
                {(this.props.currentProfile.religion ||
                this.props.currentProfile.attendance) ?
                "user-personal-info" :
                "currently-hidden"}>

                <p className="user-info-icon">
                  {(this.props.currentProfile.religion ||
                  this.props.currentProfile.attendance) ?
                  <img src="http://www.downloadclipart.net/thumb/30485-blue-cross-icon.png" width="13"/> : ""}
                </p>

                <p>
                  {this.props.currentProfile.religion}

                  {(this.props.currentProfile.religion && this.props.currentProfile.attendance) ? `, ${this.props.currentProfile.attendance}` : ""}
                  {(!this.props.currentProfile.religion && this.props.currentProfile.attendance) ? this.props.currentProfile.attendance : ""}
                </p>
              </li>


              <li className=
                {(this.props.currentProfile.occupation ||
                this.props.currentProfile.education) ?
                "user-personal-info" :
                "currently-hidden"}>

                <p className="user-info-icon">
                  {(this.props.currentProfile.occupation ||
                  this.props.currentProfile.education) ?
                  <img src="https://www.iconsdb.com/icons/preview/caribbean-blue/school-xxl.png" width="19"/> : ""}
                </p>
                <p id="make-reg-font">
                  {this.props.currentProfile.occupation}

                  {(this.props.currentProfile.occupation && this.props.currentProfile.education) ? `, ${this.props.currentProfile.education}` : "" }
                  {(!this.props.currentProfile.occupation && this.props.currentProfile.education) ? this.props.currentProfile.education : "" }
                </p>
              </li>

              <li className={this.props.currentProfile.language ?
                  "user-personal-info" :
                  "currently-hidden"}>

                <p className="user-info-icon">
                  {(this.props.currentProfile.language ||
                    this.props.currentProfile.ethnicity) ?
                  <img src="https://www.iconsdb.com/icons/preview/caribbean-blue/home-2-xxl.png" width="19" /> : ""}
                </p>
                <p>

                {(this.props.currentProfile.ethnicity && this.props.currentProfile.ethnicity.includes(",")) ? this.props.currentProfile.ethnicity.split(",").join(", ") : this.props.currentProfile.ethnicity}

                <span id="make-reg-font">{(this.props.currentProfile.language && !this.props.currentProfile.ethnicity) ? "Speaks: " : ""}</span>
                <span id="make-reg-font">{(this.props.currentProfile.language && this.props.currentProfile.ethnicity) ? ", Speaks: " : ""}</span>
                {(this.props.currentProfile.language && this.props.currentProfile.language.includes(",")) ? this.props.currentProfile.language.split(",").join(", ") : this.props.currentProfile.language}

                </p>
              </li>


              <li className=
                {(this.props.currentProfile.pets ||
                this.props.currentProfile.drink ||
                this.props.currentProfile.smoke) ?
                "user-personal-info" :
                "currently-hidden"}>

                <p className="user-info-icon">
                  {(this.props.currentProfile.pets ||
                  this.props.currentProfile.drink ||
                  this.props.currentProfile.smoke) ?
                  <img src="https://www.iconsdb.com/icons/preview/caribbean-blue/empty-flag-xxl.png" width="21"/>: ""}
                </p>
                <p>

                  {(this.props.currentProfile.pets && this.props.currentProfile.pets.includes(",")) ? this.props.currentProfile.pets.split(",").join(", ") : this.props.currentProfile.pets}

                  {(this.props.currentProfile.pets && this.props.currentProfile.drink) ? `, ${this.props.currentProfile.drink}` : "" }
                  {(!this.props.currentProfile.pets && this.props.currentProfile.drink) ? this.props.currentProfile.drink : "" }

                  {((this.props.currentProfile.pets || this.props.currentProfile.drink) && this.props.currentProfile.smoke ) ? `, ${this.props.currentProfile.smoke}` : ""}
                  {((!this.props.currentProfile.pets && !this.props.currentProfile.drink) && this.props.currentProfile.smoke ) ? this.props.currentProfile.smoke : ""}
                </p>
              </li>

              <li className=
                {this.props.currentProfile.hobbies ?
                "user-personal-info" :
                "currently-hidden"}>

                <p className="user-info-icon">
                  {this.props.currentProfile.hobbies ? "*" : ""}
                </p>
                <p>
                  {this.props.currentProfile.hobbies}
                </p>
              </li>

              <li className={
                  this.props.currentProfile.first_date ?
                  "user-personal-info" :
                  "currently-hidden"}>

                <p className="user-info-icon">
                {this.props.currentProfile.first_date ? <img src="https://www.iconsdb.com/icons/preview/caribbean-blue/coffee-5-xxl.png" width="23"/> : ""}
                </p>
                <p>
                  {this.props.currentProfile.first_date ? `On a first date I prefer: ${this.props.currentProfile.first_date.split(",").join(", ")}` : ""}
                </p>
              </li>


              <li className="user-personal-info">
                <p className="user-info-icon"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh31jrtcCCYCANXNBpziTKoiPQPuU9qTeHDeOylLbcw4xTvHSr" width="20"/></p>
                <p className="">
                  I am looking for: {this.props.currentProfile.sex_seek}
                  {(!this.props.currentProfile.sex_seek && this.props.currentProfile.gender === "male") ? "Women" : ""}
                  {(!this.props.currentProfile.sex_seek && this.props.currentProfile.gender === "female") ? "Men" : ""}
                </p>
              </li>

              <li className="user-personal-info">
                <p className="user-info-icon"><img src="https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/256/Clock.png" width="18"/></p>
                <p>
                  Last Online: {this.props.currentProfile.online === true ? <span id="online-now-text">Online Now</span> : <span>{this.props.currentProfile.last_online}</span>}
                </p>
              </li>



            </div>

          </div>

        </div>

      </div>

      );
    }
  }

}


export default UserProfile;

// {`${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-${(new Date()).getDate()}` === this.state.last_online ? "true" : "false"}


// <div className="user-personal-info">
//   <p className="user-info-icon">i</p>
//
//   <span>I grew up in <p>Denmark</p><p>, {this.props.getCurrentProfile.language}</p> , Speak <p>this.props.currentProfile.language</p></span>
// </div>
