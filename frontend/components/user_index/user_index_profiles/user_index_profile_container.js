import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserIndexProfile from './user_index_profile';

const msp = (state, ownProps) => {
  return {
    profileId: ownProps.id,
    profileDisplayName: ownProps.displayName,
    profileImgUrl: ownProps.imgUrl,
    profileAge: ownProps.age,
    profileUsername: ownProps.userName,
    profileOnlineStatus: ownProps.onlineStatus,
    profileHeight: ownProps.height,
    profileCity: ownProps.city,
    profileState: ownProps.state,
    profileOccupation: ownProps.occupation,
    profileReligion: ownProps.religion
  };
};

// const mdp = (dispatch) => {
//   return {
//
//   };
// };

export default withRouter(connect(msp, null)(UserIndexProfile))
