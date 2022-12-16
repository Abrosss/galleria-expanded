import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../api/axios';
import trash from '../shared/trash.svg'
function ImageCard({pics, img, index, setPics}) {

    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null)
      const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')))
    const viewImage = (img, i, e) => {
        console.log(i)
        if (!e.target.dataset.id) {
            navigate('/slideshow', {
                state: {
                    art: { img, i },
                    slide: false
                }
            });
        }


    }
    async function deleteBoard(id) {

        try {
            const updatedPics = pics.filter(pic => pic._id !== id);
            await axios.delete(`/pictures/${id}`)
                .then(res => {
                    if (res.status === 200) {
                        setPics(updatedPics)
                    }
                })
                .catch(err => console.log(err))


        } catch (err) {
            console.log(err);
        }

    }
    return (
        <div onClick={(e) => viewImage(img, index, e)} key={index} className="image">

            <div onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} className='image-container'>
             
                    <div data-id={img._id} onClick={() => deleteBoard(img._id, img.board)} className={hovered === index ? 'trash show' : 'trash'}><img data-id={img._id} src={trash}></img></div>
                
                <img className='img' src={img.image} alt="thumbnail"   ></img>

            </div>
        </div>
    )
}

export default ImageCard