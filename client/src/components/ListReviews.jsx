import React, { Component } from 'react';
import Navigation from './Navigation';
import axios from "axios";
import {NavLink} from "react-router-dom";
import moment from "moment";

class ListReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      reviews: []
    };
  }

  getReviews(user_id) {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios.get('/api/users/' + user_id + '/reviews', {
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        this.setState({ reviews: [...this.state.reviews, ...response.data ] })
      })
      .catch(error => console.log('error', error));
  }

  componentDidMount() {
    this.getReviews(this.state.user.id);
  }

  render() {
    return (
      <>
        <Navigation/>
        <div className="container">
          <div className="grid">
            <div className="col-xs-12 col-md-4">
              <h2>My Reviews</h2>
              <p>Reviews are submitted by your supervisor.</p>
            </div>
            <div className="col-xs-12 col-md-8">
              { this.state.reviews.map((review) => {
                return (
                  <NavLink exact to={`/review/${review.id}`} key={review.id}>
                    <div className="block grid">
                      <div className="col-xs-12">
                        <h4>{review.title}</h4>
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

export default ListReviews;