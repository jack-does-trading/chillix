import React, { useState } from 'react';
import logo from "../assets/images/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:3500/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, pwd }),
            });
            if (response.ok) {
                console.log('Signup successful');
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="signup">
            <div className="signupWrapper">
                <div className="form-container">
                    <div className="imgWrapper logo">
                        <Link to="/"><img src={logo} alt="logo" /></Link>
                    </div>
                    <form className="mt-3" onSubmit={handleSubmit}>
                        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="form-group">
                            <label htmlFor="user">Username</label>
                            <input type="text" id="user" className="form-control" placeholder="Enter username" required value={user} onChange={(e) => setUser(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password</label>
                            <input type="password" id="pwd" className="form-control" placeholder="Enter password" required value={pwd} onChange={(e) => setPwd(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-danger btn-block">Sign Up</button>
                        <p className="mt-3">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
