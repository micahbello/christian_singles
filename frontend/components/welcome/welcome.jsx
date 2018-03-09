import React from 'react'
import { Link } from 'react-router-dom';

function Welcome({currentUser, logout}) {
  return (
    <div className="welcome-page">

      <div className="nav-eh">
        <div className="nav-text">Already a Member?</div>
        <Link className="link nav-linker" to='/login' >Login Here</Link>
      </div>

      <div className="text-box">
        <img className="fish" src={fish} alt="fish"/>
        <h1 className="heading-1">Christian Singles</h1>
        <h2 className="heading-2">1 Corinthians 13:4</h2>
        <p>Christian and single? Sign up today and change at least one of those facts.</p>
        <br/>
        <br/>
        <br/>

        <div className="link-to-sign-up-box">
          <Link className="link-to-sign-up" to='/signup'>Create an account</Link>
        </div>
      </div>

    </div>
  );
};

export default Welcome;
