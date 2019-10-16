import React, { Component } from 'react';
import Navigation from '../Navigation';
import axios from "axios";
import moment from 'moment';
import {NavLink, Redirect} from "react-router-dom";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: JSON.parse(localStorage.getItem('user')),
      user: {},
      userReviews: [],
      redirect: false
    };
    this.removeUser = this.removeUser.bind(this);
  }

  getUser(params) {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios.get('/api/users/' + params, {
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(error => console.log('error', error));
  }

  getReviews(user_id) {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios.get('/api/users/' + user_id + '/reviews', {
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        this.setState({ userReviews: [...this.state.userReviews, ...response.data ] })
      })
      .catch(error => console.log('error', error));
  }

  removeUser(id) {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios.delete('/api/users/' + id, {
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        this.setState({ redirect: true });
      })
      .catch(error => console.log('error', error));
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
    this.getReviews(this.props.match.params.id);
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/employees"/>;
    }

    return (
      <>
        <Navigation/>
        <div className="container">
          <div className="grid">
            <div className="col-xs-12 col-md-8">
              <h1>{this.state.user.name}</h1>
              <h4 className="subheader">{this.state.user.title}</h4>
            </div>
            <div className="col-xs-12 col-md-4">
              <NavLink exact to={`/employee/${this.state.user.id}/edit`}>
                <button>Edit</button>
              </NavLink>
              <button onClick={() => this.removeUser(this.state.user.id)}>Remove</button>
            </div>
          </div>
          <div className="grid">
            <div className="col-xs-12">
              <NavLink exact to={`/employee/${this.state.user.id}/review`}>
                <button>Compose Review</button>
              </NavLink>
            </div>
            <div className="col-xs-12">
              { this.state.userReviews.map((review) => {
                  return (
                    <NavLink className="block-link" exact to={`/review/${review.id}`} key={review.id}>
                      <div className="block grid">
                        <div className="col-xs-12">
                          <h3>{review.title}</h3>
                          <p className="subheader"><span>{moment(review.created_at).format("dddd, MMMM DD, YYYY hh:mm A")}</span></p>
                        </div>
                      </div>
                    </NavLink>
                  )
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Employee;