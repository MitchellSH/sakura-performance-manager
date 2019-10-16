import React, { Component } from 'react';
import Navigation from './Navigation';
import axios from "axios";
import moment from 'moment';
import {NavLink, Redirect} from "react-router-dom";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      token: "Bearer " + localStorage.getItem("jwt"),
      review: {},
      comments: [],
      redirect: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getReview(id) {
    axios.get('/api/reviews/' + id, {
      headers: {
        'Authorization': this.state.token
      }
    })
      .then(response => {
        this.setState({ review: response.data })
        this.getComments(response.data.id);
      })
      .catch(error => console.log('error', error));
  }

  getComments(reviewId) {
    axios.get('/api/reviews/' + reviewId + '/comments', {
      headers: {
        'Authorization': this.state.token
      }
    })
        .then(response => {
          this.setState({ comments: response.data })
        })
        .catch(error => console.log('error', error));
  }

  removeReview(id) {
    axios.delete('/api/reviews/' + id, {
      headers: {
        'Authorization': this.state.token
      }
    })
        .then(response => {
          this.setState({ redirect: true });
        })
        .catch(error => console.log('error', error));
  }

  handleSubmit (e) {
    e.preventDefault();

    const content = document.getElementById('content').value;
    const data = {
      "author": this.state.user.name,
      "content": content,
      "review_id": this.state.review.id,
    };

    axios.post('/api/comments', data, {
      headers: {
        'Authorization': this.state.token
      }
    })
        .then(response => {
          window.location.reload();
        })
        .catch(error => console.log('error', error));
  }

  componentDidMount() {
    this.getReview(this.props.match.params.id);
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={`/employee/${this.state.review.user_id}`}/>;
    }

    return (
      <>
        <Navigation/>
        <div className="container">
          <div className="grid">
            <div className="col-xs-12 col-md-8">
              <h1>{this.state.review.title}</h1>
              <h3>{this.state.review.performance}</h3>
              <h4 className="subheader">{moment(this.state.review.created_at).format("dddd, MMMM DD, YYYY hh:mm A")}</h4>
              <p>Submitted By <em>{this.state.review.submitted_by}</em></p>
            </div>
            <div className="col-xs-12 col-md-4">
              {this.state.user.admin ?
                  <>
                    <NavLink exact to={`/employee/${this.state.review.user_id}`}>
                      <button>Back</button>
                    </NavLink>
                    <button onClick={() => this.removeReview(this.state.review.id)}>Remove</button>
                  </>
                  :
                  <NavLink exact to={`/reviews`}>
                    <button>Back</button>
                  </NavLink>
              }
            </div>
            <div className="col-xs-12">
              <p>{this.state.review.description}</p>
            </div>
            <div className="col-xs-12">
              <h4>Comments</h4>
              {this.state.comments.map((comment) => {
                return (
                    <div key={comment.id} className="block grid">
                      <div className="col-xs-12 col-md-8">
                        <h4>{comment.author}</h4>
                        <p><span>{moment(comment.created_at).format("dddd, MMMM DD, YYYY hh:mm A")}</span></p>
                      </div>
                      <div className="col-xs-12">
                        <p>{comment.content}</p>
                      </div>
                    </div>
                )
              })}
              <form onSubmit={this.handleSubmit}>
                <textarea name="content" id="content" placeholder="Add Comment" maxLength="500" />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Review;