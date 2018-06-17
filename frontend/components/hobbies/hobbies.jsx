import React from 'react';
import { hobbies } from '../attributes';
import { merge } from 'lodash';

class HobbiesWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hobbies: this.props.userHobbies
    };

    this.updateHobbies = this.updateHobbies.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  filterHobbies() {

  }

  updateHobbies(e) {
    console.log(this.state);

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
    const user = merge({}, this.state, {id: this.props.currentUserId});
    this.props.updateUserInfo(user);
  }

  render() {
    return (
      <div className= "hobbies-container">
        <header>
          <h1>Add Interests</h1>
        </header>

        <section className="hobbies-container-choices">

          <span className="hobbies-search-span">

            <input type="text" placeholder="Search Interests"/>
            <i class="fas fa-search"></i>

          </span>

          <section onMouseOut={(e) => this.handleSubmit(e)} className="hobby-type-list-container">

            <h2>Sports and Fitness</h2>

            {hobbies[0].map((hobby, idx) => {
              return (
                <button key={idx} className="hobby-button" onClick={(e) => this.updateHobbies(e)} value={hobby} id={this.state.hobbies.includes(hobby) ? "clicked-hobbies-button" : null}>
                  <span>{hobby}</span>
                  {this.state.hobbies.includes(hobby) ? <i className="fas fa-check"></i> : null }
                </button>
                );
              }
            )}

          </section>

          <section onMouseOut={(e) => this.handleSubmit(e)} className="hobby-type-list-container">

            <h2>Activities</h2>

            {hobbies[1].map((hobby, idx) => {
              return (
                <button key={idx} className="hobby-button" onClick={(e) => this.updateHobbies(e)} value={hobby} id={this.state.hobbies.includes(hobby) ? "clicked-hobbies-button" : null}>
                  <span>{hobby}</span>
                  {this.state.hobbies.includes(hobby) ? <i className="fas fa-check"></i> : null }
                </button>
                );
              }
            )}

          </section>

          <section onMouseOut={(e) => this.handleSubmit(e)} className="hobby-type-list-container">

            <h2>Arts and Entertainment</h2>

            {hobbies[2].map((hobby, idx) => {
              return (
                <button key={idx} className="hobby-button" onClick={(e) => this.updateHobbies(e)} value={hobby} id={this.state.hobbies.includes(hobby) ? "clicked-hobbies-button" : null}>
                  <span>{hobby}</span>
                    {this.state.hobbies.includes(hobby) ? <i className="fas fa-check"></i> : null }
                </button>
                );
              }
            )}

          </section>

          <section onMouseOut={(e) => this.handleSubmit(e)} className="hobby-type-list-container">

            <h2>Travel</h2>

            {hobbies[3].map((hobby, idx) => {
              return (
                <button key={idx} className="hobby-button" onClick={(e) => this.updateHobbies(e)} value={hobby} id={this.state.hobbies.includes(hobby) ? "clicked-hobbies-button" : null}>
                  <span>{hobby}</span>
                    {this.state.hobbies.includes(hobby) ? <i className="fas fa-check"></i> : null }
                </button>
                );
              }
            )}

          </section>

          <section onMouseOut={(e) => this.handleSubmit(e)} className="hobby-type-list-container">

            <h2>Music</h2>

            {hobbies[4].map((hobby, idx) => {
              return (
                <button key={idx} className="hobby-button" onClick={(e) => this.updateHobbies(e)} value={hobby} id={this.state.hobbies.includes(hobby) ? "clicked-hobbies-button" : null}>
                  <span>{hobby}</span>
                    {this.state.hobbies.includes(hobby) ? <i className="fas fa-check"></i> : null }
                </button>
                );
              }
            )}

          </section>

          <section onMouseOut={(e) => this.handleSubmit(e)} className="hobby-type-list-container">

            <h2>Eats and Drinks</h2>

            {hobbies[5].map((hobby, idx) => {
              return (
                <button key={idx} className="hobby-button" onClick={(e) => this.updateHobbies(e)} value={hobby} id={this.state.hobbies.includes(hobby) ? "clicked-hobbies-button" : null}>
                  <span>{hobby}</span>
                    {this.state.hobbies.includes(hobby) ? <i className="fas fa-check"></i> : null }
                </button>
                );
              }
            )}

          </section>

        </section>

        <footer>
          <button>Done</button>
        </footer>
      </div>
    );
  }

}


export default HobbiesWindow;
