



import axios from '../api/axios';
import { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import ImageCardArt from './ImageCardArt';
function Masonry(props) {
  const [pics, setPics] = useState(props.imageUrls)
 
  useEffect(() => {
    setPics(props.imageUrls);
}, [props.imageUrls])

useEffect(() => {
  axios.put(`/boards/thumbnails/${props.id}`, {
    thumbnails: pics.slice(0, 4)

  }).catch(err => console.log(err))
}, [pics])

  return (
    <>
    
    <div className='masonry'>
    {pics.map((img, i) => (
      props.art ? 
        <ImageCardArt pics={pics} setPics={setPics} img={img} index={i} setEditPopup={props.setEditPopup}/>
     : <ImageCard pics={pics} setPics={setPics} img={img} index={i}/>
      
      
      
      
    ))}
    </div>
    </>
  )
}

export default Masonry