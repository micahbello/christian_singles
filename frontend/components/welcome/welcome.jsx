import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import GuestLoginWindowContainer from '../guest_login_window/guest_login_container';

class Welcome extends React.Component {
  constructor(props) {
    super(props)
  }

  closeWindow() {
    document.getElementsByTagName("body")[0].style="overflow: scroll";
    this.props.updateUiWindow(null);
  }

  render() {
    return (
      <div className="landing-page" onClick={this.props.currentWindow === "GuestLoginWindow" ? () => this.closeWindow() : null}>
        { this.props.currentWindow === "GuestLoginWindow" ? <GuestLoginWindowContainer /> : null}
        { this.props.currentWindow != null ? document.getElementsByTagName("body")[0].style="overflow: hidden" : null}

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
                onClick={() => this.props.updateUiWindow("GuestLoginWindow")}>
                Guest Login
            </button>

          </section>

        </section>

      </div>
    );
  }
};

export default Welcome;

// <button className= "guest-login"
//     onClick={() => login({username: "demoaccount", password: "password"})}>
//     Guest Login
// </button>
