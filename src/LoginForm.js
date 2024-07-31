import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageContainer from './ImageContainer';
import './App.css';

const LoginForm = () => {

    const [loginFormErrors, setLoginFormErrors] = useState({});
    const [loginformData, setLoginFormData] = useState({ user_email: '', user_password: '' });
    const [touchedFields, setTouchedFields] = useState({});

    const navigate = useNavigate();
    const handleChangelogin = (e) => {
        const { name, value } = e.target;
        setLoginFormData({ ...loginformData, [name]: value });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouchedFields({ ...touchedFields, [name]: true });
        validateLoginForm();
    };

    const validateLoginForm = () => {
        const errors = {};
        if (!loginformData.user_email) {
            errors.user_email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(loginformData.user_email)) {
            errors.user_email = 'Email is invalid';
        }
        if (!loginformData.user_password) errors.user_password = 'Password is required';
        setLoginFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlesubmitlogin = async (e) => {
        e.preventDefault();
        if (validateLoginForm()) {
            try {
                const response = await axios.post('https://syoft.dev/Api/userlogin/api/userlogin', loginformData);
                if (response.data.status === true) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    navigate('/dashboard');
                } else {

                    alert("enter valid credentials");
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        } else {
            alert("Enter all Required fields")
        }
    };

    const signupclick = () => {
        navigate("/")
    };

    useEffect(() => {
        validateLoginForm();
    }, [loginformData]);


    return (
        <div className="container">
            <ImageContainer />
            <div className="form-section">
                <div className='form-container'>
                <img src="https://res.cloudinary.com/dxgbxchqm/image/upload/v1722424699/Screenshot_2024-07-31_164744_ii2feo.png" className="logo" alt="logo"/>
                    <h1 className='sl-heading'>Log In</h1>
                    <p>Don't have an account? <span onClick={signupclick}>Sign Up</span></p>
                    <form onSubmit={handlesubmitlogin}>
                        <label>Email address*</label>
                        <input type="email" name="user_email" placeholder="Email" onChange={handleChangelogin} onBlur={handleBlur} />
                        {touchedFields.user_email && loginFormErrors.user_email && <p className="error">{loginFormErrors.user_email}</p>}
                        <label>Password*</label>
                        <input type="password" name="user_password" placeholder="Password" onChange={handleChangelogin} onBlur={handleBlur} />
                        {touchedFields.user_password && loginFormErrors.user_password && <p className="error">{loginFormErrors.user_password}</p>}
                        <button type="submit">Log In</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default LoginForm;
