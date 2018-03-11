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


function TopHeader() {
  return (
    <span className="top-header">

      <div className="th-small-logo">
        <img className="th-small-fish" src={fish} alt="fish"/>
        <Link className="th-small-logo-link "to='/browse'>Christian Single</Link>
      </div>

      <div className="top-header-links">
        <div className="th-browse-cont">
          <Link className="th-link" to='/browse' >Browse</Link>
        </div>

        <div>
          <Link className="th-link" to='/browse' >Messages</Link>
        </div>

        <div className="th-matches-cont">
          <Link className="th-link" to='/browse'>Matches</Link>
        </div>

      </div>

      <div className="th-dropdown">
        <button onClick={() => dropMenu()} className="th-dropbtn"></button>
        <div id="iconDropDown" className="th-dropdown-content">
          <Link className="th-dropdown-link" to='/'>My Profile</Link>
          <Link className="th-dropdown-link" to='/'>Discovery Preferences</Link>
          <div onClick={() => dispatch(logout())} className="th-dropdown-link">Logout</div>

        </div>
      </div>


    </span>

  );
}

export default TopHeader;



// <div className="th-user-icon">
//
//   icon
// </div>
