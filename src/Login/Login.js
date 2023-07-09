import React, { useState } from "react";
import axios from "axios";
import AuthUser from "../JWTAuthentication/AuthUser";
import { NavLink } from "react-router-dom";
import LoginUsernameTransfer from "../components/LoginUsernameTransfer";

export default function Login() {
    const { token, setToken } = AuthUser();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const { data, setData } = LoginUsernameTransfer();


    const submitForm = async () => {
        // api call to generate the tokens
        try {
            const response = await axios.post("http://localhost:8080/api/v1/auth/login", { username: username, password: password });
            if (response.status === 200) {
                alert("Logged in successfully!!" + username);
                setToken(response.data.accessToken);
                setData(username);

            }
        }
        catch (error) {
            if (error.response.status === 400 || error.response.status === 401) {
                alert('Please check username or password');
            }
            console.log('Message is ' + error.response.status);
        }
        return username;
    }


    const submitUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
    }

    const getUsername = () => {
        const value = submitUsername();
        return value;
    }



    return (
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Login </h1>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="username" className="form-control" placeholder="Enter Username"
                            onChange={submitUsername} value={username}
                            id="username" />
                        {/* <ListEmployeesComponent user={username}/> */}
                    </div>

                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                            id="password" />
                    </div>
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Login</button>
                    <NavLink
                        className="navbar-item"
                        activeclassname="is-active"
                        to="/register">
                        Register
                    </NavLink>
                </div>
            </div>

        </div>
    )
}