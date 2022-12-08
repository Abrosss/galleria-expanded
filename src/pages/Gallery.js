import { useEffect, useRef, useState } from 'react';

import Masonry from '../components/Masonry2';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'

import logo from '../shared/logo.svg';
import plus from '../shared/plus.svg'
import axios from '../api/axios'
function Home() {


  const location = useLocation();

  const [board, setBoard] = useState([])
  const [pictures, setPictures] = useState([])
  const [art, setArt] = useState([])
  const [updatePictures, setUpdatePictures] = useState(false)
  const [linksPopup, setLinksPopup] = useState(false)
  const [inputList, setInputList] = useState([{}]);
  const [error, setError] = useState(null)
  const [thumbnails, setThumbnails] = useState([])
  const navigate = useNavigate();

  const viewImage = (i) => {

    let img = pictures[0]

    navigate('/slideshow', {
      state: {
        art: { img, i },
        pictures: pictures,
        slide: true

      }
    });

  }

  useEffect(() => {

    if(location.state.art) {
      console.log(location.state.art)
      axios.get(`/art/${location.state.id}`).then((response) => {

        setPictures(response.data);
      });
    }
    else axios.get(`/pictures/${location.state.id}`).then((response) => {

      setPictures(response.data);
    });
  }, [updatePictures]);
  
  useEffect(() => {
    
    axios.get(`/boards/${location.state.id}`).then((response) => {

      setBoard(response.data[0]);
    });
  }, []);

 
  const closeImage = (e) => {
    if (e.target.className === "overlay") {
      if (linksPopup) setLinksPopup(false)
      document.body.style.overflowY = "unset";
    }

  }
  const handleAddClick = (e) => {
    e.preventDefault()
    if(inputList.length < 6) setInputList([...inputList, {}]);
    else setError('you cannot add more')

  };
  const handleAddMoreClick = (e) => {
    e.preventDefault()
    setInputList([...inputList, {}]);

  };
  const boardName = useRef(null)
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...inputList];
    list[index][name] = value;

  };

  async function addPictures(e) {
    console.log(inputList)
    e.preventDefault()
   await axios.post('/addPicture', {
      links: inputList,
      board: location.state.id
    }).then(res => {
      if (res.status === 200) {
        setLinksPopup(false)
        setThumbnails(thumbnails => [...thumbnails, ...inputList]);
        setUpdatePictures(res.data)
        setTimeout(() => {
          setUpdatePictures(false)
        }, 100);
        setPictures([...pictures, ...inputList.link]);
      }

    })
      .catch(err => console.log(err))

  }
  async function addArt(e) {
    console.log(inputList)
    e.preventDefault()
   await axios.post('/addArt', {
      links: inputList,
      board: location.state.id
    }).then(res => {
      if (res.status === 200) {
        setLinksPopup(false)
        setUpdatePictures(res.data)
        setTimeout(() => {
          setUpdatePictures(false)
        }, 100);
        setArt([...art, ...inputList]);
      }

    })
      .catch(err => console.log(err))

  }
  const handleKeyPress = (event, text) => {
    if (event.key === 'Enter') {
      event.currentTarget.setAttribute("contenteditable", false)
      console.log(boardName.current.textContent)
      axios.put(`/boards/${location.state.id}`, {
        name: boardName.current.textContent,

      }).catch(err => console.log(err))
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
                    <input autoFocus autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Paste a link" name="link" />
                  </li>
                )
              })}
            </ul>
            {error && <span>{error}</span>}
            <button onClick={handleAddClick}>Add</button>
            <button onClick={addPictures}>Submit</button>
          </section>
        </section>
      }
      {linksPopup && board.art &&
        <section onClick={closeImage} className='overlay'>
          <section className='modal'>
            <h2>Add art</h2>
            <ul className="links">
              {inputList && inputList.map((list, i) => {
                return (
                  <li key={i}>
                    <label for="link">Link</label>
                    <input required id='link' autoFocus autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Paste an image link" name="link" />
                    <label for="title">Title</label>
                    <input required id='title'  autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Title" name="title" />
                    <div className='flex'>
                      <div>
                    <label for="artist">Artist</label>
                    <input required id='artist'  autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Artist" name="artist" />
                    </div>
                    <div>
                    <label for="year">Year</label>
                    <input required id='year'  autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Year" name="year" />
                    
                    </div>
                    </div>
                    <label for="artistlink">Artist image link</label>
                    <input id='artistlink'  autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Add an artist image" name="artistlink" />
                    <label for="source">Source</label>
                    <input id='source'  autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Link to wiki" name="wiki" />
                    <label for="description">Description</label>
                    
                    <textarea id='description'  autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Description" name="description"></textarea>
                  </li>
                )
              })}
            </ul>
            <button onClick={handleAddMoreClick}>Add more</button>
            <button onClick={addArt}>Submit</button>
          </section>
        </section>
      }
      <header>
        <Link to='/profile'><img src={logo} alt="logo"></img></Link>
        <a onClick={() => viewImage(0)} href='/slideshow'>START SLIDESHOW</a>
      </header>
      <section className='board-pins'>
        <h2 autoCorrect='off' ref={boardName} contentEditable autoComplete onKeyPress={(e) => handleKeyPress(e, e.currentTarget.textContent)} >{board.name}</h2>
        <Masonry id={board._id} imageUrls={pictures} columnCount="4" />
        <button onClick={() => setLinksPopup(true)} className='addButton'><img src={plus}></img></button>
      </section>

    </>
  )
}

export default Home