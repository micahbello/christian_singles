import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import GuestLoginWindowContainer from '../guest_login_window/guest_login_container';
import { Player } from 'video-react';

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



        <section className="landing-header  container">

          <div className="video-wrap">
            <video id="background-video" loop autoPlay muted>
              <source src="https://s3.us-east-2.amazonaws.com/christian-singles-pro/Aerial+Video+Of+Married+Couple.mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="landing-header-overlay"></div>

          <section className="landing-header-content">
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
