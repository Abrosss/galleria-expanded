import React from 'react'

function Popup({img, setImg}) {
    const closeImage = (e) => {
        setImg({ img: "", i: 0 })
        document.body.style.overflowY = "unset";
    }
    return (
        <section onClick={closeImage} className='overlay'>
            <section className='zoom-image'>
                <img src={img.img.image} alt="art" loading="lazy"></img>
                <span onClick={closeImage} className='close'>CLOSE</span>
            </section>
        </section>
    )
}

export default Popup