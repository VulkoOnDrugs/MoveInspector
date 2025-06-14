import React, { useState } from 'react'
import '../css/MovieGallery.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function MovieGallery({backdropImages}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    const photos = backdropImages.map((image,index) =>({
        src: image.file_path ? `https://image.tmdb.org/t/p/w300${image.file_path}` : 'https://dummyimage.com/300x200/f2f2f2/0011ff.png&text=no-image',
        srcBig: image.file_path ? `https://image.tmdb.org/t/p/original${image.file_path}` : 'https://dummyimage.com/300x200/f2f2f2/0011ff.png&text=no-image',
        width: 4,
        height: 3,
        key: image.id || index,
        id: index,
    }))

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setIsOpen(true)
    };
  return (
    <div className='gallery-container'>
        <BsChevronCompactLeft className='gallery-button-prev'/>
        <Swiper spaceBetween={10}
        slidesPerView={5}
        modules={[Navigation,Pagination]}
        pagination = {{type: 'progressbar',}}
        
        navigation = {{
            prevEl:'.gallery-button-prev',
            nextEl:'.gallery-button-next',
        }}
        className='gallery-swiper'
        onClick={(swiper) => {
            if(swiper.clickedIndex !== undefined){
                handleImageClick(swiper.clickedIndex)
            }
        }}
        >
            {photos.map((photo,index)=>(
                <SwiperSlide key={photo.key}>
                    <img src={photo.src} alt={`slide ${index}`}
                    style={{cursor:'pointer'}}/>
                </SwiperSlide>
            ))}
        </Swiper>
        <BsChevronCompactRight className='gallery-button-next'/>
        {isOpen && (<Lightbox open = {isOpen} 
        slides={photos.map(photo =>({src: photo.srcBig}))}
         index={currentImageIndex}
        close={() => setIsOpen(false)}
        onIndexChange={(index) => setCurrentImageIndex(index)}
        />)}
    </div>
  )
}

export default MovieGallery