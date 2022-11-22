import React from 'react'
import axios from '../api/axios';
import { useState, useEffect } from 'react';
function Thumbnail({id, art}) {
    const [pictures, setPictures] = useState([])

    useEffect(() => {
      if(art) {
        axios.get(`/art/${id}`).then((response) => {
          if(response.data.length >= 4) {
              setPictures(response.data.slice(0, 4))
          }
        else setPictures(response.data);
      });
      }
      else {
        axios.get(`/pictures/${id}`).then((response) => {
          if(response.data.length >= 4) {
              setPictures(response.data.slice(0, 4))
          }
        else setPictures(response.data);
      });
      }
       
      }, []);
      console.log(pictures)
  return (
    <>
    {pictures && pictures.map(pic => (
        <img src={pic.image}></img>
    ))}
    </>
  )
}

export default Thumbnail