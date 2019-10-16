import React, { Component } from 'react';
import Navigation from '../Navigation';
import axios from "axios";
import {NavLink, Redirect} from "react-router-dom";

class EditEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: JSON.parse(localStorage.getItem('user')),
            token: "Bearer " + localStorage.getItem("jwt"),
            user: {},
            name: "",
            title: "",
            redirect: false
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getUser(userId) {
        axios.get('/api/users/' + userId, {
            headers: {
                'Authorization': this.state.token
            }
        })
            .then(response => {
                this.setState({ user: response.data });
                this.setState({ name: response.data.name });
                this.setState({ title: response.data.title });
            })
            .catch(error => console.log('error', error));
    }

    handleSubmit (e) {
        e.preventDefault();

        const data = {
            "user": {
                "name": this.state.name,
                "title": this.state.title
            }
        };

        axios.put('/api/users/' + this.state.user.id, data, {
            headers: {
                'Authorization': this.state.token
            }
        })
            .then(response => {
                this.setState({ redirect: true });
            })
            .catch(error => console.log('error', error));
    }

    onChange = (e) => this.setState({ [e.target.id]: e.target.value });

    componentDidMount() {
        this.getUser(this.props.match.params.id);
    }



    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to={`/employee/${this.state.user.id}`}/>;
        }

        return (
            <>
                <Navigation/>
                <div className="container">
                    <div className="grid">
                        <div className="col-xs-12 col-md-4">
                            <h2>Edit Employee</h2>
                            <h4 className="subheader">
                                <NavLink exact to={`/employee/${this.state.user.id}`}>{this.state.user.name}</NavLink>
                            </h4>
                        </div>
                        <div className="col-xs-12 col-md-8">
                            <form onSubmit={this.handleSubmit}>
                                <div className="grid">
                                    <div className="col-xs-12">
                                        <input name="name" id="name" placeholder="Full Name" type="text" value={this.state.name} onChange={this.onChange} />
                                    </div>
                                    <div className="col-xs-12">
                                        <input name="title" id="title" placeholder="Job Title" type="text" value={this.state.title} onChange={this.onChange} />
                                    </div>
                                    <div className="col-xs-12">
                                        <button type="submit">Save</button>
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

export default EditEmployee;