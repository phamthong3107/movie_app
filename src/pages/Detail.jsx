import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import {BsFillPlayFill,BsPlus, BsCheck} from 'react-icons/bs'
import { key } from '../Requests'
import axios from 'axios'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {db} from '../Firebase'
import {arrayUnion, doc, updateDoc} from 'firebase/firestore' 
import { UserAuth } from '../context/AuthContext'
import { useParams } from 'react-router-dom'


const Detail = () => {
    const {detailID} = useParams()
    const requestMovie = `https://api.themoviedb.org/3/movie/${detailID}?api_key=${key}&append_to_response=videos`
    const [Movie, setMovie] = useState([])
    const [Genres, setGenres] = useState([])
    const [SrcVideo, setSrcVideo] = useState([])
    const [vote, setVote] = useState(0)
    const {user} = UserAuth()
    const movieID = doc(db, 'user', `${user?.email}`)
    const [Addlist, setAddlist] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect (() => {
        axios.get(requestMovie).then((res) => {
          setMovie(res.data)
          setGenres(res.data.genres)
          setSrcVideo(res.data.videos.results[0].key)
          setVote(res.data.vote_average.toFixed(1))
        })
    }, [requestMovie])
    const videoPlay = () => {
        var videoPlayer = document.getElementById("video-player")
        videoPlayer.style.display = "block"
    }
    const hideVideo = () => {
        var videoPlayer = document.getElementById("video-player")
        videoPlayer.style.display = "none"
    }
    function display(a){
        var hours = Math.trunc(a/60);
        var minutes = a % 60;
        return hours +"h "+ minutes +"m";
    }
    const saveShow = async () => {
        if(user?.email) {
            setAddlist(!Addlist)
            setSaved(true)
            await updateDoc(movieID, {
                savedShows: arrayUnion({
                    id: Movie.id,
                    title: Movie.title,
                    img: Movie.backdrop_path,
                    release_date: Movie.release_date
                })
            })
        }else {
            alert('Please log in to save a movie')
        }
    }
  return (
    <>
        <div className='w-full h-screen text-white'>
            <div className="w-full h-full">
                <div className="w-full h-screen absolute bg-black/70"></div>
                <img className='w-full h-full top-0 left-0 object-cover' src={`https://image.tmdb.org/t/p/original/${Movie.backdrop_path}`} alt="" />
                {/* <div className='absolute w-full top-[5%] p-4 md:p-8 grid lg:grid-cols-2 sm:col-span-1'>
                    <img className='w-[300px] h-[450px] ms-auto object-cover justify-center col-span-1 sm:block' src={`https://image.tmdb.org/t/p/original/${Movie.poster_path}`} alt="" />
                    <div className='m-5 col-span-1 sm:relative'>
                        <h1 className='text-3xl md:text-5xl font-bold'>{Movie.title}</h1>
                        <div className="my-5 flex">
                            <div className='w-[100px]'>
                                <CircularProgressbar className='w-[100px] h-[100px]'
                                value={vote}
                                maxValue={10}
                                text={vote}
                                styles={buildStyles({
                                    backgroundColor: "#fff",
                                    pathColor:
                                    Movie.vote_average < 5 ? "red" : Movie.vote_average < 7 ? "orange" : "green",
                                })}
                                />
                            </div>
                            <div className='flex items-center'>
                                <button onClick={videoPlay} className='border text-white py-2 px-5 border-gray-300 ml-4'>View trailer</button>
                            </div>
                        </div>
                        <p className='text-gray-400 text-base'>Category: 
                        <span className='text-white text-base font-normal'>{Genres.map((item) => {
                            return " - " + item.name
                        })}
                        </span>
                        </p>
                        <p className='text-gray-400 text-base'>Released: <span className='text-white'>{Movie.release_date}</span></p>
                        <p className='text-gray-400 text-base'>Original Language: <span className='text-white'>{Movie.original_language}</span></p>
                        <p className='text-gray-400 text-base'>Runtime: <span className='text-white'>{Movie.runtime} minutes</span></p>
                        <p className='text-gray-400 text-base hidden lg:block'>Status: <span className='text-white'>{Movie.status}</span></p>
                        <h2 className='text-white font-bold text-xl'>Overview:</h2>
                        <p className='w-full md:max-w-[80%] lg:max-w-[90%] xl:max-w-[50%] text-gray-200'>{truncateString(Movie.overview,150)}</p>
                    </div>
                </div> */}
            </div>
            <div className="absolute w-full lg:left-0 grid grid-cols-1 lg:gap-10 lg:grid-cols-2 top-[10%] lg:top-[20%]">
                <div className='w-full flex lg:justify-end justify-center'>
                    <img src={`https://image.tmdb.org/t/p/original/${Movie.poster_path}`} className='object-cover lg:w-[300px] lg:h-[450px] w-[200px] h-[300px]' alt={Movie.poster_path}/>
                </div>
                <div className='flex-row px-5'>
                    <h2 className='text-3xl font-bold '>{Movie.title}</h2>
                    <p className='text-gray-400 text-base py-2'>Category: 
                        <span className='text-white text-base font-normal'>{Genres.map((item) => {
                            return " - " + item.name
                        })}
                        </span>
                    </p>
                    <div className='flex'>
                        <div className='lg:w-[80px] w-[50px]'>
                            <CircularProgressbar className='h-[100px]'
                            value={vote}
                            maxValue={10}
                            text={vote}
                            styles={buildStyles({
                                backgroundColor: "#fff",
                                pathColor:
                                Movie.vote_average < 5 ? "red" : Movie.vote_average < 7 ? "orange" : "green",
                            })}
                            />
                        </div>
                        <div className='flex items-center'>
                            <button onClick={videoPlay} className='border rounded-full lg:w-[80px] lg:h-[80px] w-[50px] h-[50px] text-white lg:px-4 px-2 border-gray-300 ml-4'><BsFillPlayFill className='text-[30px] lg:text-[50px]'/></button>
                        </div>
                        <div onClick={saveShow} className='flex items-center'>
                    {Addlist ? (<button className='rounded-full border mx-5 bg-white text-black lg:w-[80px] lg:h-[80px] w-[50px] h-[50px] lg:px-3 px-2'><BsCheck className='text-[30px] lg:text-[50px]'/></button>) : (<button className='rounded-full border lg:px-3 px-2 text-white mx-5 hover:bg-white lg:w-[80px] lg:h-[80px] w-[50px] h-[50px] hover:text-black'><BsPlus className='text-[30px] lg:text-[50px]'/></button>) }
                    </div>
                    </div>
                    <div className='flex text-gray-400'>
                        <div>
                            <span className='font-bold text-white'>Status: </span>{Movie.status}
                        </div>
                        <div className='px-4'>
                            <span className='font-bold text-white'>Release Date: </span>{Movie.release_date}
                        </div>
                        <div>
                            <span className='font-bold text-white'>Run time: </span>{display(Movie.runtime)}
                        </div>
                    </div>
                    <p className='lg:text-2xl py-2 w-[300px]'>Overview: <br />
                        <span className='text-gray-400 lg:text-base text-[12px]'>{Movie.overview}</span>
                    </p>
                </div>
            </div>
        </div>
        
        <div onClick={hideVideo} id='video-player' className='hidden absolute top-0 left-0 w-full h-full bg-black/70'>
            <div className='absolute top-[20%] left-[20%] lg:w-[1000px] lg:h-[500px] sm:w-[300px]'>
                <ReactPlayer controls={true} width={"100%"} height={"100%"} url={`https://www.youtube.com/watch?v=${SrcVideo}`} />
            </div>
        </div>
    </>
  )
}

export default Detail