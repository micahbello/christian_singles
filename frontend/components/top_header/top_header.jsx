import React from 'react';
import { Link } from 'react-router-dom';

function dropMenu() {
  document.getElementById("iconDropDown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.th-dropbtn')) {

    let dropdowns = document.getElementsByClassName("th-dropdown-content");
    for(let i = 0; i < dropdowns.length; i++) {
      let openDrowndown = dropdowns[i];
      if (openDrowndown.classList.contains('show')) {
        openDrowndown.classList.remove('show');
      }
    }
  }
}

// function handleClick() {
//   let user = this.props.currentUser;
//   debugger
//   this.props.getCurrentProfile(user.id);
// }

class TopHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    this.props.updateUserInfo({id: this.props.currentUser.id, last_online: new Date});
    this.props.logout();
  }

  handleMyProfileClick() {

      this.props.getCurrentProfile(this.props.currentUser.id)

  }

  render (){
  return (
    <span className="top-header">

      <div className="th-small-logo">
        <img className="th-small-fish" src={fish} alt="fish"/>
        <Link className="th-small-logo-link "to='/browse'>Christian Singles</Link>
      </div>

      <div className="top-header-links">
        <div className="th-browse-cont">
          <Link className="th-link" to='/browse' >Browse</Link>
        </div>

        <div>
          <Link className="th-link" to='/messages' >Messages</Link>
        </div>

        <div className="th-matches-cont">
          <Link className="th-link" to='/matches'>Matches</Link>
        </div>

      </div>

      <div className="th-dropdown">

          <img className="th-dropbtn" onMouseOver={() => dropMenu()} src={this.props.currentUser.image} />


        <div id="iconDropDown" className="th-dropdown-content">
          <Link onClick={() => this.handleMyProfileClick()} className="th-dropdown-link" to={`/profile/${this.props.currentUser.id}`} >My Profile</Link>
          <Link className="th-dropdown-link" to='/discoverypreferences'>Discovery Preferences</Link>
          <div onClick={() => this.handleLogOut()} className="th-dropdown-link">Logout</div>

        </div>
      </div>


    </span>
  );
 };
};

export default TopHeader;



//new icon drop down-
//
// <div className="th-dropdown">
//
//     <img className="th-dropbtn" onMouseOver={() => dropMenu()} src={this.props.currentUser.image} />
//
//
//   <div id="iconDropDown" className="th-dropdown-content">
//     <Link onClick={() => dispatch(getCurrentProfile(this.props.currentUser.id))} className="th-dropdown-link" to={`/profile/${this.props.currentUser.id}`} >My Profile</Link>
//     <Link className="th-dropdown-link" to='/discoverypreferences'>Discovery Preferences</Link>
//     <div onClick={() => dispatch(logout())} className="th-dropdown-link">Logout</div>
//
//   </div>
// </div>
//

//old
// <div className="th-dropdown">
//   <button onClick={() => dropMenu()} className="th-dropbtn">
//   </button>
//
//   <div id="iconDropDown" className="th-dropdown-content">
//     <Link onClick={() => dispatch(getCurrentProfile(this.props.currentUser.id))} className="th-dropdown-link" to={`/profile/${this.props.currentUser.id}`} >My Profile</Link>
//     <Link className="th-dropdown-link" to='/discoverypreferences'>Discovery Preferences</Link>
//     <div onClick={() => dispatch(logout())} className="th-dropdown-link">Logout</div>
//
//   </div>
// </div>
