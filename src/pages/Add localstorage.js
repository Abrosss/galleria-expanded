import { useRef, useState } from 'react';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import plus from '../shared/plus.svg'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
function Home() {
  const navigate = useNavigate()
  const [popup, setPopup] = useState(false)
  const [linksPopup, setLinksPopup] = useState(false)
  const [name, setName] = useState(null)
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("board")) || [] )
  const [currentBoard, setCurrentBoard] = useState({})
  const [currentIndex, setCurrentIndex] = useState(null)
  const [inputList, setInputList] = useState([{ link: ""}]);
  console.log(currentBoard.id)

  useEffect(() => {

    axios.get('/boards').then((response) => {
     
      setBoards(response.data);
    });
  }, []);
  const closeImage = (e) => {
    if(e.target.className==="overlay") {
      setPopup(false)
      if(linksPopup) {
        setInputList([{}])
        setLinksPopup(false)
      }
      document.body.style.overflowY = "unset";
    }
    
  }
  const addBoard = (index) => {
    let id = Date.now()
    setPopup(false)
    setLinksPopup(true)
    setCurrentBoard({id:id, name:name, links:[]})
    setBoards(boards => [...boards, {id:id, name:name, links:[]}] )
    localStorage.setItem('board', JSON.stringify([{id:id, name:name, links:[]}]))
    setCurrentIndex(id)
    // navigate(`/profile/${index}`)
  }
  const handleAddClick = (e) => {
    e.preventDefault()
    setInputList([...inputList, { link: ""}]);
  
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    
    const list = [...inputList];
    list[index][name] = value;
    
  };
  const submit =() => {
    const newData = {...currentBoard, links: [...currentBoard.links, ...inputList  ]}
    // setCurrentBoard(newData)
    const newData2 = [...boards].map((board) => board.id === currentBoard.id ? ({...board, links: [...board.links, ...inputList]}) : board);
    setBoards(newData2)
    localStorage.setItem('board', JSON.stringify(newData2))
    setTimeout(() => {
      setInputList([{}])
    }, 100);
    navigate(`/profile/${currentBoard.id}`,{state: {
      board:{newData2},
      id: currentBoard.id

    } });
  }
  return (
    <>
    {popup && 
      <section onClick={closeImage} className='overlay'>
        <section className='modal'>
          <h2>Create a board</h2>
          <label htmlFor='boardName'>Name</label>
          <input autoFocus onChange={(e) => setName(e.target.value)} autoComplete='off' id='boardName' type="text" placeholder='Board name'></input>
        
          <label class="wrapper">
    <input type="checkbox"id="checkbox"/>
  <span class="left"></span>
  <span class="right"></span>
</label>
          <button onClick={() =>addBoard(uuidv4())} disabled={!name}>Create</button>
        </section>
      </section>
      }
      {linksPopup && 
      <section onClick={closeImage} className='overlay'>
        <section className='modal'>
          <h2>Add links</h2>
          <ul className="links">
        {inputList && inputList.map((list, i) => {
        return (
            <li key={i}>
              <input autoFocus className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Paste a link" name="link"/>
  </li>
  )
        })}
  </ul>
          <button onClick={handleAddClick}>Add</button>
          <button onClick={submit}>Submit</button>
        </section>
      </section>
      }
        <Header/>
        <section className='container'>
          {boards && boards.map((board, index) => (
            <section onClick={() => navigate(`/profile/${board.id}`,{state: {
              board:{board},
              id: board.id
            } })} key={index} className='cardContainer'>
            <section  className='card'>
              <div className='thumbnails'>
              <img src={board.links[0] && board.links[0].link}></img>
              <img src={board.links[1] && board.links[1].link}></img>
              <img src={board.links[2] && board.links[2].link}></img>
              <img src={board.links[3] && board.links[3].link}></img>
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