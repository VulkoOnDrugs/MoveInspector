import React, {useState} from "react";
import {Swiper,SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import 'swiper/css/navigation'
import 'swiper/css'
import 'yet-another-react-lightbox/styles.css'
import Lightbox from "yet-another-react-lightbox";
import '../css/PeopleSwiper.css'
import {BsChevronCompactLeft,BsChevronCompactRight} from "react-icons/bs";



function PeopleSwiper({images}){
    const [isOpen,setIsOpen] = useState(false)
    const [currentImageIndex,setCurrentImageIndex] = useState(0)

    const handleImageClick = (index) => {
        setCurrentImageIndex(index)
        setIsOpen(true)
    }
    return(
        <div className='people-swiper-wrapper'>
            <div className="people-swiper-container">
                <BsChevronCompactLeft className='people-swiper-prev'/>
                <BsChevronCompactRight className='people-swiper-next'/>
                <Swiper className='people-swiper' modules={[Navigation]}
                 slidesPerView={8}
                  spaceBetween={16}
                   navigation={{
                    nextEl: '.people-swiper-next',
                    prevEl: '.people-swiper-prev',}}
                onClick={(swiper)=>{if (swiper.clickedIndex !== undefined){
                    handleImageClick(swiper.clickedIndex)
                }}}>
                    {images.map((image,index)=>(
                    <SwiperSlide key={index} className={'people-swiper-slide'}>
                        <img src={`https://image.tmdb.org/t/p/w185${image.file_path}`} alt={'People slide'}/>
                </SwiperSlide>
                ))}
                </Swiper>

                {isOpen &&(
                    <Lightbox open={isOpen}
                    slides={images.map(images =>({src:`https://image.tmdb.org/t/p/original/${image.file_path}`}
                    ))}

                    index={currentImageIndex}
                    close={()=>setIsOpen(false)}
                    onIndexChange={(index)=>setCurrentImageIndex(index)}/>
                )}
            </div>
        </div>
    )
}

export default PeopleSwiper