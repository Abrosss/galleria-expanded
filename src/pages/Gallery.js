import { useEffect, useRef, useState } from 'react';

import Masonry from '../components/Masonry2';
import MasonryArt from '../components/MasonryArt'
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
  const [active, setActive] = useState(0)
  const navigate = useNavigate();
  const toggle = (i) => {
    if (active === i)
      return setActive(null)
    setActive(i)

  }

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

    if (location.state.art) {

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
    if (inputList.length < 6) setInputList([...inputList, {}]);
    else setError('you cannot add more')

  };
  const handleAddMoreClick = (e) => {
    e.preventDefault()
    
    if (Object.keys(inputList[active]).length === 0) return
    setInputList([...inputList, {}]);
    setActive(prev => prev + 1)

    

  };

  const boardName = useRef(null)
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...inputList];
    list[index][name] = value;

  };

  async function addPictures(e) {

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
        setInputList([{}])
      }

    })
      .catch(err => console.log(err))

  }
  async function addArt(e) {
 
    e.preventDefault()
   let notDone = inputList.filter(list => !list.link )
   if (notDone.length > 0) return
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
        setInputList([{}])
      }

    })
      .catch(err => console.log(err))

  }
  const handleKeyPress = (event, text) => {
    if (event.key === 'Enter') {
      event.currentTarget.setAttribute("contenteditable", false)
      
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
            <h2>Add a picture</h2>
            <ul className="links">
              {inputList && inputList.map((list, i) => {
                return (
                  <li key={i}>
                    <h1 onClick={() => toggle(i)}><span>{i + 1}.</span><span className='title'>{list.title}</span></h1>
                    <form className={i === active ? "show" : ""}>
                      <input autoFocus required id='title' autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Title" name="title" />
                      <input required id='link'  autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Image link" name="link" />
                      <textarea maxLength="840" id='description' autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Description" name="description"></textarea>
                     


                      <div className='flex'>
                        <div>

                          <input required id='artist' autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Artist name" name="artist" />
                        </div>
                        <div>

                          <input required id='year' autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Year" name="year" />

                        </div>
                      </div>

                      <input id='artistlink' autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Artist image link (optional)" name="artistlink" />

                      <input id='source' autoComplete='off' className='input' onChange={e => handleInputChange(e, i)} type="text" placeholder="Source link (wiki)" name="wiki" />



                    </form>
                  </li>
                )
              })}
            </ul>
            <div className='buttons'>
              <button onClick={handleAddMoreClick}>Add more</button>
              <button onClick={addArt}>Submit</button>
            </div>

          </section>
        </section>
      }
      <header>
        <Link to='/profile'><img src={logo} alt="logo"></img></Link>
        <a onClick={() => viewImage(0)} href='/slideshow'>START SLIDESHOW</a>
      </header>
      <section className='board-pins'>
        <h2 autoCorrect='off' ref={boardName} contentEditable autoComplete onKeyPress={(e) => handleKeyPress(e, e.currentTarget.textContent)} >{board.name}</h2>
        {board.art ? <MasonryArt id={board._id} imageUrls={pictures} columnCount="4" /> : <Masonry id={board._id} imageUrls={pictures} columnCount="4" />}

        <button onClick={() => setLinksPopup(true)} className='addButton'><img src={plus}></img></button>
      </section>

    </>
  )
}

export default Home