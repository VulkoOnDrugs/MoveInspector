import React from "react";
import '../css/SearchBar.css';
import { SiSearxng } from "react-icons/si";

function SearchBar(){
    const [query, setQuery] = React.useState('');
    return(
        <div className="search-popup">
            <div className="search-popup-context">
                <button className="close-button">✖</button>
                <form className="search-form">
                    <input type="text" placeholder="Search for movies..." className="search-input" value={query} onChange={(e)=> setQuery(e.target.value)}/>
                    <button type="submit" className="search-button"><SiSearxng /></button>
                </form>
                {query}
            </div>
        </div>
    )

}
 export default SearchBar;