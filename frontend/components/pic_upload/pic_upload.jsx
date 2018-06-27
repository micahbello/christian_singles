import React from 'react';
import { merge } from 'lodash';

class PicUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: this.props.currentPicture,
      imageFile: null
    };

    this.closeWindow = this.closeWindow.bind(this);
  };

  updateImage(e) {
    let file = e.currentTarget.files[0];
    let fileReader = new FileReader();

    fileReader.onloadend = function() {
      this.setState({imageFile: file, imageUrl: fileReader.result})
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  submitPhoto(e) {
    var formData = new FormData();
    formData.append("user[image]", this.state.imageFile);

    this.props.updateUserPicture(formData, this.props.userId)
    .then(
      (user) => dispatch(this.props.receiveCurrentUser({image: user.image})));

    this.closeWindow();
  }

  closeWindow() {
    this.props.updateUiWindow(null);
    document.getElementsByTagName("body")[0].style="overflow: scroll";
  }


  render() {
    return (
      <div className="pic-upload-modal">
        <div className="pic-upload-container">
          <figure>
            <img src={this.state.imageUrl} />
          </figure>

          <div className="pic-upload-form">

            <section>
              <label>Upload Photo</label>
              <input type="file" onChange={(e) => this.updateImage(e)}/>
              <button onClick={(e) => this.submitPhoto(e)}>Submit</button>
              <button onClick={() => this.closeWindow()}>Cancel</button>
            </section>

          </div>

        </div>
      </div>
    )
  }

}

export default PicUpload;
