import React, { useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import { MovieContext } from '../context/MovieContext'
import { key } from '../Requests'
import axios from 'axios'
import Footer from '../components/Footer'

const Detail = () => {
    const {idMovie} = useContext(MovieContext)
    const requestMovie = `https://api.themoviedb.org/3/movie/${idMovie}?api_key=${key}&append_to_response=videos`
    const [Movie, setMovie] = useState([])
    const [Genres, setGenres] = useState([])
    const [SrcVideo, setSrcVideo] = useState([])
    useEffect (() => {
        axios.get(requestMovie).then((res) => {
          setMovie(res.data)
          setGenres(res.data.genres)
          setSrcVideo(res.data.videos.results[0].key)
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
    const truncateString = (str, num) => {
        if(str?.length > num){
            return str.slice(0, num) + '...'
        }else{
            return str
        }
    }
  return (
    <>
    <div className='relative'>
        <div className='w-full h-[550px] text-white'>
            <div className="w-full h-full">
                <div className="w-full h-[550px] absolute bg-black/70"></div>
                <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${Movie.backdrop_path}`} alt="" />
                <div className='absolute w-full top-[5%] p-4 md:p-8 flex'>
                    <img className='w-[300px] h-[450px] object-cover mx-[50px] hidden sm:block' src={`https://image.tmdb.org/t/p/original/${Movie.poster_path}`} alt="" />
                    <div className='m-5'>
                        <h1 className='text-3xl md:text-5xl font-bold'>{Movie.title}</h1>
                        <div className="my-5">
                            <button onClick={videoPlay} className='border text-white py-2 px-5 border-gray-300 ml-4'>View trailer</button>
                        </div>
                        <p className='text-gray-400 text-base'>Category: 
                        <span className='text-white text-base font-normal'>{Genres.map((item) => {
                            return " - " + item.name
                        })}
                        </span>
                        </p>
                        <p className='text-gray-400 text-base'>Released: <span className='text-white'>{Movie.release_date}</span></p>
                        <p className='text-gray-400 text-base'>Original Language: <span className='text-white'>{Movie.original_language}</span></p>
                        <p className='text-gray-400 text-base'>Rate: <span className='text-green-700 font-bold'>{Movie.vote_average}</span></p>
                        <p className='text-gray-400 text-base'>Runtime: <span className='text-white'>{Movie.runtime} minutes</span></p>
                        <p className='text-gray-400 text-base hidden lg:block'>Status: <span className='text-white'>{Movie.status}</span></p>
                        <h2 className='text-white font-bold text-xl'>Overview:</h2>
                        <p className='w-full md:max-w-[80%] lg:max-w-[90%] xl:max-w-[50%] text-gray-200'>{truncateString(Movie.overview,150)}</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        <div onClick={hideVideo} id='video-player' className='hidden absolute top-0 left-0 w-full h-full bg-black/70'>
            <div className='absolute top-[20%] left-[20%] lg:w-[1000px] lg:h-[500px] sm:w-[300px]'>
                <ReactPlayer controls={true} width={"100%"} height={"100%"} url={`https://www.youtube.com/watch?v=${SrcVideo}`} />
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Detail