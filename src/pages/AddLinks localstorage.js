import { useEffect, useState } from 'react';

import Header from '../components/Header';
import Masonry from '../components/Masonry2';
import {useLocation} from 'react-router-dom';
import {Link, useNavigate} from 'react-router-dom'
import logo from '../shared/logo.svg';
import plus from '../shared/plus.svg'
import axios from '../api/axios'
function Home() {
  let boardset 

  const location = useLocation();

  // if(location.state.board.board) boardset = location.state.board.board
  // if(location.state.board.newData2) boardset = location.state.board.newData2[0]
console.log(location.state.id)
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem('board')))
  const [pictures, setPictures] = useState([])
  const [board, setBoard] = useState(boards.filter(board => board.id === location.state.id)[0])
  const [linksPopup, setLinksPopup] = useState(false)
  const [inputList, setInputList] = useState([{ link: ""}]);
  const navigate = useNavigate();
  const viewImage = (i) => {

let img = board.links[0]
console.log(img)
    navigate('/slideshow',{state: {
      art:{img, i},
      slide: true

    }
      });

  }
  useEffect(() => {

    axios.get('/pictures').then((response) => {
     console.log(response.data)
      setPictures(response.data);
    });
  }, []);
 console.log(board) 
  const closeImage = (e) => {
    if(e.target.className==="overlay") {
      if(linksPopup) setLinksPopup(false)
      document.body.style.overflowY = "unset";
    }
    
  }
  const handleAddClick = (e) => {
    e.preventDefault()
    setInputList([...inputList, { link: ""}]);
  
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    
    const list = [...inputList];
    list[index][name] = value;
    console.log(inputList)
    
  };
  const submit =() => {
    const newData = {...board, links: [...board.links, ...inputList  ]}
    const updatedBoard = [...boards].map((boardStorage) => boardStorage.id === board.id ? (newData) : boardStorage)
    console.log(newData)
    setBoard(newData)
    localStorage.setItem('board', JSON.stringify(updatedBoard))
  
    setLinksPopup(false)
    setInputList([{}])
   };
  
  return (
    <>
{/* {linksPopup && 
      <section onClick={closeImage} className='overlay'>
        <section className='modal'>
          <h2>Add links</h2>
          <ul className="links">
        {inputList && inputList.map((list, i) => {
        return (
            <li key={i}>
              <input autoFocus autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Paste a link" name="link"/>
  </li>
  )
        })}
  </ul>
          <button onClick={handleAddClick}>Add</button>
          <button onClick={submit}>Submit</button>
        </section>
      </section>
      } */}
          <header>
        <Link to ='/profile'><img src={logo} alt="logo"></img></Link>
        <a onClick={() => viewImage(0)} href='/slideshow'>START SLIDESHOW</a>
        </header>
        <section className='board-pins'>
        <h2>{board.name}</h2>
        <Masonry imageUrls={board.links} columnCount="4"/>
        <button onClick={ () => setLinksPopup(true)} className='addButton'><img src={plus}></img></button>
        </section>
       
        </>
  )
}

export default Home