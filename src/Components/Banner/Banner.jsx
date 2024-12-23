import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import {api_key,imageUrl} from '../../constants/Constants'
import './Banner.css'

function Banner() {
  const [movie, setMovie] = useState(null)


  useEffect(() => {
    axios.get(`trending/all/week?api_key=${api_key}&language=en-US`).then((response)=>{
      const result = response.data.results;
      if(result && result.length > 0){
        const randomData = Math.floor(Math.random()* result.length);
        setMovie(result[randomData])
      }
    })
  }, [])
  


  return (
    <div className='banner' style={{backgroundImage:`url(${ movie ? imageUrl+movie.backdrop_path : ''})` }}>
      <div className="content">
        <h1 className='title'>{movie ? movie.title : 'Loading...'}</h1>
        <div className='bannerButtons'>
          <button className='button'>Play</button>
          <button className='button'>My list</button>
        </div>
        <h1 className='description'>{movie ? movie.overview : 'Fetching movie details...'}</h1>
      </div>
      <div className='fade_bottom'></div>
    </div>
  )
}

export default Banner