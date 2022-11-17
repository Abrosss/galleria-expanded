import { useEffect, useRef, useState } from 'react';

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

  const [board, setBoard] = useState([])
  const [pictures, setPictures] = useState([])
  const [updatePictures, setUpdatePictures] = useState(false)
  const [linksPopup, setLinksPopup] = useState(false)
  const [inputList, setInputList] = useState([{ link: ""}]);
  const [thumbnails, setThumbnails] = useState([])
  const navigate = useNavigate();

 console.log(thumbnails)

  const viewImage = (i) => {

let img = pictures[0]

    navigate('/slideshow',{state: {
      art:{img, i},
      slide: true

    }
      });

  }
  // useEffect(() => {

  //   axios.get('/pictures').then((response) => {
  //    console.log(response.data)
  //     setPictures(response.data);
  //   });
  // }, []);
  
  useEffect(() => {

    axios.get(`/pictures/${location.state.id}`).then((response) => {
    
      setPictures(response.data);
    });
  }, [updatePictures]);
  useEffect(() => {

    axios.get(`/boards/${location.state.id}`).then((response) => {
   
      setBoard(response.data[0]);
    });
  }, []);

  useEffect(() => {

    if(thumbnails.length <= 4) {
     

      axios.put(`/boards/${location.state.id}`,{
        name: boardName.current.textContent,
        thumbnails: thumbnails
     }).then(res => {
      if(res.status === 200) {
        setInputList([{}])
      }
     }) 
     .catch(err=>console.log(err))
    }
    else return
    
  }, [thumbnails])

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
  const boardName = useRef(null)
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    
    const list = [...inputList];
    list[index][name] = value;
  
    
  };

   function addPictures(e) {

    e.preventDefault()
    axios.post('/addPicture', {
      links:inputList,
      board:location.state.id
     }).then(res =>{
      if(res.status===200) {
        setLinksPopup(false)
        setThumbnails(thumbnails => [...thumbnails, ...inputList] );
        setUpdatePictures(res.data)
        setTimeout(() => {
          setUpdatePictures(false)
        }, 100);
        // setPictures([...pictures, ...inputList.link]);
      }
   
     })
     .catch(err=>console.log(err))
  }
  useEffect(()=>{

  },[])
  const handleKeyPress = (event, text) => {
    if(event.key === 'Enter'){
      event.currentTarget.setAttribute("contenteditable", false)
      axios.put(`/boards/${location.state.id}`,{
            name: boardName.current.textContent,
           
         }) .catch(err=>console.log(err))
      setTimeout(() => {
        boardName.current.setAttribute("contenteditable", true)
      }, 0);
  
    }
  }
  return (
    <>
{linksPopup && 
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
          <button onClick={addPictures}>Submit</button>
        </section>
      </section>
      }
          <header>
        <Link to ='/profile'><img src={logo} alt="logo"></img></Link>
        <a onClick={() => viewImage(0)} href='/slideshow'>START SLIDESHOW</a>
        </header>
        <section className='board-pins'>
        <h2 ref={boardName} contentEditable autoComplete onKeyPress={(e) => handleKeyPress(e, e.currentTarget.textContent)} >{board.name}</h2>
        <Masonry imageUrls={pictures} columnCount="4"/>
        <button onClick={ () => setLinksPopup(true)} className='addButton'><img src={plus}></img></button>
        </section>
       
        </>
  )
}

export default Home