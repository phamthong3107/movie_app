import React from 'react'
import {BiLogoFacebook,BiLogoTwitter,BiLogoGithub,BiLogoInstagram} from 'react-icons/bi'
import {FaAppStore,FaGooglePlay} from 'react-icons/fa'
const Footer = () => {
  return (
    <>
        <div className='text-white bg-black w-full h-auto lg:px-[5%] py-[50px] grid lg:grid-cols-3 gap-x-8 sm:grid-cols-1 sm:px-0'>
            <div className="col-span-2 px-2">
                <div className='flex items-center justify-between lg:p-5 text-base'>
                    <p>Terms of Use</p>
                    <p>Privacy-Policy</p>
                    <p>Blog</p>
                    <p>FAQ</p>
                    <p>Watch List</p>
                </div>
                <p className='lg:text-base sm:text-sm pt-10'>© 2022 STREAMIT. All Rights Reserved. All videos and shows on this platform are trademarks of, and all related images and content are the property of, Streamit Inc. Duplication and copy of this is strictly prohibited. All rights reserved.</p>
            </div>
            <div className="col-span-1">
                <div className="grid lg:grid-cols-2 sm:grid-cols-1">
                    <div className='p-5'>
                        <h2 className='font-bold text-xl pb-5'>Follow Us</h2> 
                        <div className="icon flex items-center justify-between">
                            <BiLogoFacebook size={30}/>
                            <BiLogoTwitter size={30}/>
                            <BiLogoGithub size={30}/>
                            <BiLogoInstagram size={30}/>
                        </div>
                    </div>
                    <div className="p-5">
                        <h2 className='font-bold text-xl pb-5 '>Streamit App</h2>
                        <div className="flex">
                            <div>
                                <FaAppStore size={50}/><h2 className='text-2xl py-3'>App Store</h2>
                            </div>
                            <div>
                                <FaGooglePlay size={50}/><h2 className='text-2xl py-3'>Google Play</h2>
                            </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer