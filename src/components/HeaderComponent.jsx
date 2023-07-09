import React, { Component, useState } from 'react';
import LoginUsernameTransfer from './LoginUsernameTransfer';
import DateTime from '../misc/DateTime';
import ReactDomServer from 'react-dom/server';
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';


const HeaderComponent = () => {
    const { time, setTime } = useState("");
    const { getData } = LoginUsernameTransfer();

    const username = getData().replace(/(^"|"$)/g, '').toUpperCase();

    const getTime = () => {
        const times = DateTime();
        const newTime = ReactDomServer.renderToString(times);
        if (newTime.includes("AM")) {
            return "Good morning!"
        }
        else {
            return "Good Afternoon!"
        }
    }

    return (
        <nav class="navbar sticky-top navbar-dark bg-primary">

            <div class="container">
                <a class="navbar-brand" href="http://localhost:3000/list">Employee Management Application</a>
                <a>{getTime()} {username}</a>
                <Nav.Link as={Link} to={"/login"}>LogOut</Nav.Link>
            </div>
        </nav>
    )
}
export default HeaderComponent;
