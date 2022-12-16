import React, { useState } from 'react'
import dots from '../shared/dots.svg'
import Thumbnail from '../components/Thumbnail';
import { useNavigate } from 'react-router-dom';
function Board({ board, index, setEditPopup, deleteBoard }) {
  const navigate = useNavigate()

  const [hovered, setHovered] = useState(null)
  const [settingsPopup, setSettingsPopup] = useState(null)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')))

  function onMouseEnter(index) {
    setHovered(index)
  }

  function onMouseLeave() {
    setHovered(null)
    setSettingsPopup(null)
  }

  function toggleSettingsButton(index) {
    setSettingsPopup(prev => prev === null ? index : null)
  }
  return (

    <section
      onMouseEnter={() => onMouseEnter(index)} 
      onMouseLeave={onMouseLeave} 
      className='cardContainer'>

      {user &&
        <div 
        onClick={() => toggleSettingsButton(index)} 
        className={hovered === index ? 'settings show' : 'settings'}>
          <img data-id={board._id} src={dots} alt="settings icon"></img>

          <ul className={settingsPopup === index ? ' settingsPopup show' : 'settingsPopup'}>
            <li onClick={() => setEditPopup(board)}>Edit</li>
            <li onClick={() => deleteBoard(board._id)}>Delete</li>
          </ul>

        </div>
      }

      <section onClick={() => navigate(`/profile/${board._id}`, {
        state: {
          id: board._id,
          art: board.art
        }
      })} 
      className='card'>
        
        <div className='thumbnails'>
          <Thumbnail 
          thumbs={board.thumbnails} 
          art={board.art} 
          id={board._id} />
        </div>
      </section>

      <span className='boardName'>{board.name}</span>
      
    </section>
  )
}

export default Board