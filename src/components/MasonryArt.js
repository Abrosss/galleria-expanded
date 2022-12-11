

import {useNavigate} from 'react-router-dom';
import trash from '../shared/trash.svg'
import axios from '../api/axios';
import { useState, useEffect } from 'react';
function MasonryArt(props) {
  const [pics, setPics] = useState(props.imageUrls)
  const [hovered, setHovered] = useState(null)
  const [thumbnails, setThumbnails] = useState([])
  console.log(thumbnails)
  useEffect(() => {
    setPics(props.imageUrls);
}, [props.imageUrls])

// useEffect(() => {


//     axios.put(`/boards/thumbnails/${props.id}`,{
//       thumbnails: []
//    }).then(res => {
//     if(res.status === 200) {
//      console.log(res.data)
//     }
//    }) 
//    .catch(err=>console.log(err))
  

  
// }, [pics])
useEffect(() => {
  axios.put(`/boards/thumbnails/${props.id}`, {
    thumbnails: pics.slice(0, 4)

  }).catch(err => console.log(err))
}, [pics])
  async function deleteBoard(id, board) {

    try {
      const updatedPics = pics.filter(pic => pic._id !== id);
      
 
      await axios.delete(`/art/${id}`)
      .then(res => {
        if(res.status === 200) {
          setPics(updatedPics)
      }})
      .catch(err=>console.log(err))
     
    } catch (err) {
      console.log(err);
    }
    
}
  const navigate = useNavigate();
  const viewImage = (img, i, e) => {
    console.log(i)
    if(!e.target.dataset.id) {
      navigate('/slideshow',{state: {
        art:{img, i},
        slide:false
      } });
    }
    

  }
  
  return (
    <>
    
    <div className='masonry'>
    {pics.map((img, i) => (
      <div  onClick={(e) => viewImage(img, i, e)} key={i} className="image">
         
        <div onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} className='image-container'>
        <div data-id={img._id} onClick={() => deleteBoard(img._id, img.board)} className={hovered === i ? 'trash show' : 'trash'}><img data-id={img._id}  src={trash}></img></div> 
      <img className='img dimmed' src={img.image} alt="thumbnail"   ></img>
      <div className='caption'>
        <h2>{img.title}</h2>
        <p>{img.artist && img.artist.name}</p>
      </div>
      </div>
    </div>
      
    ))}
    </div>
    </>
  )
}

export default MasonryArt