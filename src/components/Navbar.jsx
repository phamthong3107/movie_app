import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import {BiSearch} from 'react-icons/bi'
const Navbar = () => {
  const {user, logOut} = UserAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try{
      await logOut()
      navigate('/')
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='flex items-center justify-between p-4 absolute z-[100] w-full'>
        <div className='flex items-center justify-between w-[30%]'> 
        <Link to='/'>
          <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>NETFLIX</h1>
        </Link>
        <Link to='/'>
            <h1 className='text-white font-bold hidden lg:block'>Home</h1>
        </Link>
        <Link to='/account'>
            <h1 className='text-white font-bold hidden lg:block'>My List</h1>
        </Link>

        <Link to='/search'>
          <h1 className='text-white  hidden lg:block'><BiSearch size={20} /></h1>
        </Link>
        </div>
        {user?.email ? 
        ( <div>
            <Link to='/account'>
              <button className='text-white pr-4'>Account</button>
            </Link>
            <button onClick={handleLogout} className='bg-red-600 text-white px-6 py-2 rounded cursor-pointer'>LogOut</button>
          </div>) : (
          <div>
          <Link to='/login'>
            <button className='text-white pr-4'>Sign In</button>
          </Link>
          <Link to='/signup'>
            <button className='bg-red-600 text-white px-6 py-2 rounded cursor-pointer'>Sign Up</button>
          </Link>
        </div>) }
    </div>
  )
}

export default Navbar