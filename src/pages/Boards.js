import { useEffect, useState } from 'react';
import Header from '../components/Header';
import plus from '../shared/plus.svg'
import trash from '../shared/trash.svg'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom';
import Thumbnail from '../components/Thumbnail';
import { v4 as uuidv4 } from 'uuid';
function Home() {
  const navigate = useNavigate()
  const [popup, setPopup] = useState(false)
  // const [linksPopup, setLinksPopup] = useState(false)
  const [name, setName] = useState(null)
  const [boards, setBoards] = useState([])
  const [currentBoard, setCurrentBoard] = useState({})
  const [currentIndex, setCurrentIndex] = useState(null)
  const [inputList, setInputList] = useState([{ link: ""}]);
  const [artCollection, setArtCollection] = useState(false)
  const [hovered, setHovered] = useState(null)


  useEffect(() => {

    axios.get('/boards').then((response) => {
     console.log(response.data)
      setBoards(response.data);
    });
  }, []);

  const closeImage = (e) => {
    if(e.target.className==="overlay") {
      setPopup(false)
      document.body.style.overflowY = "unset";
    }
    
  }

  function addBoard(e) {
    e.preventDefault()
    setPopup(false)

    axios.post('/addBoard', {
      name:name,
      art:artCollection
     }).then(res =>{
      if(res.status===200) {
        setBoards([...boards, res.data]);
        setCurrentIndex(res.data)
        navigate(`/profile/${res.data}`,{state: {
          id: res.data,
          art:artCollection
        } });
      }
      
     })
     .catch(err=>console.log(err))
  }

  async function deleteBoard(id) {

    try {
       axios.delete(`/boards/${id}`);
      const updatedBoards = boards.filter(board => board._id !== id);
      console.log(updatedBoards)
      setBoards(updatedBoards)
     
    } catch (err) {
      console.log(err);
    }
    
}
const OnCheckboxClick= (e) => {
  if(e.target.checked) {
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
    <input onClick={(e) => OnCheckboxClick(e)} type="checkbox"id="checkbox"/>
  <span class="left"></span>
  <span class="right"></span>
</label>
<span className={artCollection ? 'selected' : ''}>art collection</span>
</div>
          <button disabled={!name}>Create</button>
        </form>
      </section>
      }
  
        <Header page={'boards'}/>
        <section className='container'>
          {boards && boards.map((board, index) => (
            <section onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)}  key={index} className='cardContainer'>
              <div data-id={board._id} onClick={() => deleteBoard(board._id)} className={hovered === index ? 'trash show' : 'trash'}><img data-id={board._id}  src={trash}></img></div> 
            <section onClick={() => navigate(`/profile/${board._id}`, {state: {
              id: board._id,
              art:board.art
            } })}   className='card'>
              <div className='thumbnails'>
           
              <Thumbnail art={board.art} id={board._id}/>
              </div>
            </section>
            <span>{board.name}</span>
            </section>
          ))}
          
          <button onClick={() => setPopup(true)}  title='Create a board' className='plus'>
          <img src={plus}></img>
          </button>
        </section>
        </>
  )
          }

export default Home