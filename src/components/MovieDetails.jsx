import React, { useEffect, useState } from 'react'
import '../css/MovieDetails.css'
import { useParams } from 'react-router-dom'
import { getMovieCrew, getMovieDetails, getMovieImages, getMovieVideos } from '../services/api';
import { use } from 'react';
import ActorSwiper from './ActorSwiper';
import MovieGallery from './movieGallery';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [directors,setDirectors] = useState([]);
  const [story, setStory] = useState([]);
  const [screenPlay, setScreenPlay] = useState([]);
  const [crew, setCrew] = useState([]);
  const [movieVideos,setMovieVideos] = useState([])
  const [backdropImages,setBackdropImages] = useState([])

  useEffect(()=>{
    
    const fetchMovieDetails = async() =>{
      try {
        const details = await getMovieDetails(id);
        setMovie(details);

        const crewDetails = await getMovieCrew(id);
        setCrew(crewDetails);
        

        const directorsDetails = crewDetails.filter(member => member.job === "Director" );
        setDirectors(directorsDetails)
        

        const storyDetails = crewDetails.filter(member => member.job === "Story" );
        setStory(storyDetails)

        const screenPlayDetails = crewDetails.filter(member => member.job === "Screenplay" );
        setScreenPlay(screenPlayDetails)
        
       
        
      } catch(err) {
        console.log(err);
        setError("Failed to load movie details ...");

      } finally {
        setLoading(false);
      }
    }
    const fetchMovieImages = async ()=>{
      try{
        const images = await getMovieImages(id);
        setBackdropImages(images)
      }catch(err){
      console.log(err);
      setError('Failed to load Movie images...')
     }
    }

    const fetchMovieVideos = async() =>{
      try{
        const videos = await getMovieVideos(id);
        const filterVideos = videos.filter((video) => video.type === 'Trailer'
         && video.site === 'YouTube' && video.official === true)
        setMovieVideos(filterVideos)
        console.log(videos, "test")
      }catch(err){
        console.error(err)
        setError('failed to load movie video')
      }finally{

      }
    }
    fetchMovieVideos();
    fetchMovieImages();
    fetchMovieDetails();
  },[id]);

  if(loading) return <div className='loading'>Loading...</div>;
  if(error) return <div className='error-mesage'>{error}</div>



  return (
    <div>
        <div className="movie-details"
        style={{
          position:'relative',
          color: 'white',
          backgroundImage: movie ? `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})` : 'none',
          // backgroundImage:`url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition:'center'
        }}
        
        >
          {movie && (
            <>
            <div className='movie-details-img'>
              <img src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} alt={movie.title}/>
            </div>
            <div className="movie-details-info">
              <h1>{movie.title}
                <span
                style={{fontWeight:'300', color:'gray'}}
                >&nbsp;({movie.release_date?.split("-")[0]})</span>
              </h1>

              <h2>{movie.tagline}</h2>
              <div className="movie-genres">
                <h3>Genres:</h3>
                <ul>
                  {movie.genres.map((genre)=>(
                    <li key={genre.id}>{genre.name}</li>

                  ))}
                </ul>
              </div>

              <div className="movie-overview">
                <h3>Overview</h3>
                <p>{movie.overview}</p>
              </div>

              <div className="movie-small-details">
                <p>Home Page:</p>
                <span><a href={movie.homepage}>{movie.homepage}</a></span>
              </div>

              <div className="movie-small-details">
                  <p>Release date:</p>
                  <span>{movie.release_date}</span>
              </div>

              <div className="movie-small-details">
                  <p>Origin Country:</p>
                  <span>{movie.origin_country}</span>
              </div>

              <div className="movie-small-details">
                  <p>User raiting:</p>
                  <span>{Math.floor(movie.vote_average * 10)} %</span>
              </div>

              <div className="movie-small-details">
                  <p>Budget:</p>
               
                  <span>{movie.budget ? movie.budget.toLocaleString('en-US') + ' USD' :'no info'}</span>
              </div>

              <div className="movie-small-details">
                  <p>Revenue:</p>
                  <span>{movie.revenue ? movie.revenue.toLocaleString('en-US') + ' USD' :'no info'}</span>
                  
              </div>

              <div className="movie-small-details">
                  <p>Director:</p>
                  {directors.map(director =>(
                    <span key={director.id}>{director.name}</span>
                  ))}
                  
              </div>

              <div className="movie-small-details">
                  <p>Story:</p>
                  {story.map((storyItem, index) =>(
                    <span key={storyItem.id}>{storyItem.name}{index < story.length - 1 && ','}</span>
                  ))}
                  
              </div>


            </div>
            </>
          )}
            
        </div>

        <div>
          <ActorSwiper movieId={id}/>
        </div>
        <div className="movie-videos">
        <h3><span className="pile">&nbsp;</span >
              Videos -<span style={{ color: "gray", fontWeight: "500", fontSize: "1.2rem" }}
              >&nbsp;{movieVideos.length}</span>
            </h3>
          <div className="movie-videos-contanier">
            
            {movieVideos.length > 0 ? (<>
            {movieVideos.map((video)=>(<iframe key={video.id} src={`https://www.youtube.com/embed/${video.key}`}
            title={video.name} 
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share' 
            referrerPolicy='srict-origin-when-cross-origin' allowFullScreen>

            </iframe>))}
            </>):
            (<p>No videos are available for this movie</p>)}
          </div>
        </div>

        <div className="movie-images">
              <MovieGallery backdropImages={backdropImages}/>
        </div>
    </div>
  )
}

export default MovieDetails