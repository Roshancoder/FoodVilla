import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../logo.png';

const Title = () => (
    <a href="/"><img className='logo' src={logo} alt="logo" /></a>
);

const Header = () => {
    const location = useLocation(); 
    const token = localStorage.getItem('token');

    return (
        <div className="header">
            <Title />
            <div className="nav-list">
                <ul className='ul'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    {!token || location.pathname === '/login' ? (
                        <li><Link to="/login">Login</Link></li>
                    ) : (
                        <li><Link to="/profile">Profile</Link></li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;
