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
  const [active, setActive] = useState(0)

  const navigate = useNavigate();
  const toggleActive = (i) => {
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
    axios.put(`/boards/thumbnails/${board._id}`, {
      thumbnails: pictures.slice(0, 4)

    }).catch(err => console.log(err))
  }, [pictures])

  async function fetchData(id, state) {
    let url = '/pictures/' + id;
    if (state === true) {
      url = '/art/' + id;
    }
    return axios.get(url).then(response => response.data);
  }
  useEffect(() => {

    fetchData(location.state.id, location.state.art).then(data => {
      setPictures(data);
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
    try {
      const response = await axios.post('/addPicture', {
        links: inputList,
        board: location.state.id,
      });
      if (response.status === 200) {
        updateState(response.data, inputList, 'pictures');
      }


    } catch (err) {

      console.error(err);
    }
   

  }
  async function addArt(e) {

    e.preventDefault()
    let notDone = inputList.filter(list => !list.link)
    if (notDone.length > 0) return
    try {
      const response = await axios.post('/addArt', {
        links: inputList,
        board: location.state.id,
      });
      if (response.status === 200) {
        updateState(response.data, inputList, 'art');
      }


    } catch (err) {

      console.error(err);
    }
  }

  function updateState(responseData, inputList, stateVar) {
    setLinksPopup(false);
    setUpdatePictures(responseData);
    setTimeout(() => {
      setUpdatePictures(false);
    }, 100);
    if (stateVar === 'pictures') {
      const newPictures = [...pictures, ...inputList.link]
      setPictures(newPictures);
    } else if (stateVar === 'art') {
      setArt([...art, ...inputList]);
    }
    setInputList([{}]);
  }
  const handleBoardNameKeyPress = (event, text) => {
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
                const inputProps = {
                  autoComplete: 'off',
                  onChange: e => handleInputChange(e, i),
                };
                return (
                  <li key={i}>
                    <input {...inputProps} autoFocus className='input' type="text" placeholder="Paste a link" name="link" />
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
                const inputProps = {
                  autoComplete: 'off',
                  onChange: e => handleInputChange(e, i),
                };
                return (
                  <li key={i}>
                    <h1 onClick={() => toggleActive(i)}><span>{i + 1}.</span><span className='title'>{list.title}</span></h1>
                    <form className={i === active ? "show" : ""}>
                      <input {...inputProps} autoFocus required id='title' className='input' type="text" placeholder="Title" name="title" />
                      <input {...inputProps} required id='link' className='input' type="text" placeholder="Image link" name="link" />
                      <textarea {...inputProps} maxLength="840" id='description' className='input' type="text" placeholder="Description" name="description"></textarea>

                      <div className='flex'>
                        <>

                          <input {...inputProps} required id='artist' className='input' type="text" placeholder="Artist name" name="artist" />
                        </>
                        <div>

                          <input {...inputProps} required id='year' className='input' type="text" placeholder="Year" name="year" />

                        </div>
                      </div>

                      <input {...inputProps} id='artistlink' className='input' type="text" placeholder="Artist image link (optional)" name="artistlink" />

                      <input {...inputProps} id='source' className='input' type="text" placeholder="Source link (wiki)" name="wiki" />



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
        <h2 autoCorrect='off' ref={boardName} contentEditable autoComplete onKeyPress={(e) => handleBoardNameKeyPress(e, e.currentTarget.textContent)} >{board.name}</h2>
        {board.art ? <MasonryArt id={board._id} imageUrls={pictures} columnCount="4" /> : <Masonry id={board._id} imageUrls={pictures} columnCount="4" />}

        <button onClick={() => setLinksPopup(true)} className='addButton'><img src={plus}></img></button>
      </section>

    </>
  )
}

export default Home