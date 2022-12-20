import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import trash from '../shared/trash.svg'

function ImageCard({ img, index, deletePicture }) {

    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')))

    const viewImage = (img, i, e) => {

        if (!e.target.dataset.id) {

            navigate('/slideshow', {
                state: {
                    art: { img, i },
                    slide: false
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
                        <img data-id={img._id} src={trash} alt='delete picture icon'></img></div>
                }


                <img className='img' src={img.image} alt="main picture"></img>

            </div>
        </div>
    )
}

export default ImageCard