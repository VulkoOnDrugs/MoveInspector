import React, { useEffect, useState, UseRef, useRef } from 'react'
import '../css/PeopleDetails.css'
import { useParams } from 'react-router-dom'
import { getPeopleDetails, getPeopleSocialDetails,getPeopleImages } from '../services/api'
import { FaInstagram, FaImdb, FaLink, FaYoutube, FaTiktok, FaSquareXTwitter, FaFacebook} from "react-icons/fa6";
import FormatedDate from './FormatedDate';
import PeopleSwiper from './PeopleSwiper';
import PeopleCredits from './PeopleCredits';

function PeopleDetails() {
    const {id} = useParams();
    const [gender,setGender] = useState('')
    const [PeopleDetails,setPeopleDetails] = useState([])
    const [loading,setLoading] = useState(true)
    const [age,setAge] = useState(null)
    const [peopleSocial,setPeopleSocial] = useState([])
    const [peopleImages,setPeopleImages] = useState([])
    const [bio,setBio] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)


    const textRef = useRef();


    function toggleExpand(){

        setIsExpanded(!isExpanded)
    }

    const calculateAge = (birthDate,deathDate = null) =>{
        const birth = new Date(birthDate);
        const death = deathDate ? new Date(deathDate) : new Date
        let age = death.getFullYear() - birth.getFullYear()
        const monthDiff = death.getMonth - birth.getMonth()
        const dayDiff = death .getDate() - birth.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)){
            age--;
        }
        return age;
    }

    useEffect(()=>{
        const fetchPeopleDetails = async () => {
            try{
                const personaldetails = await getPeopleDetails(id);
                setPeopleDetails(personaldetails)

                const genders = await getPeopleDetails(id)
                setGender(()=>{
                    switch(genders.gender){
                        case 0:
                            return'Not specified'
                        case 1:
                            return 'Female'    
                        case 2:
                            return "Male"
                        case 3:
                            return 'Non-binary'
                        default:
                            return 'Not set'           
                    }
                })

                const age = calculateAge(personaldetails.birthday,personaldetails.deathday)
                setAge(age)

                const bio = personaldetails.biography
                setBio(bio)

                const getpeoplesocialdetails = await getPeopleSocialDetails(id)
                setPeopleSocial(getpeoplesocialdetails)

                const peopleimages = await getPeopleImages(id)
                setPeopleImages(peopleimages)
            } catch(err) {console.error(err)}
            finally{
                setLoading(false)
            }
        }
        fetchPeopleDetails();
    },[id])
  return (
    <div className='people-details'>
        <div className="people-main-info">
            <div className="people-details-img">
                <img src={`https://image.tmdb.org/t/p/h632${PeopleDetails.profile_path}`} target='blank' />
                <div className="social">
                    {peopleSocial.instagram_id && (
                        <a href={`https://instagram.com/${peopleSocial.instagram_id}`} target='blank'><FaInstagram/></a>
                    )}
                    {peopleSocial.facebook_id && (
                        <a href={`https://facebook.com/${peopleSocial.facebook_id}`} target='blank'><FaFacebook/></a>
                    )}
                    {peopleSocial.tiktok_id && (
                        <a href={`https://tiktok.com/@${peopleSocial.tiktok_id}`} target='blank'><FaTiktok/></a>
                    )}
                    {peopleSocial.twitter_id && (
                        <a href={`https://x.com/${peopleSocial.twitter_id}`} target='blank'><FaSquareXTwitter/></a>
                    )}
                    {peopleSocial.youtube_id && (
                        <a href={`https://youtube.com/${peopleSocial.youtube_id}`} target='blank'><FaYoutube/></a>
                    )}
                    {peopleSocial.imdb_id && (
                        <a href={`https://imdb.com/name/${peopleSocial.imdb_id}`} target='blank'><FaImdb/></a>
                    )}
                    {PeopleDetails.homepage && (
                        <a href={peopleSocial.homepage} target='blank'><FaLink/></a>
                    )}
                </div>
            </div>
            <div className="people-personal-info">
                <h1 className='personal-details-name'>{PeopleDetails.name}</h1>
                {PeopleDetails.birthday && (
                    <div className="personal-details">
                        <h3>Birthday:</h3>
                        <div className="personal-details-detail">
                            <FormatedDate dataString={PeopleDetails.birthday}/>
                        </div>
                        <span><p>({age}) years old</p></span>
                    </div>
                )}

                {PeopleDetails.deathday && (
                    <div className="personal-details">
                        <h3>Birthday:</h3>
                        <div className="personal-details-detail">
                            <FormatedDate dataString={PeopleDetails.death}/>
                        </div>
                        <span><p>({age})</p></span>
                    </div>
                )}

                {PeopleDetails.place_of_birth && (
                    <div className="personal-details">
                        <h3>Place of birth:</h3>
                        <div className="personal-details-detail">
                            <span>{PeopleDetails.place_of_birth}</span>
                        </div>
                    </div>
                )}

                {PeopleDetails.gender && (
                    <div className="personal-details">
                        <h3>gender:</h3>
                        <div className="personal-details-detail">
                            <span>{gender}</span>
                        </div>
                    </div>
                )}

                {PeopleDetails.homepage && (
                    <div className="personal-details">
                        <h3>Home page:</h3>
                        <div className="personal-details-detail">
                            <span><a href={PeopleDetails.homepage}>{PeopleDetails.homepage}</a></span>
                        </div>
                    </div>
                )}

                {PeopleDetails.biography && (
                    <div className="personal-details-bio">
                        <h3>Biography:</h3>
                        <div className={`personal-details-detail-bio ${isExpanded ? 'expanded': ''}`}
                        ref={textRef}
                        style={{maxHeight:isExpanded ? textRef.current.scrollHeight : '48px'}}>
                            <span>{PeopleDetails.biography}</span>
                        </div>
                        <div className="read-more-btn">
                            <button onClick={()=>toggleExpand()}>{isExpanded ? 'Read Less...' : 'Read More...'}</button>
                        </div>
                    </div>
                )}

                <PeopleSwiper images={peopleImages}/>
                
            </div>
            
        </div>
        <PeopleCredits peopleId={id}/>
    </div>
  )
}

export default PeopleDetails