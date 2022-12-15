import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../api/axios';

import dots from '../shared/dots.svg'
function ImageCardArt({pics, img, index, setPics, setEditPopup}) {

    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null)
    const [settingsPopup, setSettingsPopup] = useState(null)

      const viewImage = (img, i, e) => {
        console.log(e.target.tagName)
        if(!e.target.dataset.id && e.target.tagName !== 'LI') {
          navigate('/slideshow',{state: {
            art:{img, i},
            slide:false
          } });
        }
        
    
      }
      async function deleteBoard(id) {

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
 
    return (
        <div  onClick={(e) => viewImage(img, index, e)} key={index} className="image">
         
        <div onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} className='image-container'>
       
        <div data-id={img._id} onClick={() => setSettingsPopup(prev => prev === null ? index : null
              )} className={hovered === index ? 'settings show' : 'settings'}><img data-id={img._id} src={dots}></img>
                <ul className={settingsPopup === index ? ' settingsPopup show' : 'settingsPopup'}>
                  <li onClick={() => setEditPopup(img)}>Edit</li>
                  <li onClick={() => deleteBoard(img._id, img.board)}>Delete</li>
                </ul>

              </div>
      <img className='img dimmed' src={img.image} alt="thumbnail"   ></img>
      <div className='caption'>
        <h2>{img.title}</h2>
        <p>{img.artist && img.artist.name}</p>
      </div>
      </div>
    </div>
    )
}

export default ImageCardArt