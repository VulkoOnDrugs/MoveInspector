import React from 'react'
import '../css/MovieCard.css'
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



function MovieCard({movie}) {
    const navigate = useNavigate();


    function handleCardClick(){
       navigate(`/movie/${movie.id}`)
    }

  return (
    <div className='movie-card' onClick={handleCardClick}>
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} alt={movie.title} />
            <div className="movie-overlay">
                <div className="favorite-btn">
                <FaHeart />
                </div>

                <div className="move-title">
                    <h3>{movie.title}</h3>
                    <h4>{movie.release_date}</h4>
                </div>
            </div>
        </div>
    
    
    </div>
  )
}

export default MovieCard