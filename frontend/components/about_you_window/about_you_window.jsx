import React from 'react';
import { Link } from 'react-router-dom';
import { merge } from 'lodash';

class AboutYouWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.currentProfile;


    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile(this.props.currentUser.id)
  }


  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    delete user.hobbies;
    delete user.image;
    delete user.zip_code;
    this.props.updateUserInfo(user);
    this.props.updateUiWindow(null);
    document.getElementsByTagName("body")[0].style="overflow: scroll";
  }

  updateValue(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }

  handleClick() {
    this.props.updateUiWindow(null);
    document.getElementsByTagName("body")[0].style="overflow: scroll";
  }

  render() {
    return (
      <div className="about-you-modal">


        <div className="about-you-box">
          <form onSubmit={(e) =>this.handleSubmit(e)}>
            <span onClick={() => this.handleClick()} className="about-you-box-close">
              <i className="fas fa-times" id="about-you-exit-icon"></i>
            </span>

            <header className="about-you-header">
              <span className="about-you-box-text">
                <h2>About You</h2>
              </span>
            </header>


            <section className="about-you-box-input">
              <textarea onChange={this.updateValue("description")}
                className="about-you-textarea" value={this.state.description}
                maxLength="1500">
              </textarea>
            </section>

            <footer>
              <button className="about-you-button">Save Changes</button>
            </footer>
            </form>

          </div>

      </div>
    );
  }


}

export default AboutYouWindow;
