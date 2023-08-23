import React from 'react'
import SavedShows from '../components/SavedShows'
import Footer from '../components/Footer'

const Account = () => {
  return (
    <>
      <div className='w-full text-white'>
        <img className=' w-full h-[400px] object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/93122675-8500-4b7c-818b-89a3474a06ab/VN-vi-20230814-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="" />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]'></div>
        <div className='absolute top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>My List</h1>
        </div>
      </div>
      <SavedShows />
      <Footer />
    </>
  )
}

export default Account