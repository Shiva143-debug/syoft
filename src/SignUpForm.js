
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageContainer from './ImageContainer';
import './App.css';

const SignUpForm = () => {

    const [formData, setFormData] = useState({ user_firstname: '', user_email: '', user_password: '', user_phone: '' });
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    const handleBlur = (e) => {
        const { name,value } = e.target;

        setTouchedFields({ ...touchedFields, [name]: true });
        validateForm();
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.user_firstname) errors.user_firstname = 'First name is required';
        if (!formData.user_email) {
            errors.user_email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
            errors.user_email = 'Email is invalid';
        }
        if (!formData.user_password) errors.user_password = 'Password is required';
        if (!formData.user_phone) errors.user_phone = 'Phone number is required';
        if(formData.user_phone.length > 10) errors.user_phone = 'Phone number must be 10 digits only';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const payload = {
                ...formData,
                user_lastname: 'doe',
                user_city: 'Hyderabad',
                user_zipcode: '500072'
            };
            try {
                const response = await axios.post('https://syoft.dev/Api/user_registeration/api/user_registeration', payload);
                if (response.data.msg === "Already Exists") {
                    navigate("/login")
                }
            } catch (error) {
                console.error('Error during registration:', error);
            }
        } else {
            alert("Enter all Required fields")
        }
    };

    const signinclick = () => {
        navigate("/login")
    };
    useEffect(() => {
        validateForm();
    }, [formData]);


    return (
        <div className="container">

            <ImageContainer />
            <div className='form-section'>
                <div className='form-container'>
                    <img src="https://res.cloudinary.com/dxgbxchqm/image/upload/v1722424699/Screenshot_2024-07-31_164744_ii2feo.png" className="logo" alt="logo"/>
                    <h1 className='sl-heading'>Sign Up</h1>
                    <p>Already have an account? <span onClick={signinclick}>Sign In</span></p>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>First name*</label>
                            <input type="text" name="user_firstname" placeholder="First Name" onChange={handleChange} onBlur={handleBlur}/>
                            {touchedFields.user_firstname && formErrors.user_firstname && <p className="error">{formErrors.user_firstname}</p>}
                            <label>Email address*</label>
                            <input type="email" name="user_email" placeholder="Email" onChange={handleChange} onBlur={handleBlur}/>
                            {touchedFields.user_email && formErrors.user_email && <p className="error">{formErrors.user_email}</p>}
                            <label>Password*</label>
                            <input type="password" name="user_password" placeholder="Password" onChange={handleChange} onBlur={handleBlur}/>
                            {touchedFields.user_password && formErrors.user_password && <p className="error">{formErrors.user_password}</p>}
                            <label>Phone*</label>
                            <input type="number" name="user_phone" placeholder="Phone" onChange={handleChange} onBlur={handleBlur}/>
                            {touchedFields.user_phone && formErrors.user_phone && <p className="error">{formErrors.user_phone}</p>}
                            <label>
                                <input type="checkbox" /> I agree to the <span>Terms of Service</span> and <span>privacy policy</span>
                            </label>
                            <button type="submit">Create your free account</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>


    );
};

export default SignUpForm;

