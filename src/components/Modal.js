import React from 'react'
import { useContext } from 'react';
import PopupContext from '../context/Popup';
import ArtToBeEditedContext from '../context/EditedArt';
function Modal({ title, children }) {
    const { linksPopup, setLinksPopup } = useContext(PopupContext);
    const {editPopup, setEditPopup} = useContext(ArtToBeEditedContext)
    const closePopup = (e) => {
        if (e.target.className === "overlay") {
          if (linksPopup) setLinksPopup(false)
          if (editPopup) setEditPopup(null)
          document.body.style.overflowY = "unset";
        }
    
      }
    return (
        <section onClick={closePopup} className="overlay">
            <section className="modal">
                <h2>{title}</h2>
                {children}
            </section>
        </section>
    )
}

export default Modal


