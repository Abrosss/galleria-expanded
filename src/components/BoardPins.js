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
import AddImagesForm from '../components/AddImagesForm';
function BoardPins({ id, board, pictures, setPictures, setUpdatePictures }) {
    const boardName = useRef(null)

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')))
    const { linksPopup, setLinksPopup } = useContext(PopupContext);
    const { editPopup, setEditPopup } = useContext(ArtToBeEditedContext)

    const [inputList, setInputList] = useState([{}]);

    const [art, setArt] = useState([])
    const [editedArt, setEditedArt] = useState({})
    const inputProps = {
        autoComplete: 'off',
        onChange: e => handleInputChangeEditArt(e),
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
        let notDone = inputList.filter(list => !list.link)
        if (notDone.length > 0) return
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

    const handleInputChangeEditArt = (e) => {
        const { name, value } = e.target;

        editedArt[name] = value;

    };
    return (
        <>
            {linksPopup &&
                <Modal title="Add images">
                    <AddImagesForm isArt={false} addPictures={addPictures} inputList={inputList} setInputList={setInputList} />
                </Modal>

            }
            {linksPopup && board.art &&
                <Modal title="Add images">
                    <AddImagesForm isArt={true} addPictures={addArt} inputList={inputList} setInputList={setInputList} />
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