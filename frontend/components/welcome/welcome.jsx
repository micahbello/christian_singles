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
        <img class="fish" src={fish} alt="fish"/>
        <h1 class="heading-1">Christian Singles</h1>
        <h2 class="heading-2">1 Corinthians 13:4</h2>
        <p>Christian and single? Sign up today and change at least one of those facts.</p>
        <br/>
        <br/>
        <br/>

        <div class="link-to-sign-up-box">
          <Link class="link-to-sign-up" to='/signup'>Create an account</Link>
        </div>
      </div>

    </div>
  );
};

export default Welcome;
