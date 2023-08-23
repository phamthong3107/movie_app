import React, {useState, useEffect} from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineClose } from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext'
import { db } from '../Firebase'
import {updateDoc, doc, onSnapshot} from 'firebase/firestore'
import { BsFillPlayFill } from 'react-icons/bs'

const SavedShows = () => {
    const [Movies, setMovies] = useState([])
    const {user} = UserAuth()
    
    const slideLeft = () =>{
        var slider = document.getElementById("slider")
        slider.scrollLeft = slider.scrollLeft - 500
    }
    const slideRight = () => {
        var slider = document.getElementById("slider")
        slider.scrollLeft = slider.scrollLeft + 500
    }
    useEffect(() => {
        onSnapshot(doc(db, 'user', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedShows)
        })
    }, [user?.email])

    const movieRef = doc(db, 'user' , `${user?.email}`)
    const deleteShow = async (passedID) => {
        try{
            const result = Movies.filter((item) => item.id !== passedID)
            await updateDoc(movieRef, {
                savedShows:result,
            })
        }catch(error) {
            console.log(error)
        }
    }

  return (
    <>
        <h2 className='text-white font-bold md:text-xl lg:text-3xl p-4 relative'>My List</h2>
        <div className="relative flex items-center group/item">
        <AiOutlineArrowLeft onClick={slideLeft} size={40} className='text-white opacity-50 absolute hover:opacity-100 cursor-pointer hidden group-hover/item:block z-20  ' />
        <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative overflow-y-hidden'>
        {Movies.map((item, id) => (
            <div key={id} className='w-[180px] sm:w-[200px] md:w-[240px] lg:w-[450px] inline-block cursor-pointer relative p-2 group'>
            <img className='transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-150 w-full h-full' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
            <div className="absolute top-0 opacity-0 transition duration-200 z-10 invisible sm:visible delay-150 w-full scale-0 
            group-hover:scale-110 group-hover:-trasnlate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
                <img className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-full' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
                <div className="absolute bg-gradient-to-r from-black top-0 w-full h-full border-l-4 border-red-600"></div>
                <div className="absolute top-[20%] left-4">
                    <h2 className='font-bold text-white text-2xl'>{item?.title}</h2>
                    <p className='text-gray-400 text-sm my-3'>Release: {item?.release_date}</p>
                    <div className="row flex">
                        <button className='bg-red-600 text-white px-6 py-2 rounded-full'><BsFillPlayFill/></button>
                    </div>
                </div>
                <button onClick={() => deleteShow(item.id)} className='absolute text-red-600 top-4 right-4'><AiOutlineClose size={30}/></button>
            </div>
        </div>
        ))}
        </div>
        <AiOutlineArrowRight onClick={slideRight} size={40} className='text-white opacity-50 absolute hover:opacity-100 cursor-pointer hidden group-hover/item:block z-20 right-0  ' />
        </div>
    </>
  )
}

export default SavedShows