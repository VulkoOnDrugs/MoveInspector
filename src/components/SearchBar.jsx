import React from "react";
import '../css/SearchBar.css';
import { SiSearxng } from "react-icons/si";
import {useMovieContext} from "../context/MovieContext.jsx";
import {useNavigate} from "react-router-dom";

function SearchBar({closePopup}) {
    const {handleSearch} = useMovieContext()
    const navigate = useNavigate();
    const [query, setQuery] = React.useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) {
            return;
        }
        handleSearch(query);
        setQuery('')
        navigate('/')
        closePopup();
    }

    return(
        <div className="search-popup">
            <div className="search-popup-content">
                <button className="close-button" onClick={closePopup}>✖</button>
                <form className="search-form" onSubmit={onSubmit}>
                    <input type="text" placeholder="Search for movies..." className="search-input" value={query} onChange={(e)=> setQuery(e.target.value)}/>
                    <button type="submit" className="search-button"><SiSearxng /></button>
                </form>
                {query}
            </div>
        </div>
    )

}
 export default SearchBar;