import React from 'react';
import { Link } from 'react-router-dom';

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
    <header className="top-header">

      <Link className="footer-header-logo" to='/browse'>
        <img src={fish} alt="fish"/>
        <span>Christian Singles</span>
      </Link>

      <nav className="top-header-links">
        <Link className="th-link" to='/browse'>Browse</Link>
        <Link className="th-link" to='/activity'>Activity</Link>
      </nav>

      <figure>
        <img className="user-icon" src={this.props.currentUser.image} />
          <div className="dropdown-menu" id="dropdown-menu">
            <Link onClick={() => this.handleMyProfileClick()} className="th-dropdown-link" to={`/profile/${this.props.currentUser.id}`} >My Profile</Link>
            <Link className="th-dropdown-link" to='/discoverypreferences'>Discovery Preferences</Link>
            <div onClick={() => this.handleLogOut()} className="th-dropdown-link">Logout</div>
          </div>
      </figure>

    </header>
  );
 };
};

export default TopHeader;


document.onclick = (event) => {
  let menu = document.getElementById("dropdown-menu");

  if (menu) {
    if (event.target.className === "user-icon") {
      if (!menu.classList.contains("show")) {
        menu.classList.add("show");
      } else {
        menu.classList.remove("show");
      }
    } else {
      menu.classList.remove("show");
    }
  }
}
