import React from 'react'
import '../css/movieSwiper.css'
import MovieCard from './MovieCard';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { BsChevronCompactLeft,BsChevronCompactRight } from "react-icons/bs";

function MovieSwiper({
    movies = [],
    spaceBetween = 10,
    slidesPerView = 7,
    slidesPerGroup = 7,
}) {
  return (
    <div className='swiper-container-component'>
            <BsChevronCompactLeft className='main-prev-component'/>
            <Swiper
                className='main-slider-component'
                modules={[Navigation, Pagination, Scrollbar]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                slidesPerGroup={slidesPerGroup}
                pagination={false}
                navigation={{
                    prevEl: '.main-prev-component',
                    nextEl: '.main-next-component',
                }}

                scrollbar={{
                    el:'.swiper-scrollbar',
                    draggable:true,
                    dragSize: 'auto'
                    
                }}
            >
                {movies.map((movie) => (
                  <SwiperSlide key={movie.id}>
                    <MovieCard movie={movie}/>
                </SwiperSlide>  
                ))}
                <div className="swiper-scrollbar"></div>
            </Swiper>
            <BsChevronCompactRight className='main-next-component'/>
        </div>
  )
}

export default MovieSwiper