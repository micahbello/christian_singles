import React from 'react';
import { hobbies } from '../attributes';
import { merge } from 'lodash';

class HobbiesWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hobbies: this.props.userHobbies,
      currentSearch: ""
    };

    this.updateHobbies = this.updateHobbies.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.includedInFilter = this.includedInFilter.bind(this);
  }

  updateSearch(e) {
    this.setState({currentSearch: e.currentTarget.value})
  }

  includedInFilter(hobby) {
    let currentSearch = this.state.currentSearch.toLowerCase().split(" ").join("");
    let currentHobby = hobby.toLowerCase().split(" ").join("");

    if (currentSearch === "") {
      return true;
    } else if (currentHobby.includes(currentSearch)) {
      return true;
    } else {
      return false;
    }
  }

  updateHobbies(e) {

    if (this.state.hobbies === null || this.state.hobbies === "") {
      this.setState({hobbies: e.currentTarget.value});
    }
    else if (!this.state.hobbies.split(",").includes(e.currentTarget.value)) {
    this.setState({hobbies: this.state.hobbies.concat(`,${e.currentTarget.value}`)})
    } else {
      let oldCheckedOptions = this.state.hobbies.split(",");
      let newCheckedOptions = [];

      oldCheckedOptions.forEach(option => {
        if (option !== e.currentTarget.value) {
          newCheckedOptions.push(option);
        }
      });
      this.setState({hobbies: newCheckedOptions.join(",") })
    }

  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, {hobbies: this.state.hobbies}, {id: this.props.currentUserId});
    this.props.updateUserInfo(user);
  }

  closeWindow() {
    this.props.updateUiWindow(null);
  }

  render() {
    return (

        <div className= "hobbies-container" id="hidden-hobbies-window">
          <header>
            <h1>Add Interests</h1>
            <i className="fas fa-times" id="hobbies-window-close-icon" onClick={() => this.closeWindow()}></i>
          </header>

          <section className="hobbies-container-choices">

            <span className="hobbies-search-span">

              <input onChange={(e) => this.updateSearch(e)} type="text" placeholder="Search Interests"/>
              <i className="fas fa-search"></i>

            </span>

            <section onMouseOut={(e) => this.handleSubmit(e)} className="hobby-type-list-container">

              <h2>Sports and Fitness</h2>

              {hobbies[0].map((hobby, idx) => {

              if (this.includedInFilter(hobby)) {
                  return (
                    <button key={idx} className="hobby-button" onClick={(e) => this.updateHobbies(e)} value={hobby} id={this.state.hobbies.includes(hobby) ? "clicked-hobbies-button" : null}>
                      <span>{hobby}</span>
                      {this.state.hobbies.includes(hobby) ? <i className="fas fa-check"></i> : null }
                    </button>
                    );
                  }
                }
              )}

            </section>

            <section onMouseOut={(e) => this.handleSubmit(e)} className="hobby-type-list-container">

              <h2>Activities</h2>

              {hobbies[1].map((hobby, idx) => {
                if (this.includedInFilter(hobby)) {
                  return (
                    <button key={idx} className="hobby-button" onClick={(e) => this.updateHobbies(e)} value={hobby} id={this.state.hobbies.includes(hobby) ? "clicked-hobbies-button" : null}>
                      <span>{hobby}</span>
                      {this.state.hobbies.includes(hobby) ? <i className="fas fa-check"></i> : null }
                    </button>
                    );
                  }
                }
              )}

            </section>

            <section onMouseOut={(e) => this.handleSubmit(e)} className="hobby-type-list-container">

              <h2>Arts and Entertainment</h2>

              {hobbies[2].map((hobby, idx) => {
                if (this.includedInFilter(hobby)) {
                  return (
                    <button key={idx} className="hobby-button" onClick={(e) => this.updateHobbies(e)} value={hobby} id={this.state.hobbies.includes(hobby) ? "clicked-hobbies-button" : null}>
                      <span>{hobby}</span>
                        {this.state.hobbies.includes(hobby) ? <i className="fas fa-check"></i> : null }
                    </button>
                    );
                  }
                }
              )}

            </section>

            <section onMouseOut={(e) => this.handleSubmit(e)} className="hobby-type-list-container">

              <h2>Travel</h2>

              {hobbies[3].map((hobby, idx) => {
                if (this.includedInFilter(hobby)) {
                  return (
                    <button key={idx} className="hobby-button" onClick={(e) => this.updateHobbies(e)} value={hobby} id={this.state.hobbies.includes(hobby) ? "clicked-hobbies-button" : null}>
                      <span>{hobby}</span>
                        {this.state.hobbies.includes(hobby) ? <i className="fas fa-check"></i> : null }
                    </button>
                    );
                  }
                }
              )}

            </section>

            <section onMouseOut={(e) => this.handleSubmit(e)} className="hobby-type-list-container">

              <h2>Music</h2>

              {hobbies[4].map((hobby, idx) => {
                if (this.includedInFilter(hobby)) {
                  return (
                    <button key={idx} className="hobby-button" onClick={(e) => this.updateHobbies(e)} value={hobby} id={this.state.hobbies.includes(hobby) ? "clicked-hobbies-button" : null}>
                      <span>{hobby}</span>
                        {this.state.hobbies.includes(hobby) ? <i className="fas fa-check"></i> : null }
                    </button>
                    );
                  }
                }
              )}

            </section>

            <section onMouseOut={(e) => this.handleSubmit(e)} className="hobby-type-list-container">

              <h2>Eats and Drinks</h2>

              {hobbies[5].map((hobby, idx) => {
                if (this.includedInFilter(hobby)) {
                  return (
                    <button key={idx} className="hobby-button" onClick={(e) => this.updateHobbies(e)} value={hobby} id={this.state.hobbies.includes(hobby) ? "clicked-hobbies-button" : null}>
                      <span>{hobby}</span>
                        {this.state.hobbies.includes(hobby) ? <i className="fas fa-check"></i> : null }
                    </button>
                    );
                  }
                }
              )}

            </section>

          </section>

          <footer>
            <button onClick={() => this.closeWindow()}>Done</button>
          </footer>
        </div>
    );
  }

}


export default HobbiesWindow;
