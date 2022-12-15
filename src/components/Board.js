import React, { useState } from 'react'
import dots from '../shared/dots.svg'
import Thumbnail from '../components/Thumbnail';
import { useNavigate } from 'react-router-dom';
function Board({boards, board, index, setEditPopup, deleteBoard}) {
    const [hovered, setHovered] = useState(null)
    const [settingsPopup, setSettingsPopup] = useState(null)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')))
    const navigate = useNavigate()
  return (
    <section onMouseEnter={() => setHovered(index)} onMouseLeave={() => {
       setHovered(null)
       setSettingsPopup(null)
        }} key={index} className='cardContainer'>
        
        {user && 
        <div data-id={board._id} onClick={() => setSettingsPopup(prev => prev === null ? index : null)} className={hovered === index ? 'settings show' : 'settings'}><img data-id={board._id} src={dots} alt="settings icon"></img>
            <ul className={settingsPopup === index ? ' settingsPopup show' : 'settingsPopup'}>
              <li onClick={() => setEditPopup(board) }>Edit</li>
              <li onClick={() => deleteBoard(board._id)}>Delete</li>
            </ul>

          </div>
        }
        
        <section onClick={() => navigate(`/profile/${board._id}`, {
          state: {
            id: board._id,
            art: board.art
          }
        })} className='card'>
          <div className='thumbnails'>

            {boards && <Thumbnail thumbs={board.thumbnails} art={board.art} id={board._id} />}
          </div>
        </section>
        <span className='boardName'>{board.name}</span>
      </section>
  )
}

export default Board