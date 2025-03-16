import React, { useState, useEffect } from 'react'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import '../css/ActorSwiper.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import { getMovieCast } from '../services/API.js'

function ActorSwiper({ movieId }) {
    const [cast, setCast] = useState([])

    useEffect(() => {
        const fetchMovieCast = async () => {
            try {
                const actorscast = await getMovieCast(movieId);
                setCast(actorscast);
            } catch (err) {
                console.log(err)
            }
        };
        fetchMovieCast();
    }, [movieId]);

    return (
        <div className='cast-swiper'>
            <Swiper
                className="main-slider-component"
                modules={[Navigation, Pagination, Scrollbar]}
                spaceBetween={10}
                slidesPerView={8}
                slidesPerGroup={7}
                pagination={false}
            >
                {cast.map((actor) => (
                    <SwiperSlide key={actor.id}>
                        <div className='movie-cast-actor-card'>
                            <img className='movie-actor-image' src={actor.profile_path ? `https://image.tmdb.org/t/p/original${actor.profile_path}` : 'https://dummyimage.com/200x300/919191.png&text=no-image'} alt="movie-actor-image" />
                        </div>
                        <div className='movie-cast-actor-name'>{actor.name}</div>
                        <div className='movie-cast-small-text'>as</div>
                        <div>{actor.character}</div>
                    </SwiperSlide>
                ))}
                <div className="swiper-scrollbar"></div>
            </Swiper>
        </div>
    )
}

export default ActorSwiper