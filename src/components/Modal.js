import React from 'react'

function Modal({ title, children, onClose }) {
    return (
        <section onClick={onClose} className="overlay">
            <section className="modal">
                <h2>{title}</h2>
                {children}
            </section>
        </section>
    )
}

export default Modal


