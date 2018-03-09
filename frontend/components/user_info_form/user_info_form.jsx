import React from 'react';
import { merge } from 'lodash';
import { Link } from 'react-router-dom';

class userInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marital_status: ''
    };

  }

  // updateValue(field) {
  //   return (e) => this.setState({[field]: e.currentTarget.value});
  // }
  //
  // handleSubmit() {
  //
  // }

  render() {
    return (
      <div>

        <label >Marital Status</label>
        <input type="text" value={this.state.marital_status}/>

      </div>
    );
  }


}

export default userInfoForm;
