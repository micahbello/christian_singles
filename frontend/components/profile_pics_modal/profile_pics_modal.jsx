import React from 'react';

const ProfilePicsModal = (props) => (
  <div className="profile-pic-modal">
    <div className="pic-modal-top-span">
      <i onClick={() => props.updateUiWindow(null)} className="fas fa-times fa-2x" id="pic-modal-exit-icon"></i>
    </div>

      <figure>
        <img src={props.currentProfilePic} />
      </figure>

    <div className="pic-modal-bottom-span"></div>
  </div>
)


export default ProfilePicsModal;
