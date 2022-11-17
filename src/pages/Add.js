import { useEffect, useState, useRef } from 'react';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import plus from '../shared/plus.svg'
import trash from '../shared/trash.svg'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom';
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
const trashref = useRef(null)
const card = useRef(null)
console.log(trash)
  useEffect(() => {

    axios.get('/boards').then((response) => {
     console.log(response.data)
      setBoards(response.data);
    });
  }, []);
  const closeImage = (e) => {
    if(e.target.className==="overlay") {
      setPopup(false)
     
      // if(linksPopup) {
      //   setInputList([{}])
      //   setLinksPopup(false)
      //   window.location.reload(false)
      // }
      document.body.style.overflowY = "unset";
    }
    
  }
  function addBoard(e) {
    e.preventDefault()
    setPopup(false)
    // setLinksPopup(true)
    axios.post('/addBoard', {
      name:name,
      art:artCollection
     }).then(res =>{
      if(res.status===200) {
        setBoards([...boards, res.data]);
        setCurrentIndex(res.data)
        navigate(`/profile/${res.data}`,{state: {
          id: res.data
    
        } });
      }
      
     })
     .catch(err=>console.log(err))
  }
  function addPictures(e) {
    e.preventDefault()
    axios.post('/addPicture', {
      links:inputList,
      board:currentIndex
     }).then(res =>{
      if(res.status===200) {
         navigate(`/profile/${currentIndex}`,{state: {
      id: currentIndex

    } });
      }
      setTimeout(() => {
        setInputList([{}])
      }, 100);
     })
     .catch(err=>console.log(err))
  }
  // const addBoard = (index) => {
  //   let id = Date.now()
  //   setPopup(false)
  //   setLinksPopup(true)
  //   setCurrentBoard({id:id, name:name, links:[]})
  //   setBoards(boards => [...boards, {id:id, name:name, links:[]}] )
  //   localStorage.setItem('board', JSON.stringify([{id:id, name:name, links:[]}]))
  //   setCurrentIndex(id)
  //   // navigate(`/profile/${index}`)
  // }
  const handleAddClick = (e) => {
    e.preventDefault()
    setInputList([...inputList, { link: ""}]);
  
  };
  async function deleteBoard(id) {
    console.log(card)
    try {
      await axios.delete(`/boards/${id}`);
      const updatedBoards = boards.filter(board => board._id !== id);
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
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    
    const list = [...inputList];
    list[index][name] = value;
    
  };

  return (
    <>
    {popup && 
      <section onClick={closeImage} className='overlay'>
        <section className='modal'>
          <h2>Create a board</h2>
          <label htmlFor='boardName'>Name</label>
          <input autoFocus onChange={(e) => setName(e.target.value)} autoComplete='off' id='boardName' type="text" placeholder='Board name'></input>
        
          <label class="wrapper">
    <input onClick={(e) => OnCheckboxClick(e)} type="checkbox"id="checkbox"/>
  <span class="left"></span>
  <span class="right"></span>
</label>
          <button onClick={addBoard} disabled={!name}>Create</button>
        </section>
      </section>
      }
      {/* {linksPopup && 
      <section onClick={closeImage} className='overlay'>
        <section className='modal'>
          <h2>Add links</h2>
          <ul className="links">
        {inputList && inputList.map((list, i) => {
        return (
            <li key={i}>
              <input autoComplete='off' autoFocus className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Paste a link" name="link"/>
  </li>
  )
        })}
  </ul>
          <button onClick={handleAddClick}>Add</button>
          <button onClick={addPictures}>Submit</button>
        </section>
      </section>
      } */}
        <Header/>
        <section className='container'>
          {boards && boards.map((board, index) => (
            <section onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} ref={card}   key={index} className='cardContainer'>
              <div ref={trashref} data-id={board._id} onClick={() => deleteBoard(board._id)} className={hovered === index ? 'trash show' : 'trash'}><img data-id={board._id}  src={trash}></img></div> 
            <section onClick={() => navigate(`/profile/${board._id}`, {state: {
              id: board._id
        
            } })}   className='card'>
              <div className='thumbnails'>
              {/* <img src={board.links[0] && board.links[0].link}></img>
              <img src={board.links[1] && board.links[1].link}></img>
              <img src={board.links[2] && board.links[2].link}></img>
              <img src={board.links[3] && board.links[3].link}></img> */}
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