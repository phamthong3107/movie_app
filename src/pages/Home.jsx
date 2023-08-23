import React from 'react'
import Footer from '../components/Footer'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Requests'

const Home = () => {
  return (
    <div>
        <Main />
        <Row rowID='1' title='Popular' fetchURL={requests.requestPopular}/>
        <Row rowID='2' title='TopRated' fetchURL={requests.requestTopRated}/>
        <Row rowID='3' title='Trending' fetchURL={requests.requestTrending}/>
        <Row rowID='4' title='Upcoming' fetchURL={requests.requestUpcoming}/>
        <Footer />
    </div>
  )
}

export default Home