import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import { nowPlayingMovies,getPopularMovies, getUpcomingMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import MovieSwiper from '../components/MovieSwiper';
import SearchBar from '../components/SearchBar';
import {useMovieContext} from "../context/MovieContext.jsx";


function Home() {

  const {movies,loading,error} = useMovieContext()
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcoming,setUpcoming] = useState([]);


  useEffect(()=>{

    const fetchNowPlayingMovies = async () =>{
      try{
        const nowplayingmovies = await nowPlayingMovies();
        setNowPlaying(nowplayingmovies);

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

    const fetchUpcomingMovies = async () =>{
      try{
        const nowplayingmovies = await getUpcomingMovies();
        setUpcoming(nowplayingmovies);

      } catch(err) {
        console.log(err)
      }
    };

    fetchUpcomingMovies();
    fetchNowPlayingMovies();
    fetchPopularMovies();

  },[])

  return (
    <div className='home wrapper'>

      {movies.length > 0 && (
      <>
        <h2>Search Results</h2>
        <MovieSwiper movies={movies}/>
      </>)}

      {nowPlaying.length > 0 ? (
        <div className="now-playing">
          <h2>Now Playng</h2>

          <MovieSwiper movies={nowPlaying} slidesPerView={7} swiperId='nowplaying' />

        </div>
      ) : (
        <p>Loading ...</p>
      )}


      <h2>Popular Movies</h2>
      {popularMovies.length > 0 ? (
        <MovieSwiper movies={popularMovies} slidesPerView={8} swiperId='popular'/>
      ) : (
        <p>Loading ...</p>
      )}

      <h2>Upcoming Movies</h2>
      {upcoming.length > 0 ? (
        <MovieSwiper movies={upcoming} slidesPerView={8} swiperId='upcoming'/>
      ) : (
        <p>Loading ...</p>
      )}



    </div>
  )
}

export default Home