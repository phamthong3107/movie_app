import React, { useContext, useState } from 'react'
import { MovieContext } from '../context/MovieContext'
import { Link } from 'react-router-dom'

const Movie = ({item}) => {
    const { setidMovie } = useContext(MovieContext)
    const handleMovie = (id) => {
        setidMovie(id)
    }
  return (
    <div className='w-[180px] sm:w-[200px] md:w-[240px] lg:w-[450px] inline-block cursor-pointer relative p-2 group'>
        <Link to={`/detail/${item?.id}`}>
          <img onClick={() => handleMovie(item?.id)} className='transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-150 w-full h-full' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
        </Link>
        <div className="absolute top-0 opacity-0 transition duration-200 z-10 invisible sm:visible delay-150 w-full scale-0 
        group-hover:scale-110 group-hover:-trasnlate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
            <img className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-full' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
            <div className="absolute bg-gradient-to-r from-black top-0 w-full h-full border-l-4 border-red-600"></div>
            <div className="absolute top-[20%] left-4">
                <Link to={`/detail/${item?.id}`}>
                    <h2 onClick={() => handleMovie(item?.id)} className='font-bold text-white text-2xl'>{item?.title}</h2>
                </Link>
                <div className='text-gray-400 my-3'>
                    <p>Release: {item?.release_date}</p>
                    <p>Original Language: {item?.original_language}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Movie