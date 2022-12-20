import React from 'react'
import { useContext } from 'react';
import PopupContext from '../context/Popup';
import plus from '../shared/plus.svg'
function AddButton({ title }) {
    const { setLinksPopup } = useContext(PopupContext);

    function onButtonClick() {
        setLinksPopup(true)
        document.body.style.overflowY = "hidden"
    }

    return (
        <div className='addButtonContainer'>
            <button
                title={title}
                onClick={onButtonClick}
                className='addButton'>
                <img src={plus} alt='add icon'></img>
            </button>
        </div>
    )
}

export default AddButton