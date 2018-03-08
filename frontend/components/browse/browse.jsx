import React from 'react';
import { logout } from '../../actions/session_actions';



function Browse() {
  return (
    <div>
    <h1>HERE ARE YOUR CHOICES</h1>

    <button onClick={() => dispatch(logout())}>Log Out</button>
    </div>
  );
}

export default Browse;
