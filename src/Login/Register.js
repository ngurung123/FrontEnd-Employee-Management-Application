import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const submitForm = async () => {
        //api call
        await axios.post('http://localhost:8080/api/v1/auth/register', { username: username, password: password }).then((res) => {
            if (res.status === 200) {
                alert('Username is successfully added!')
                navigate('/login')
            }

        })
            .catch((error) => {
                if (error.response.status === 400) {
                    alert('Username is already taken!')
                }
            });

    }

    return (
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Register </h1>
                    <div className="form-group mt-3">
                        <label>Username:</label>
                        <input type="username" className="form-control" placeholder="Enter username"
                            onChange={e => setUsername(e.target.value)}
                            id="username" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                            id="pwd" />
                    </div>
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Register</button>
                </div>
            </div>
        </div>
    )
}