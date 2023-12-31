import React, { useEffect, useState } from 'react'
import request from '../Requests'
import axios from 'axios'
const Main = () => {
    const [Movies, setMovies] = useState([])
    const Movie = Movies[Math.floor(Math.random() * Movies.length)]
    useEffect(() => {
        axios.get(request.requestPopular).then((res)=>{
            setMovies(res.data.results)
            
        })
    }, [])
    const truncateString = (str, num) => {
        if(str?.length > num){
            return str.slice(0, num) + '...'
        }else{
            return str
        }
    }
  return (
    <div className='w-full h-screen text-white'>
        <div className="w-full h-full">
            <div className="w-full h-screen absolute bg-gradient-to-r from-black"></div>
            <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${Movie?.backdrop_path}`} alt="" />
            <div className='absolute w-full top-[30%] p-4 md:p-8'>
                <h1 className='text-3xl md:text-5xl font-bold'>{Movie?.title}</h1>
                <div className="my-4">
                    <button className='border bg-gray-300 text-black py-2 px-5 border-gray-300'>Play</button>
                    <button className='border text-white py-2 px-5 border-gray-300 ml-4'>Watch Later</button>
                </div>
                <p className='text-gray-400 text-sm'>Released: {Movie?.release_date}</p>
                <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncateString(Movie?.overview, 150)}</p>
            </div>
        </div>
    </div>
  )
}

export default Main