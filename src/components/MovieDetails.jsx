import React, { useEffect, useState } from 'react'
import '../css/MovieDetails.css'
import { getMovieCrew, getMovieDetails } from '../services/API.js'
import { useParams } from 'react-router-dom'
import ActorSwiper from './ActorSwiper.jsx';

function MovieDetails() {
  const {id} = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [crew, setCrew] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [story, setStory] = useState([]);
  const [screenPlay, setScreenPlay] = useState([]);




  useEffect(() => {
    const fetchMovieDetails = async() => {
      try {
        const details = await getMovieDetails(id);
        setMovie(details);

        const crewDetails = await getMovieCrew(id);
        setCrew(crewDetails);

        const directorsDetails = crewDetails.filter(member => member.job === "Director")
        setDirectors(directorsDetails);
        
        const storyDetails = crewDetails.filter(member => member.job === "Story")
        setStory(storyDetails);

        const screenPlayDetails = crewDetails.filter(member => member.job === "Screenplay")
        setScreenPlay(storyDetails);
      } catch(err) {
        setError(`Failed to load movie details: ${err}`);
        console.error(`Failed to load movie details: ${err}`);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id])

if (loading) return <div className="loading">
  <h2>Thousands of bytes are travelling towards you</h2>
</div>

if (error) return <div className="loading">
  <h2>The bytes couldn't reach you</h2>
</div>

  return (
    <div>
        <div className="movie-details">
          <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} className='movie-backdrop'/>
            {movie && (
              <>
                <div className="movie-details-img">
                  <img src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} alt="Movie poster" />
                </div>
                <div className="movie-details-info">
                  <h1>{movie.title + " "}
                    <span style={{
                      fontWeight:"300",
                      color: "black"
                    }}>
                      ({movie.release_date?.split("-")[0]})
                    </span>
                  </h1>
                  <h2>{movie.tagline}</h2>
                </div>
                <div className="movie-genres">
                  {movie.genres.map((genre, index) => (
                    <span key={genre.id} className='genre'>{genre.name}</span>
                  ))}
                </div>
                <div className="movie-overview">
                  <h3>Overview:</h3>
                  <p>{movie.overview}</p>
                </div>
                <div className="movie-details-list">
                  <div className="movie-details-small">
                    <p>User Rating: {Math.round(movie.vote_average*10)}%</p>
                  </div>
                  <div className="movie-details-small">
                    <p>Home Page:</p>
                    <a href={movie.homepage}>{movie.homepage}</a>
                  </div>
                  <div className="movie-details-small">
                    <p>Release Date: {movie.release_date}</p>
                  </div>
                  <div className="movie-details-small">
                    <p>Origin Country: {movie.origin_country}</p>
                  </div>
                  <div className="movie-details-small">
                    <p>Revenue: {movie.revenue ? movie.revenue.toLocaleString("en-US") + " USD" : "Unavailiable"}</p>
                  </div>
                  <div className="movie-details-small">
                    <p>Budget: {movie.budget ? movie.budget.toLocaleString("en-US") + " USD" : "Unavailiable"}</p>
                  </div>
                </div>
                <div className="movie-details-crew">
                  <div className="movie-details-small">
                    <p>Director(s):</p>
                    {directors.map((director, index) => (
                      <span key={director.id} className='white'>{director.name}{index < directors.length - 1 && ", "}</span>
                    ))}
                  </div>
                  <div className="movie-details-small">
                    <p>Actor(s):</p>
                    {screenPlay.map((actor, index) => (
                      <span key={actor.id} className='white'>{actor.name}{index < screenPlay.length - 1 && ", "}</span>
                    ))}
                  </div>
                  <div className="movie-details-small">
                    <p>Story Writer(s):</p>
                    {story.map((writer, index) => (
                      <span key={writer.id} className='white'>{writer.name}{index < story.length - 1 && ", "}</span>
                    ))}
                  </div>
                  <ActorSwiper movieId={id}/>
                </div>
              </>
            )}
        </div>
    </div>
  )
}

export default MovieDetails