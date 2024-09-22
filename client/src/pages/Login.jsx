import React, { useState, useContext } from 'react';
import logo from "../assets/images/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Narcos from "../assets/images/narcos.jpg"
import { AuthContext } from '../context/AuthContext'; // We'll create this context

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext); // Use the AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:3500/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: username, pwd: password }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                localStorage.setItem('accessToken', data.accessToken);
                setAuth({ username, accessToken: data.accessToken }); // Update auth state
                navigate('/'); // Redirect to home page after successful login
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="form col-md-4">
                    <div className="imgWrapper logo ml-3 w-100">
                        <Link to="/"><img src={logo} alt="logo" /></Link>
                    </div>
                    <form className="mt-5" onSubmit={handleSubmit}>
                        <h2 style={{textAlign: "center"}}>Login</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                className="form-control w-90" 
                                placeholder="Enter username" 
                                required 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                className="form-control" 
                                placeholder="Enter password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-danger btn-block">Login</button>
                        <p className="mt-3">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </p>
                    </form>
                </div>
                <div className="login-slider col-md-8">
                    <Carousel fade>
                        <Carousel.Item interval={4000}>
                            <img
                                className="d-block w-100"
                                src="https://wallpaper.forfun.com/fetch/a2/a2d5aa167aed65ba6e6a735aaa4971a3.jpeg"
                                alt="Better Call Saul"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={4000}>
                            <img
                                className="d-block w-100"
                                src="https://wallpapercave.com/wp/wp11908305.jpg"
                                alt="Suits"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={4000}>
                            <img
                                className="d-block w-100"
                                src={Narcos}
                                alt="Narcos"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={4000}>
                            <img
                                className="d-block w-100"
                                src="https://4kwallpapers.com/images/wallpapers/the-boys-season-4-1920x1080-17287.jpg"
                                alt="The Boys"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default Login;