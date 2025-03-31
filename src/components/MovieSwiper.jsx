import React from 'react';
import '../css/MovieSwiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from '../components/MovieCard';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

function MovieSwiper({ 
    movies = [],
    spaceBetween = 10,
    slidesPerView = 7,
    slidesPerGroup = 7,
    swiperId = 'default',
 }) {

    const  prevClass = `main-prev-component-${swiperId}`
    const  nextClass = `main-next-component-${swiperId}`

    return (
        <div className="swiper-container-component">
            <BsChevronCompactLeft className={prevClass} />
            <Swiper
                className="main-slider-component"
                modules={[Navigation, Pagination, Scrollbar]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                slidesPerGroup={slidesPerGroup}
                pagination={false}
                navigation={{
                    prevEl: `.${prevClass}`,
                    nextEl: `.${nextClass}`,
                }}

                scrollbar={{
                    el: '.swiper-scrollbar',
                    draggable: 'auto',
                    dragSize: 'auto',

                }}
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieCard movie={movie} />
                    </SwiperSlide>
                ))}
                <div className='swiper-scrollbar'></div>
            </Swiper>
            
            <BsChevronCompactRight className={nextClass} />
        </div>
    );
}

export default MovieSwiper;