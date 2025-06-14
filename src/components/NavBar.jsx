import React from 'react';
import '../css/NavBar.css';
import logo from '../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { SiSearxng } from "react-icons/si";
import SearchBar from "./SearchBar.jsx";
import {useMovieContext} from "../context/MovieContext.jsx";

function NavBar() {
    const {resetMovies} = useMovieContext()
    const navigate = useNavigate();
    const [isSearchVisible, setIsSearchVisible] = React.useState(false);
    const openSearchPopup = () => setIsSearchVisible(true)
    const closeSearchPopup = () => setIsSearchVisible(false);

    const handleHomeClick = (e) => {
        e.preventDefault();
        resetMovies();
        navigate('/');
    }
  return (
    <nav className='navbar wrapper'>
      <div className='navbar-brand'>
        <Link to="/" className='navbar-link' onClick={handleHomeClick}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className='navbar-links'>
        <Link to="/" className='navbar-link' onClick={handleHomeClick}>Home</Link>
        <Link to="/favorites" className='navbar-link'>Favorites</Link>
          <div className='navbar-link' onClick={openSearchPopup}>
              <SiSearxng style={{transform:'scale(1.3)'}}/>
          </div>
      </div>
        {isSearchVisible &&  <SearchBar closePopup={closeSearchPopup}/>}
    </nav>
  )
}

export default NavBar