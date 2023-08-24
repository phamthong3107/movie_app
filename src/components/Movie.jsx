import React, { useContext, useState } from 'react'
import {BsFillPlayFill,BsPlus, BsCheck, BsInfo} from 'react-icons/bs'
import { UserAuth } from '../context/AuthContext'
import {db} from '../Firebase'
import {arrayUnion, doc, updateDoc} from 'firebase/firestore' 
import { MovieContext } from '../context/MovieContext'
import { Link } from 'react-router-dom'

const Movie = ({item}) => {
    const [Addlist, setAddlist] = useState(false)
    const [saved, setSaved] = useState(false)
    const { setidMovie } = useContext(MovieContext)
    const {user} = UserAuth()
    const movieID = doc(db, 'user', `${user?.email}`)

    const handleMovie = (id) => {
        setidMovie(id)
    }
    const saveShow = async () => {
        if(user?.email) {
            setAddlist(!Addlist)
            setSaved(true)
            await updateDoc(movieID, {
                savedShows: arrayUnion({
                    id: item.id,
                    title: item.title,
                    img: item.backdrop_path,
                    release_date: item.release_date
                })
            })
        }else {
            alert('Please log in to save a movie')
        }
    }

  return (
    <div className='w-[180px] sm:w-[200px] md:w-[240px] lg:w-[450px] inline-block cursor-pointer relative p-2 group'>
        <Link to="/detail">
          <img onClick={() => handleMovie(item?.id)} className='transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-150 w-full h-full' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
        </Link>
        <div className="absolute top-0 opacity-0 transition duration-200 z-10 invisible sm:visible delay-150 w-full scale-0 
        group-hover:scale-110 group-hover:-trasnlate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
            <img className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-full' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
            <div className="absolute bg-gradient-to-r from-black top-0 w-full h-full border-l-4 border-red-600"></div>
            <div className="absolute top-[20%] left-4">
                <Link to="/detail">
                    <h2 onClick={() => handleMovie(item?.id)} className='font-bold text-white text-2xl'>{item?.title}</h2>
                </Link>
                <p className='text-gray-400 text-sm my-3'>Release: {item?.release_date}</p>
                <p className='text-green-500 text-xl font-bold my-3'>Vote: {item?.vote_average}</p>
                <p className=''>{item?.original_language}</p>
                <div className="row flex">
                    <button className='bg-red-600 text-white px-6 py-2 rounded-full'><BsFillPlayFill/></button>
                    <div onClick={saveShow}>
                    {Addlist ? (<button className='rounded-full border mx-5 bg-white text-black'><BsCheck size={30}/></button>) : (<button className='rounded-full border text-white mx-5 hover:bg-white hover:text-black'><BsPlus size={30}/></button>) }
                    </div>
                    <div>
                    <button className='rounded border text-white mx-2 hover:bg-white hover:text-black'><BsInfo size={30}/></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Movie