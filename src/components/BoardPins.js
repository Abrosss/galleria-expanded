import React from 'react'
import { useRef } from 'react'
import axios from '../api/axios'
import Masonry from '../components/Masonry';
import AddButton from '../components/AddButton'
import { useState } from 'react';
import { useContext } from 'react';

import Modal from '../components/Modal'
import ArtPictureForm from '../components/ArtPictureForm';
import PopupContext from '../context/Popup';
import ArtToBeEditedContext from '../context/EditedArt';
function BoardPins({id, board, pictures, setPictures, setUpdatePictures}) {
    const boardName = useRef(null)
  
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')))
    const { linksPopup, setLinksPopup } = useContext(PopupContext);
    const {editPopup, setEditPopup} = useContext(ArtToBeEditedContext)
    const [active, setActive] = useState(0)
    const [inputList, setInputList] = useState([{}]);
    const [error, setError] = useState(null)
    const [art, setArt] = useState([])
    const [editedArt, setEditedArt] = useState({})
    const inputProps = {
        autoComplete: 'off',
        onChange: e => handleInputChangeEditArt(e),
      };
      
    const handleAddClick = (e) => {
        e.preventDefault()
        if (inputList.length < 6) setInputList([...inputList, {}]);
        else setError('you cannot add more')
    
      };
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
    
    
      function editArt(e, id) {
    
        let artist = {
          name: editedArt.artist,
          image: editedArt.artistlink
        }
        let updatedArt = { ...editedArt, artist }
        e.preventDefault()
        axios.put(`/art/${id}`, {
          updatedArt: updatedArt
    
        }).then(res => {
          if (res.status === 200) {
    
            setPictures(pictures.map(pic => pic._id === id ? res.data : pic));
            setEditPopup(null)
          }
    
        })
    
    
          .catch(err => console.log(err))
      }
      async function addPictures(e) {

        e.preventDefault()
        try {
          const response = await axios.post('/addPicture', {
            links: inputList,
            board: id,
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
            board: id,
          });
          if (response.status === 200) {
    
            updateState(response.data, inputList, 'art');
          }
    
    
        } catch (err) {
    
          console.error(err);
        }
      }
    const handleBoardNameKeyPress = (event, text) => {
        if (event.key === 'Enter') {
          event.currentTarget.setAttribute("contenteditable", false)
    
          axios.put(`/boards/${id}`, {
            name: boardName.current.textContent,
    
          }).catch(err => console.log(err))
          setTimeout(() => {
            boardName.current.setAttribute("contenteditable", true)
          }, 0);
    
        }
      }
      const toggleActive = (i) => {
        if (active === i)
          return setActive(null)
        setActive(i)
    
      }
     
      const handleAddMoreClick = (e) => {
        e.preventDefault()
    
        if (Object.keys(inputList[active]).length === 0) return
        setInputList([...inputList, {}]);
        setActive(prev => prev + 1)
    
    
    
      };
      const handleInputChange = (e, index) => {
        const { name, value } = e.target;
    
        const list = [...inputList];
        list[index][name] = value;
    
      };
      const handleInputChangeEditArt = (e) => {
        const { name, value } = e.target;
    
        editedArt[name] = value;
    
      };
  return (
    <>
     {linksPopup &&
        <Modal title="Add images">
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
          <button className='addMoreLinks' onClick={handleAddClick}>Add more images</button>
          <button onClick={addPictures}>Submit</button>

        </Modal>

      }
      {linksPopup && board.art &&
        <Modal title="Add images">
          <ul className="links">
            {inputList && inputList.map((list, i) => {
              const inputProps = {
                autoComplete: 'off',
                onChange: e => handleInputChange(e, i),
              };
              return (
                <li key={i}>
                  <h1><span onClick={() => toggleActive(i)}>{i + 1}.</span><input {...inputProps} autoFocus required id='title' className='input' type="text" placeholder="Title" name="title" /></h1>
                  <ArtPictureForm
                    inputProps={inputProps}
                    active={i === active}
                    toBeEdited={false}
                  />
                </li>
              )
            })}
          </ul>
          <div className='buttons'>
            <button className='addMoreLinks' onClick={handleAddMoreClick}>Add more images</button>
            <button onClick={addArt}>Submit</button>
          </div>
        </Modal>

      }
       {editPopup &&
        <Modal title="Edit a picture">
          <ArtPictureForm
            inputProps={inputProps}
            editedArt={editPopup}
          />


          <div className='buttons'>
            <button onClick={(e) => editArt(e, editPopup._id)}>Edit</button>
          </div>

        </Modal>

      }
     <section className='board-pins'>
        <h2
          autoCorrect='off'
          ref={boardName}
          contentEditable
          autoComplete
          onKeyPress={(e) => handleBoardNameKeyPress(e, e.currentTarget.textContent)} >{board.name}</h2>
             
             <Masonry art={board.art} id={board._id} imageUrls={pictures} columnCount="4" />
        
        
        {user && <AddButton />}

      </section>
    </>
   
  )
}

export default BoardPins