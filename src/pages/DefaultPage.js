import { useEffect, useState } from 'react';
import Header from '../components/Header';
import plus from '../shared/plus.svg'
import trash from '../shared/trash.svg'
import dots from '../shared/dots.svg'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom';
import Thumbnail from '../components/Thumbnail';
import { v4 as uuidv4 } from 'uuid';
function Home() {
  const navigate = useNavigate()
  const [popup, setPopup] = useState(false)
  const [editPopup, setEditPopup] = useState(null)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')))
  // const [linksPopup, setLinksPopup] = useState(false)
  const [name, setName] = useState(null)
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem('boards')) || [])
  const [currentBoard, setCurrentBoard] = useState({})
  const [currentIndex, setCurrentIndex] = useState(null)
  const [inputList, setInputList] = useState([{ link: "" }]);
  const [artCollection, setArtCollection] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [settingsPopup, setSettingsPopup] = useState(null)

  useEffect(() => {
  
      axios.get('/allBoards/6399d3c069d7646c73e3159c').then((response) => {
   
        setBoards(response.data);
      });
    
   
  }, []);


  const closeImage = (e) => {
    if (e.target.className === "overlay") {
      setPopup(false)
      setEditPopup(null)
      document.body.style.overflowY = "unset";
    }

  }

  function addBoard(e) {
    e.preventDefault()
    setPopup(false)

    axios.post('/addBoard', {
      name: name,
      art: artCollection,
      user: user._id
    }).then(res => {
      if (res.status === 200) {
        setBoards([...boards, res.data]);
        setCurrentIndex(res.data)
        navigate(`/profile/${res.data}`, {
          state: {
            id: res.data,
            art: artCollection
          }
        });
        localStorage.setItem('boards', JSON.stringify(boards));
      }

    })
      .catch(err => console.log(err))
  }

  async function deleteBoard(id) {
  
    try {

      const updatedBoards = boards.filter(board => board._id !== id);
      await axios.delete(`/boards/${id}`)
        .then(res => {
          if (res.status === 200) {
     
            setBoards(updatedBoards)
          }
        })
        .catch(err => console.log(err))


    } catch (err) {
      console.log(err);
    }

  }
  const OnCheckboxClick = (e) => {
    if (e.target.checked) {
      setArtCollection(true)
    }
    else {
      setArtCollection(false)
    }
  }
  function editBoard(e, id) {
    e.preventDefault()
    axios.put(`/boards/${id}`, {
      name: name,
      art: artCollection

    }).then(res => {
      if (res.status === 200) {
 
        setBoards(boards.map(board => board._id === id ? res.data : board));
        setEditPopup(null)
      }

    })
    
    
    .catch(err => console.log(err))
  }


  return (
    <>
      {popup &&
        <section onClick={closeImage} className='overlay'>
          <form onSubmit={addBoard} className='modal'>
            <h2>Create a board</h2>
            <label htmlFor='boardName'>Name</label>
            <input autoFocus onChange={(e) => setName(e.target.value)} autoComplete='off' id='boardName' type="text" placeholder='Board name'></input>
            <div className='checklist'>
              <label class="wrapper">
                <input onClick={(e) => OnCheckboxClick(e)} type="checkbox" id="checkbox" />
                <span class="left"></span>
                <span class="right"></span>
              </label>
              <span className={artCollection ? 'selected' : ''}>art collection</span>
            </div>
            <button disabled={!name}>Create</button>
          </form>
        </section>
      }
      {editPopup &&
        <section onClick={closeImage} className='overlay'>
          <form onSubmit={(e) => editBoard(e, editPopup._id)} className='modal'>
            <h2>Edit the board</h2>
            <label htmlFor='boardName'>Name</label>
            <input autoFocus onChange={(e) => setName(e.target.value)} value={!name ? editPopup.name : name} autoComplete='off' id='boardName' type="text" placeholder={editPopup.name}></input>
           
            <button>Edit</button>
          </form>
        </section>
      }
      <section className='page'>
        <Header page={'boards'} />
        <section className='container'>
          {boards && boards.map((board, index) => (
            <section onMouseEnter={() => setHovered(index)} onMouseLeave={() => {
              
              setHovered(null)
              setSettingsPopup(null)
              }} key={index} className='cardContainer'>
              {/* <div data-id={board._id} onClick={() => deleteBoard(board._id)} className={hovered === index ? 'trash show' : 'trash'}><img data-id={board._id}  src={dots}></img></div>  */}
              {user && 
              <div data-id={board._id} onClick={() => setSettingsPopup(prev => prev === null ? index : null
                )} className={hovered === index ? 'settings show' : 'settings'}><img data-id={board._id} src={dots}></img>
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
              })} className='card'>
                <div className='thumbnails'>

                  {boards && <Thumbnail thumbs={board.thumbnails} art={board.art} id={board._id} />}
                </div>
              </section>
              <span className='boardName'>{board.name}</span>
            </section>
          ))}
          {user && 
          <div className='addButtonContainer'>
          <button onClick={() => setPopup(true)} title='Create a board' className='addButton'>
            <img src={plus}></img>
          </button>
        </div>
          }
          
        </section>
      </section>
    </>
  )
}

export default Home