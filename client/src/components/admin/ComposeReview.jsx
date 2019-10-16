import React, { Component } from 'react';
import Navigation from '../Navigation';
import axios from "axios";
import {NavLink, Redirect} from "react-router-dom";

class ComposeReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: JSON.parse(localStorage.getItem('user')),
      token: "Bearer " + localStorage.getItem("jwt"),
      user: {},
      redirect: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/users/' + this.props.match.params.id, {
      headers: {
        'Authorization': this.state.token
      }
    })
      .then(response => {
        console.log(response);
        this.setState({ user: response.data });
      })
      .catch(error => console.log('error', error));
  }

  handleSubmit (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const performance = document.getElementById('performance').value;
    const description = document.getElementById('description').value;
    const data = {
      "title": title,
      "performance": performance,
      "description": description,
      "user_id": this.state.user.id,
      "submitted_by": this.state.currentUser.name
    };

    axios.post('/api/reviews', data, {
      headers: {
        'Authorization': this.state.token
      }
    })
      .then(response => {
        this.setState({ redirect: true });
      })
      .catch(error => console.log('error', error));
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={"/employee/" + this.state.user.id}/>;
    }

    return (
      <>
        <Navigation/>
        <div className="container">
          <div className="grid">
            <div className="col-xs-12 col-md-4">
              <h2>Performance Review</h2>
              <h4 className="subheader">
                <NavLink exact to={`/employee/${this.state.user.id}`}>{this.state.user.name}</NavLink>
              </h4>
            </div>
            <div className="col-xs-12 col-md-8">
              <form onSubmit={this.handleSubmit}>
                <div className="grid">
                  <div className="col-xs-12 col-md-6">
                    <input name="title" id="title" placeholder="Title" type="text" />
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <select name="performance" id="performance" placeholder="Performance">
                      <option value="">Select Performance Grade</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Awesome">Awesome</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>
                  <div className="col-xs-12">
                    <textarea name="description" id="description" placeholder="Description" maxLength="500" />
                  </div>
                  <div className="col-xs-12">
                    <button type="submit">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ComposeReview;