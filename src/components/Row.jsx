import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import Movie from './Movie'

const Row = ({title, fetchURL, rowID}) => {
    const [Movies,setMovies] = useState([])
    useEffect (() => {
      axios.get(fetchURL).then((res) => {
        setMovies(res.data.results)
      })
    }, [fetchURL])
    console.log(Movies)
    const slideLeft = () =>{
        var slider = document.getElementById("slider" + rowID)
        slider.scrollLeft = slider.scrollLeft - 500
    }
    const slideRight = () => {
        var slider = document.getElementById("slider" + rowID)
        slider.scrollLeft = slider.scrollLeft + 500
    }
  return (
    <>
        <h2 className='text-white font-bold md:text-xl lg:text-3xl p-4 relative'>{title}</h2>
        <div className="relative flex items-center group/item">
        <AiOutlineArrowLeft onClick={slideLeft} size={40} className='text-white opacity-50 absolute hover:opacity-100 cursor-pointer hidden group-hover/item:block z-20  ' />
        <div id={'slider' + rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative overflow-y-hidden'>
        {Movies.map((item, id) => (
            <Movie key={id} item={item}/>
        ))}
        </div>
        <AiOutlineArrowRight onClick={slideRight} size={40} className='text-white opacity-50 absolute hover:opacity-100 cursor-pointer hidden group-hover/item:block z-20 right-0  ' />
        </div>
    </>
  )
}

export default Row