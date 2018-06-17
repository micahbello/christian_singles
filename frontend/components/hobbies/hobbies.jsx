import React from 'react';
import { hobbies } from '../attributes';

class HobbiesWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  filterHobbies() {

  }

  render() {
    return (
      <div className= "hobbies-container">
        <header>
          <h1>Add Interests</h1>
        </header>

        <section className="hobbies-container-choices">

          <section>

            <h2>Sports and Fitness</h2>

            {hobbies[0].map((hobby, idx) => {
              return (
                <button key={idx} className="hobby-button">
                  <span>{hobby}</span>
                </button>
                );
              }
            )}

          </section>

          <section>

            <h2>Activities</h2>

            {hobbies[1].map((hobby, idx) => {
              return (
                <button key={idx} className="hobby-button">
                  <span>{hobby}</span>
                </button>
                );
              }
            )}

          </section>

          <section>

            <h2>Arts and Entertainment</h2>

            {hobbies[2].map((hobby, idx) => {
              return (
                <button key={idx} className="hobby-button">
                  <span>{hobby}</span>
                </button>
                );
              }
            )}

          </section>

          <section>

            <h2>Travel</h2>

            {hobbies[3].map((hobby, idx) => {
              return (
                <button key={idx} className="hobby-button">
                  <span>{hobby}</span>
                </button>
                );
              }
            )}

          </section>

          <section>

            <h2>Music</h2>

            {hobbies[4].map((hobby, idx) => {
              return (
                <button key={idx} className="hobby-button">
                  <span>{hobby}</span>
                </button>
                );
              }
            )}

          </section>

          <section>

            <h2>Eats and Drinks</h2>

            {hobbies[5].map((hobby, idx) => {
              return (
                <button key={idx} className="hobby-button">
                  <span>{hobby}</span>
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
