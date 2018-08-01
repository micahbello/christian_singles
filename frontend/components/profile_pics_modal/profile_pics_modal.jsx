import React from 'react';

class ProfilePicsModal extends React.Component {
  constructor(props) {
    super(props);
  }

componentWillUnmount() {
  this.props.updateUiWindow(null);
  document.getElementsByTagName("body")[0].style="overflow: scroll";
}

render() {
    return (
      <div className="profile-pic-modal">
        <div className="pic-modal-top-span">
          <i onClick={() => this.props.updateUiWindow(null)} className="fas fa-times fa-2x" id="pic-modal-exit-icon"></i>
        </div>

          <figure>
            <img src={this.props.currentProfilePic} />
          </figure>

        <div className="pic-modal-bottom-span"></div>
      </div>
    );
  }
}


export default ProfilePicsModal;
