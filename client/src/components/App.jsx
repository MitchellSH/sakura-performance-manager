import React, { Component } from 'react';
import Home from './Home';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Employee from './admin/Employee';
import AddNewEmployee from './admin/AddNewEmployee';
import EditEmployee from './admin/EditEmployee';
import ComposeReview from './admin/ComposeReview';
import ListEmployees from './admin/ListEmployees';
import ListReviews from './ListReviews';
import Review from './Review';
import Login from './Login';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("jwt")
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    JSON.parse(localStorage.getItem("user")).admin
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
);

const Main = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute exact path="/profile" component={Profile} />
    <PrivateRoute exact path="/profile/edit" component={EditProfile} />
    <PrivateRoute exact path="/reviews" component={ListReviews} />
    <PrivateRoute exact path="/review/:id" component={Review} />
    <AdminRoute exact path="/employees" component={ListEmployees} />
    <AdminRoute exact path="/employee/:id" component={Employee} />
    <AdminRoute exact path="/employees/new" component={AddNewEmployee} />
    <AdminRoute exact path="/employee/:id/edit" component={EditEmployee} />
    <AdminRoute exact path="/employee/:id/review" component={ComposeReview} />
    <Route exact path="/login" component={Login} />
  </Switch>
);

class App extends Component {
  render() {
    return (
      <Router>
        <Main />
      </Router>
    );
  }
}

export default App;