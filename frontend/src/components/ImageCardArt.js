import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import ArtToBeEditedContext from '../context/EditedArt';
import dots from '../shared/dots.svg'
function ImageCardArt({ img, index, deletePicture }) {

  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null)
  const [settingsPopup, setSettingsPopup] = useState(null)
  const { editPopup, setEditPopup } = useContext(ArtToBeEditedContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')))
  const viewImage = (img, i, e) => {
    console.log(e.target.tagName)
    if (!e.target.dataset.id && e.target.tagName !== 'LI') {
      navigate('/slideshow', {
        state: {
          art: { img, i },
          slide: false
        }
      });
    }


  }
  function onMouseEnter(index) {
    setHovered(index)
  }

  function onMouseLeave() {
    setHovered(null)
  }

  return (
    <div onClick={(e) => viewImage(img, index, e)} key={index} className="image">

      <div
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={onMouseLeave}
        className='image-container'>

        {user &&
          <div data-id={img._id} onClick={() => setSettingsPopup(prev => prev === null ? index : null
          )} className={hovered === index ? 'settings show' : 'settings'}><img data-id={img._id} src={dots} alt='settings icon'></img>
            <ul className={settingsPopup === index ? ' settingsPopup show' : 'settingsPopup'}>
              <li onClick={() => setEditPopup(img)}>Edit</li>
              <li onClick={() => deletePicture(img._id)}>Delete</li>
            </ul>

          </div>
        }

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