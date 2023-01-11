import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import trash from '../shared/trash.svg'
import { LazyLoadImage } from "react-lazy-load-image-component";

function ImageCard({ img, index, deletePicture, pictures }) {

    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')))

    const viewImage = (img, i, e) => {

        if (!e.target.dataset.id) {

            navigate('/slideshow', {
                state: {
                    art: { img, i },
                    slide: false,
                    pictures:pictures
                }
            });
        }


    }

    function onMouseEnter(index) {
        setHovered(index)
    }

    function onMouseLeave() {
        setHovered(null)
    }

    return (

        <div
            onClick={(e) => viewImage(img, index, e)}
            key={index}
            className="image">

            <div
                onMouseEnter={() => onMouseEnter(index)}
                onMouseLeave={onMouseLeave}
                className='image-container'>

                {user &&
                    <div
                        data-id={img._id}
                        onClick={() => deletePicture(img._id)}
                        className={hovered === index ? 'trash show' : 'trash'}>
                        <LazyLoadImage data-id={img._id} src={trash} alt='delete picture icon'></LazyLoadImage></div>
                }


                <LazyLoadImage className='img' src={img.image} alt="main picture" effect="blur"></LazyLoadImage>

            </div>
        </div>
    )
}

export default ImageCard