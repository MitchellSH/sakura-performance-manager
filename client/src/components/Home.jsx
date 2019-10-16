import React, { Component } from 'react';
import Navigation from './Navigation';

class Home extends Component {
  render() {
    return (
      <>
        <Navigation/>
        <div className="container">
          <div className="grid">
            <div className="col-xs-12">
              <div className="introduction">
                <h2>Welcome to the Sakura Performance Manager!</h2>
                <p>Sakura Performance Manager is your one stop shop for all your employee management needs.</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home;