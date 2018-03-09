import React from 'react';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';

class userInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marital_status: ''
    };
  // this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateValue(field) {
    debugger
    return (e) => this.setState({[field]: e.currentTarget.value});
    const user = merge({}, this.state, this.props.currentUser.id);
    this.props.updateUserInfo(user);
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   const user = merge({}, this.state);
  //   this.props.updateUserInfo(user);
  // }



  render() {
    return (
      <div>

        <label >Marital Status</label>
        <input onChange={this.updateValue("marital_status")} type="text" value={this.state.marital_status}/>

      </div>
    );
  }


}

export default userInfoForm;
