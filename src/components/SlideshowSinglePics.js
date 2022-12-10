import React from 'react'
function SlideshowSinglePics({ art }) {


    return (
        <section className='slideshow' >
            <section className='slideshow-container-center'>
                <section className='image-container'>
                    <div className="image-container__image">
                        <img src={art.img.image} alt="art"   ></img>
                    </div>

                </section>

            </section>
        </section>
    )
}

export default SlideshowSinglePics