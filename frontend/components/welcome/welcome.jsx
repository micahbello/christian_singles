import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';

function Welcome({currentUser, logout, login}) {
  return (
    <div className="landing-page">

      <section className="member-login-link-section">
        <span>Already a Member?</span>
        <Link className="link-to-log-in" to='/login' >Login Here</Link>
      </section>

      <section className="text-box">
        <img src={fish} alt="fish"/>

        <h1>Christian Singles</h1>
        <h2>1 Corinthians 13:4</h2>

        <p>Love is patient. Love is kind. Come find this love.</p>

        <section className="sign-up-section">

          <Link className="link-to-sign-up" to='/signup'>Create an account</Link>

          <button className= "guest-login"
              onClick={() => login({username: "demoaccount", password: "password"})}>
              Guest Login
          </button>

        </section>

      </section>

    </div>
  );
};

export default Welcome;
