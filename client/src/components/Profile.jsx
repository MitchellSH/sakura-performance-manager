import React, { Component } from 'react';
import Navigation from './Navigation';
import {NavLink, Redirect} from "react-router-dom";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: JSON.parse(localStorage.getItem('user')),
      token: "Bearer " + localStorage.getItem("jwt"),
      user: {},
      logout: false
    };
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.setState({ logout: true });
  }

  componentDidMount() {
    axios.get('/api/users/' + this.state.currentUser.id, {
      headers: {
        'Authorization': this.state.token
      }
    })
        .then(response => {
          this.setState({ user: response.data });
        })
        .catch(error => console.log('error', error));
  }

  render() {
    const { logout } = this.state;

    if (logout) {
      localStorage.removeItem('jwt');
      return <Redirect to={`/login`}/>;
    }

    return (
      <>
        <Navigation/>
        <div className="container">
          <div className="grid">
            <div className="col-xs-12 col-md-7">
              <h1>{this.state.user.name}</h1>
              <h4 className="subheader">{this.state.user.email}</h4>
            </div>
            <div className="col-xs-12 col-md-5">
              <NavLink exact to="/profile/edit">
                <button>Change Password</button>
              </NavLink>
              <button onClick={this.logout}>Logout</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;