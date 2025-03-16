import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import { NowPlayingMovies,getPopularMovies,getUpcomingMovies } from '../services/API';
import MovieSwiper from '../components/MovieSwiper';

function Home() {

  const [nowPlaying, setNowPlaying] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcoming,setUpcoming] = useState([])


  useEffect(()=>{

    const fetchNowPlayingMovies = async () =>{
      try{
        const nowplayingmovies = await NowPlayingMovies();
        setNowPlaying(nowplayingmovies);

      } catch(err) {
        console.log(err)
      }
    };

    const fetchUpcomingMovies = async () =>{
      try{
        const UpcomingMovies = await getUpcomingMovies();
        setUpcoming(UpcomingMovies);

      } catch(err) {
        console.log(err)
      }
    };

    const fetchPopularMovies = async () =>{
      try{
        const popular = await getPopularMovies();
        setPopularMovies(popular);
      } catch(err) {
        console.log(err)
      }
    };

    fetchUpcomingMovies();
    fetchNowPlayingMovies();
    fetchPopularMovies();

  },[])

  return (
  
    <>
    <div className='home-wrapper'>
      <div className="now-playing">
        <h2>Now Playing</h2>
        <div className="now-playing-list">
          {nowPlaying.length > 0 ? (
            <MovieSwiper movies={nowPlaying} slidesPerView={7} />
          ) : (
            <p>Loading ...</p>
          )}
        </div>
      </div>

      <h2>Upcoming movies</h2>
      <div className="upcoming-movie-list">
        {upcoming.length > 0 ? (
          <MovieSwiper movies={upcoming} slidesPerView={8} />
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </div><div className="popular-movies">
        <h2>Popular Movies</h2>
        <div className="popular-movies-list">
          {popularMovies.length > 0 ? (
            <MovieSwiper movies={popularMovies} slidesPerView={7} />
          ) : (
            <p>Loading ...</p>
          )}
        </div>
      </div>
      </>
      

      
  )
}

export default Home