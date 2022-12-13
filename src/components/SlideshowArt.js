import React from 'react'
import { useState } from 'react';
import view from '../shared/icon-view-image.svg'
import Popup from './Popup';
function SlideshowArt({ art, setSlideshow }) {
    const [data, setData] = useState({ img: "", i: 0 })
    const viewImage = (img, i) => {
        setData({ img, i })
        document.body.style.overflowY = "hidden";
        setSlideshow(false)
    }
    
    return (
        <>
            {data.img &&
            <Popup img ={data} setImg ={setData}/>
              
            }
            <section className='slideshow' >
                <section className='slideshow-container '>
                    <section className='image-container'>
                        <div className="image-container__image">
                            <img src={art?.img?.image} alt="art"   ></img>
                            <div onClick={() => viewImage(art.img, art.i)} className='view-image'>
                                <div><img src={view} alt="art"></img></div>
                                <span>VIEW IMAGE</span>
                            </div>

                        </div>
                        <div className='image-container__caption'>
                            <div className='text'>
                                <h2>{art?.img?.title}</h2>
                                <p>{art?.img?.artist?.name}</p>
                            </div>
                            {art?.img?.artist?.image &&
                                <div className='artist'>
                                    <img src={art?.img?.artist?.image} alt="artist"></img>
                                </div>
                            }

                        </div>
                    </section>

                    <div className='description'>
                        <span className='year'>{art.img.year && art.img.year}</span>
                        <p>{art.img.description && art.img.description}</p>
                        {art.img.source &&
                            <div><a href={art.img.source} target="_blanc" className='button link'>GO TO SOURCE</a></div>
                        }


                    </div>
                </section>
            </section>
            
        </>

    )
}

export default SlideshowArt