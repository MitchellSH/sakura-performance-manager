import React, { Component } from 'react';
import Navigation from '../Navigation';
import axios from "axios";
import {NavLink, Redirect} from "react-router-dom";

class AddNewEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: JSON.parse(localStorage.getItem('user')),
            token: "Bearer " + localStorage.getItem("jwt"),
            redirect: false,
            emptyName: false,
            invalidEmail: false,
            invalidPassword: false
        };
        this.validateEmail = this.validateEmail.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    validateEmail(email) {
        var re = /\S+@\S+\.\S+/; // simple regex email check for simple emails
        return re.test(email);
    }

    validateForm (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const title = document.getElementById('title').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const password_confirmation = document.getElementById('password_confirmation').value;

        if(name === "") this.setState({ emptyName: true });
        else this.setState({ emptyName: false });

        if(password !== password_confirmation || password === "" || password_confirmation === "") this.setState({ invalidPassword: true });
        else this.setState({ invalidPassword: false });

        if(!this.validateEmail(email) || email === "") this.setState({ invalidEmail: true });
        else this.setState({ invalidEmail: false });

        if(!this.state.emptyName || !this.state.invalidEmail || !this.state.invalidPassword) this.submitForm(name, title, email, password, password_confirmation);
        else return false;

    }

    submitForm (name, title, email, password, password_confirmation) {

        const data = {
            "user": {
                "name": name,
                "title": title,
                "email": email,
                "password": password,
                "password_confirmation": password_confirmation
            }
        };

        console.log(data);

        axios.post('/api/user/new', data, {
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
            return <Redirect to={"/employees"}/>;
        }

        return (
            <>
                <Navigation/>
                <div className="container">
                    <div className="grid">
                        <div className="col-xs-12 col-md-4">
                            <h2>New Employee</h2>
                            <p>Please fill out the form to add a new Employee.</p>
                        </div>
                        <div className="col-xs-12 col-md-8">
                            <form onSubmit={this.validateForm}>
                                <div className="grid">
                                    <div className="col-xs-12">
                                        <input className={this.state.emptyName ? "invalid" : ""} name="name" id="name" placeholder="Full Name" type="text" />
                                    </div>
                                    <div className="col-xs-12">
                                        <input name="title" id="title" placeholder="Job Title" type="text" />
                                    </div>
                                    <div className="col-xs-12">
                                        <input className={this.state.invalidEmail ? "invalid" : ""} name="email" id="email" placeholder="Email" type="text" />
                                    </div>
                                    <div className="col-xs-12 col-md-6">
                                        <input className={this.state.invalidPassword ? "invalid" : ""} type="text" name="password" id="password" placeholder="Password" />
                                    </div>
                                    <div className="col-xs-12 col-md-6">
                                        <input className={this.state.invalidPassword ? "invalid" : ""} type="text" name="password_confirmation" id="password_confirmation" placeholder="Confirm Password" />
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

export default AddNewEmployee;