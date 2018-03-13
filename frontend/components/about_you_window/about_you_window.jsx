import React from 'react';
import { Link } from 'react-router-dom';
import { merge } from 'lodash';

class AboutYouWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.currentProfile;


    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile(this.props.currentUser.id)
  }


  handleSubmit(e) {
    e.preventDefault();
    debugger
    const user = merge({}, this.state);
    this.props.updateUserInfo(user);
  }

  updateValue(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }

  render() {
    return (
      <div>
        <button></button>
        <div></div>

        <div className="about-you-box">
          <form onSubmit={(e) => this.handleSubmit(e)}>

            <p className="about-you-box-close">X</p>
            <div className="about-you-box-text">
              <h3>About You</h3>
            </div>

            <div className="about-you-box-input">
              <textarea onChange={this.updateValue("description")} className="about-you-textarea" value={this.state.description}></textarea>
            </div>

            <button className="about-you-save-button">Save Changes</button>

            </form>

          </div>

      </div>
    );
  }


}

export default AboutYouWindow;
