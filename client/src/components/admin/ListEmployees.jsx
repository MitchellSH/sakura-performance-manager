import React, { Component } from 'react';
import axios from 'axios';
import Navigation from '../Navigation';
import {NavLink} from "react-router-dom";

class ListEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: JSON.parse(localStorage.getItem('user')),
      users: []
    };
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios.get('/api/users', {
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <>
        <Navigation/>
        <div className="container">
          <div className="grid">
            <div className="col-xs-12 col-md-8">
              <h2>Employee List</h2>
              <p>Welcome to the Manage Employees page. In this view, you may <em>view</em>, <em>add</em>, <em>edit</em>, and <em>remove</em> Employees as you see fit.
                In addition you may submit Employee Performance Reviews.</p>
            </div>
            <div className="col-xs-12 col-md-4">
              <NavLink exact to="/employees/new">
                <button>Add New Employee</button>
              </NavLink>
            </div>
            <div className="col-xs-12">
              {this.state.users.map((user) => {
                if(user.id !== this.state.currentUser.id) {
                  return (
                      <NavLink exact to={`/employee/${user.id}`} key={user.id}>
                        <div className="block grid">
                          <div className="col-xs-12">
                            <h4>{user.name}</h4>
                            <p>{user.title}</p>
                          </div>
                        </div>
                      </NavLink>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ListEmployees;