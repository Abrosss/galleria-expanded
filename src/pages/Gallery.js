import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'
import logo from '../shared/logo.svg';
import axios from '../api/axios'
import { EditedArtComponent } from '../context/EditedArt';
import BoardPins from '../components/BoardPins';
function Gallery() {
  const location = useLocation();
  const [board, setBoard] = useState([])
  const [pictures, setPictures] = useState([])
  const [updatePictures, setUpdatePictures] = useState(false)
  const navigate = useNavigate();
  const viewImage = (i) => {

    let img = pictures[0]

    navigate('/slideshow', {
      state: {
        art: { img, i },
        pictures: pictures,
        slide: true

      }
    });

  }

  useEffect(() => {
    //make sure the board is loaded
    console.log(board)
    if (board._id !== undefined) {
      axios.put(`/boards/thumbnails/${board._id}`, {
        thumbnails: pictures.slice(0, 4)

      }).catch(err => console.log(err))
    }

  }, [board, pictures])

  async function fetchData(id, state) {
    let url = '/pictures/' + id;
    if (state === true) {
      url = '/art/' + id;
    }
    return axios.get(url).then(response => response.data);
  }
  useEffect(() => {
    fetchData(location?.state.id, location?.state.art).then(data => {
      setPictures(data);
    });
  }, [updatePictures]);

  useEffect(() => {

    axios.get(`/boards/${location?.state.id}`).then((response) => {

      setBoard(response.data[0]);
    });
  }, []);

  return (
    <>

      <header>
        <Link to='/profile'><img src={logo} alt="logo"></img></Link>
        {pictures.length > 1 && <a onClick={() => viewImage(0)} href='/slideshow'>START SLIDESHOW</a>}
      </header>

      <EditedArtComponent>
        <BoardPins id={location?.state.id} board={board} pictures={pictures} setPictures={setPictures} setUpdatePictures={setUpdatePictures} />
      </EditedArtComponent>
    </>
  )
}

export default Gallery