import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser() {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        return tokenString;
    }


    const [token, setToken] = useState();

    const saveToken = (token) => {
        sessionStorage.setItem('token', JSON.stringify(token));

        setToken(token);
        navigate('/list');
    }
    return {
        setToken: saveToken,
        token,
        getToken
    }
}