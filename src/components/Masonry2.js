

import {useNavigate} from 'react-router-dom';
import trash from '../shared/trash.svg'
import axios from '../api/axios';
import { useState, useEffect } from 'react';
function Masonry(props) {
  const [pics, setPics] = useState(props.imageUrls)
  const [hovered, setHovered] = useState(null)
  useEffect(() => {
    setPics(props.imageUrls);
}, [props.imageUrls])

  async function deleteBoard(id) {

    try {
      const updatedPics = pics.filter(pic => pic._id !== id);
      setPics(updatedPics)
      await axios.delete(`/pictures/${id}`);

     
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
      <div onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} onClick={(e) => viewImage(img, i, e)} key={i} className="image">
         
        <div className='image-container'>
        <div data-id={img._id} onClick={() => deleteBoard(img._id)} className={hovered === i ? 'trash show' : 'trash'}><img data-id={img._id}  src={trash}></img></div> 
      <img className='img' src={img.image} alt="thumbnail"   ></img>
    
      </div>
    </div>
      
    ))}
    </div>
    </>
  )
}

export default Masonry