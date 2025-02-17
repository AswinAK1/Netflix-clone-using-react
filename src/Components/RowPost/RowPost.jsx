import React from 'react'
import './RowPost.css'
import { useEffect , useState } from 'react'
import axios from '../../axios'
import {imageUrl , api_key} from '../../constants/Constants'
import YouTube from 'react-youtube'


function RowPost(props) {
  const [movies,setMovies] = useState([])
  const [urlId,setUrlId] = useState('')

  useEffect(() => {
    axios.get(props.url).then((response)=>{
      console.log(response.data.results);
      setMovies(response.data.results)
    })
  }, [])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  
  const handleMovie = (id) =>{
    console.log(id)
    axios.get(`movie/${id}/videos?api_key=${api_key}&language=en-US`).then((response)=>{
      if(response.data.results !==0){
        setUrlId(response.data.results[0])
      }
    })
  }

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj)=>
          <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="Poster" />
        )}

      </div>
      { urlId &&  <YouTube  videoId={urlId.key}  opts={opts}  /> }
    </div>
  )
}

export default RowPost