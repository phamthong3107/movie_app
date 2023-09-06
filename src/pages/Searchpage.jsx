import React, { useEffect, useState } from 'react'
import { key } from '../Requests'
import axios from 'axios';
import Movie from '../components/Movie';

const Searchpage = () => {
    const [query, setQuery] = useState("");
    const [Movies,setMovies] = useState([]);
    const requestMovie = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`
    useEffect(() => {
        axios.get(requestMovie).then((res) => {
            setMovies(res.data.results)
        })
    }, [requestMovie])
  return (
    <>
        <div className='w-full h-screen'>
            <img className='absolute w-full h-full object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/93122675-8500-4b7c-818b-89a3474a06ab/VN-vi-20230814-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="" />
            <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
            <div className='absolute w-full px-5 py-24 z-50 top-[15%] text-white text-[32px] lg:text-[48px] font-bold text-center'>
                <h2>The biggest local and international hits. </h2>
                <h2>The best stories. All streaming here.</h2>
                <p className='text-2xl font-light my-3'>Watch anywhere. Cancel anytime.</p>
                <p className='text-2xl font-light my-3'>Search the Movie you need.</p>
                <form action="#" onSubmit={(e) => e.preventDefault()} className='text-xl w-full '>
                    <input type="text" placeholder='Search here...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className='py-3 px-5 lg:w-[400px] w-full my-3 font-light me-2 bg-black/60'/>
                    <button className='bg-red-600 p-3 rounded font-bold'>Search</button>
                </form>
            </div>
        </div>
        {Movies.map((item, id) => (
            <Movie key={id} item={item}/>
        ))}
    </>
  )
}

export default Searchpage