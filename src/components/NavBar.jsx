import React from "react";
import '../css/NavBar.css'
import logo from '../assets/logo.svg'
import { Link } from "react-router-dom";

function NavBar(){
    return(
        <nav className="navbar wrapper">
            <div className="navbar-brand">
            <Link to="/" className="navbar-link">
            <img src={logo} alt="logo" />
            </Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/favorites" className="navbar-link">Favorites</Link>
            </div>
        </nav>
    )
}

export default NavBar