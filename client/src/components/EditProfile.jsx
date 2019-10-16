import React, { Component } from 'react';
import Navigation from './Navigation';
import axios from "axios";
import {NavLink, Redirect} from "react-router-dom";

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: JSON.parse(localStorage.getItem('user')),
            token: "Bearer " + localStorage.getItem("jwt"),
            user: {},
            password: "",
            password_confirmation: "",
            redirect: false
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault();

        let data = {
            "user": {}
        };

        if(this.state.password !== "" && this.state.password_confirmation !== "") {
            data["user"]["password"] = this.state.password;
            data["user"]["password_confirmation"] = this.state.password_confirmation;

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
    }

    onChange = (e) => this.setState({ [e.target.id]: e.target.value });

    componentDidMount() {
        axios.get('/api/users/' + this.state.currentUser.id, {
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



    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to={`/profile`}/>;
        }

        return (
            <>
                <Navigation/>
                <div className="container">
                    <div className="grid">
                        <div className="col-xs-12 col-md-8">
                            <h1>Change Password</h1>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <NavLink exact to={`/profile`}>
                                <button>Back</button>
                            </NavLink>
                        </div>
                        <div className="col-xs-12">
                            <form onSubmit={this.handleSubmit}>
                                <div className="grid">
                                    <div className="col-xs-12 col-md-6">
                                        <input type="text" name="password" id="password" placeholder="New Password" onChange={this.onChange} />
                                    </div>
                                    <div className="col-xs-12 col-md-6">
                                        <input type="text" name="password_confirmation" id="password_confirmation" placeholder="Confirm New Password" onChange={this.onChange} />
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

export default EditProfile;