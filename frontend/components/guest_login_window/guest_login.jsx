import React from 'react';
import { Link } from 'react-router-dom';

class GuestLoginWindow extends React.Component {
  constructor(props) {
    super(props)

  }

  changeBackGroundImage(element) {
    if (element === "air") {
      document.getElementById("guest-login-window").style="background-image: url(https://s3.us-east-2.amazonaws.com/christian-singles-pro/airbending.jpg)";
    } else if (element === "water") {
      document.getElementById("guest-login-window").style="background-image: url(https://s3.us-east-2.amazonaws.com/christian-singles-pro/waterbending.jpg)";
    } else if (element === "aangkatara") {
      document.getElementById("guest-login-window").style="background-image: url(https://s3.us-east-2.amazonaws.com/christian-singles-pro/aang-katara.png)";

    }
  }

  handleSubmit(user) {
    if (user === "demoaccount") {
      document.getElementsByTagName("body")[0].style="overflow: scroll";
      this.props.updateUiWindow(null);
      this.props.login({username: "demoaccount", password: "password"});
    } else if (user === "katara") {
      document.getElementsByTagName("body")[0].style="overflow: scroll";
      this.props.updateUiWindow(null);
      this.props.login({username: "katara", password: "bereshitbara"});
    }
  }

  render() {
    return (
      <div className="hobbies-component-modal">
        <section className="guest-login-window" id="guest-login-window">


          <div className="guest-login-buttons">
            <button className= "guest-login" onClick={() => this.handleSubmit("demoaccount")}>
            male
            {/*
                onMouseOver={() => this.changeBackGroundImage("air")}
                onMouseOut={() => this.changeBackGroundImage("aangkatara")} */}

            </button>

            <button className= "guest-login" onClick={() => this.handleSubmit("katara")}>
            {/*
                onMouseOver={() => this.changeBackGroundImage("water")}
                onMouseOut={() => this.changeBackGroundImage("aangkatara")} */}

              female
            </button>

          </div>
        </section>
      </div>
    );
  }
}

export default GuestLoginWindow;
