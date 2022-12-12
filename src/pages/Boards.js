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
  // const [linksPopup, setLinksPopup] = useState(false)
  const [name, setName] = useState(null)
  const [boards, setBoards] = useState([])
  const [currentBoard, setCurrentBoard] = useState({})
  const [currentIndex, setCurrentIndex] = useState(null)
  const [inputList, setInputList] = useState([{ link: "" }]);
  const [artCollection, setArtCollection] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [settingsPopup, setSettingsPopup] = useState(null)

  useEffect(() => {

    axios.get('/boards').then((response) => {
      console.log(response.data)
      setBoards(response.data);
    });
  }, []);

  function editBoard(board) {

  }
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
      art: artCollection
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
      }

    })
      .catch(err => console.log(err))
  }
  console.log(boards)
  async function deleteBoard(id) {
    console.log(id)
    try {

      const updatedBoards = boards.filter(board => board._id !== id);
      await axios.delete(`/boards/${id}`)
        .then(res => {
          if (res.status === 200) {
            console.log(res)
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
          <form onSubmit={addBoard} className='modal'>
            <h2>Edit the board</h2>
            <label htmlFor='boardName'>Name</label>
            <input autoFocus onChange={(e) => setName(e.target.value)} autoComplete='off' id='boardName' type="text" placeholder='Board name' value={editPopup.name}></input>
            <div className='checklist'>
              <label class="wrapper">
                {editPopup.art ?
                <input onClick={(e) => OnCheckboxClick(e)} checked  type="checkbox" id="checkbox" /> :
                <input onClick={(e) => OnCheckboxClick(e)}   type="checkbox" id="checkbox" />
              }
                
                <span class="left"></span>
                <span class="right"></span>
              </label>
              <span className={editPopup.art ? 'selected' : ''}>art collection</span>
            </div>
            <button disabled={!name}>Create</button>
          </form>
        </section>
      }
      <section className='page'>
        <Header page={'boards'} />
        <section className='container'>
          {boards && boards.map((board, index) => (
            <section onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} key={index} className='cardContainer'>
              {/* <div data-id={board._id} onClick={() => deleteBoard(board._id)} className={hovered === index ? 'trash show' : 'trash'}><img data-id={board._id}  src={dots}></img></div>  */}
              <div data-id={board._id} onClick={() => setSettingsPopup(prev => prev === null ? index : null
              )} className={hovered === index ? 'trash show' : 'trash'}><img data-id={board._id} src={dots}></img>
                <ul className={settingsPopup === index ? ' settings show' : 'settings'}>
                  <li onClick={() => setEditPopup(board)}>Edit</li>
                  <li onClick={() => deleteBoard(board._id)}>Delete</li>
                </ul>

              </div>
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
          <div className='addButtonContainer'>
            <button onClick={() => setPopup(true)} title='Create a board' className='addButton'>
              <img src={plus}></img>
            </button>
          </div>
        </section>
      </section>
    </>
  )
}

export default Home