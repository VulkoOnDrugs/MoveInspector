import React, { act, useEffect, useState } from 'react'
import '../css/PeopleCredits.css'
import { getPeopleCredits } from '../services/api';
import { Navigate, useNavigate } from 'react-router-dom';

function PeopleCredits({peopleId}) {
    const id = peopleId;
    const [acting,setActing] = useState([])
    const [production,setProduction] = useState([])
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() =>{
        const fetchPeopleCredits = async () => {
            try{
                const PeopleCreditsDate = await getPeopleCredits(id);

                const sortedCast = (PeopleCreditsDate.cast || []).sort((a,b) =>{
                    const dataA = a.media_type === 'movie' ? a.release_date : a.first_air_date;
                    const dataB = b.media_type === 'movie' ? b.release_date : b.first_air_date;

                    const fallback = '9999-12-31'
                    const parsedDataA = new Date(dataA || fallback)
                    const parsedDataB = new Date(dataB || fallback)

                    return parsedDataB - parsedDataA;
                });
                setActing(sortedCast)

                const sortedCrew = (PeopleCreditsDate.crew || []).sort((a,b) =>{
                    const dataA = a.media_type === 'movie' ? a.release_date : a.first_air_date;
                    const dataB = b.media_type === 'movie' ? b.release_date : b.first_air_date;

                    const fallback = '9999-12-31'
                    const parsedDataA = new Date(dataA || fallback)
                    const parsedDataB = new Date(dataB || fallback)

                    return parsedDataB - parsedDataA;
                });
                setProduction(sortedCrew)
            } catch (err){
                console.error(err)
            } finally{
                setLoading(false)
            }
        }
        fetchPeopleCredits()
    },[id])

    function handleOnClick(movieId){
        	navigate(`/movie/${movieId}`)
    }
  return (
    <div className='people-credits'>
        <div className="people-credits-col">
            <div className="people-credits-title">
                {acting.length > 0 ?(
                    <h3>
                        <span className="pile">&nbsp;</span >
                        Acting -<span style={{ color: "gray", fontWeight: "500", fontSize: "1.2rem" }}
                        >&nbsp;{acting.length}</span>
                    </h3>
                ):(<></>)}
            </div>
            <ul className='acting-list'>
                {acting.map((act,index) =>(
                    <li key={index} className='acting-item' onClick={()=> handleOnClick(act.id)}>
                        <img src={act.poster_path ? `https://image.tmdb.org/t/p//w92/${act.poster_path}` :  'https://dummyimage.com/92x2:3/f2f2f2/0011ff.png&text=no-image'} 
                        alt={`${act.title || act.name} poster`} />

                        <div className="acting-movie-info">
                            <span className='movie-title'>
                                {act.media_type === 'movie' 
                                ? act.release_date 
                                    ? act.release_date.slice(0,4) + '-' 
                                        : 'Upcoming' 
                                    : acting.first_air_date 
                                        ? act.first_air_date.slice(0,4) + '-' 
                                        : 'Upcoming'
                                    }

                                {act.media_type === 'movie'
                                ? act.title || 'unknown Title'
                                : act.name || 'Unknown Name'}    
                            </span>
                            <span className='vote-average'>
                                <span className='star'>⭐</span>{act.vote_average ? act.vote_average.toFixed(1) + ' on TMDB': 'N/A'}
                            </span>
                            <span className='character'> as {act.character || 'Unknown'}
                                {act.media_type === 'tv '&& act.episode_count &&(
                                    <span className='episode-count'>
                                        {' '}
                                        ({act.episode_count} episode{act.episode_count !== 1 ? 's':''})
                                    </span>)}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

        <div className="people-credits-col">
            <div className="people-credits-title">
                {acting.length > 0 ?(
                    <h3>
                        <span className="pile">&nbsp;</span >
                        Crew -<span style={{ color: "gray", fontWeight: "500", fontSize: "1.2rem" }}
                        >&nbsp;{production.length}</span>
                    </h3>
                ):(<></>)}
            </div>
            <ul className='acting-list'>
                {production.map((item,index) =>(
                    <li key={index} className='acting-item' onClick={()=> handleOnClick(item.id)}>
                        <img src={item.poster_path ? `https://image.tmdb.org/t/p//w92/${item.poster_path}` :  'https://dummyimage.com/92x2:3/f2f2f2/0011ff.png&text=no-image'} 
                        alt={`${item.title || item.name} poster`} />

                        <div className="acting-movie-info">
                            <span className='movie-title'>
                                {item.media_type === 'movie' 
                                ? item.release_date 
                                    ? item.release_date.slice(0,4) + '-' 
                                        : 'Upcoming' 
                                    : acting.first_air_date 
                                        ? item.first_air_date.slice(0,4) + '-' 
                                        : 'Upcoming'
                                    }

                                {item.media_type === 'movie'
                                ? item.title || 'unknown Title'
                                : item.name || 'Unknown Name'}    
                            </span>
                            <span className='vote-average'>
                                <span className='star'>⭐</span>{item.vote_average ? item.vote_average.toFixed(1) + ' on TMDB': 'N/A'}
                            </span>
                            <span className='character'> as {item.job || 'Unknown job'}
                                {item.media_type === 'tv '&& item.episode_count &&(
                                    <span className='episode-count'>
                                        {' '}
                                        ({item.episode_count} episode{item.episode_count !== 1 ? 's':''})
                                    </span>)}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default PeopleCredits