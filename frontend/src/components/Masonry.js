



import axios from '../api/axios';
import { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import ImageCardArt from './ImageCardArt';
import ArtToBeEditedContext from '../context/EditedArt';
import { EditedArtComponent } from '../context/EditedArt';
function Masonry(props) {
  const [pics, setPics] = useState(props.imageUrls)

  useEffect(() => {
    setPics(props.imageUrls);
  }, [props.imageUrls])

  useEffect(() => {
    axios.put(`/boards/thumbnails/${props.id}`, {
      thumbnails: pics.slice(0, 4)

    }).catch(err => console.log(err))
  }, [pics])

  async function deletePicture(id) {

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
  async function deleteArt(id) {

    try {
      const updatedPics = pics.filter(pic => pic._id !== id);


      await axios.delete(`/art/${id}`)
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
    <>

      <div className='masonry'>
        {pics.map((img, i) => (
          props.art ?
            <ImageCardArt
              img={img}
              index={i}
              deletePicture={deleteArt}
            />
            :
            <ImageCard
              img={img}
              index={i}
              deletePicture={deletePicture}
            />

        ))}
      </div>
    </>
  )
}

export default Masonry