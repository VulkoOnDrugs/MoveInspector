import React, { useEffect, useState } from 'react'
import '../css/ActorSwiper.css'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { getMovieCast } from '../services/api'
import { useNavigate } from 'react-router-dom';


function ActorSwiper({ movieId }) {
  const navigate = useNavigate();
  const [cast, setCast] = useState([]);


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

  }, [])

  function handleActorClick(actor_id){
    navigate(`/person/${actor_id}`)
  }

  return (

    <div className="actor-container wrapper">
      <div>
        {cast.length > 0 ? (
          <>
            <h3><span className="pile">&nbsp;</span >
              Cast -<span style={{ color: "gray", fontWeight: "500", fontSize: "1.2rem" }}
              >&nbsp;{cast.length}</span>
            </h3>

            <div className='cast-swiper'>
              <BsChevronCompactLeft className='main-prev-actor' />
              <Swiper
                className="main-slider-component"
                modules={[Navigation, Pagination, Scrollbar]}
                spaceBetween={10}
                slidesPerView={8}
                slidesPerGroup={7}
                pagination={false}
                navigation={{
                  prevEl: '.main-prev-actor',
                  nextEl: '.main-next-actor',
                }}

              // scrollbar={{
              //     el: '.swiper-scrollbar',
              //     draggable: 'auto',
              //     dragSize: 'auto',
              // }}
              >
                {cast.map((actor) => (
                  <SwiperSlide key={actor.id}>
                    <div className="movie-cast-actor-card" onClick={()=>handleActorClick(actor.id)}>
                      <img className='movie-cast-actor-image'
                        src={actor.profile_path ? `https://image.tmdb.org/t/p/original${actor.profile_path}` : 'https://dummyimage.com/200x300/919191.png&text=no-image'}
                      />
                      <div className='movie-cast-actor-name'>{actor.name}</div>
                      <div className='movie-cast-small-text'>as</div>
                      <div className='movie-cast-small-text'>{actor.character}</div>
                    </div>
                  </SwiperSlide>
                ))}
                {/* <div className='swiper-scrollbar'></div> */}
              </Swiper>
              <BsChevronCompactRight className='main-next-actor' />
            </div>

          </>

        ) : (<>Няма даннни</>)}
      </div>

    </div>


  )
}

export default ActorSwiper