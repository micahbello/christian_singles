import React from 'react'
import { Link } from 'react-router-dom';

function Welcome({currentUser, logout}) {
  return (
    <div class="welcome-page">

      <div class="nav-eh">
        <div class="nav-text">Already a Member?</div>
        <Link class="link nav-linker" to='/login' >Login Here</Link>
      </div>

      <div class="text-box">
        <h1 class="heading-1">Christian Singles</h1>
        <h2 class="heading-2">1 Corinthians 13:4</h2>
        <p>Christian and single? Sign up today and change at least one of those facts.</p>

        <input type="button" onclick='/signup' value="Create an Account" />
      </div>

    </div>
  );
};

// <Link to='/signup'>Create an account</Link>
export default Welcome;
