import React from 'react'
import { useContext } from 'react';
import PopupContext from '../context/Popup';
import plus from '../shared/plus.svg'
function AddButton() {
    const {linksPopup, setLinksPopup } = useContext(PopupContext);
    console.log(linksPopup)
    return (
        <div className='addButtonContainer'>
            <button onClick={() => {
                setLinksPopup(true)
                document.body.style.overflowY = "hidden"
            }} className='addButton'><img src={plus}></img></button></div>
    )
}

export default AddButton