import { useEffect, useState } from 'react';
import Header from '../components/Header';
import plus from '../shared/plus.svg'
import dots from '../shared/dots.svg'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom';
import Thumbnail from '../components/Thumbnail';
function Home() {
  const navigate = useNavigate()
  
    // Create an object to store all the different pieces of state
    const [state, setState] = useState({
      popup: false,
      editPopup: null,
      user: JSON.parse(localStorage.getItem('auth')),
      name: null,
      boards: [],
      artCollection: false,
      hovered: null,
      settingsPopup: null,
    })
  
    // Use destructuring to extract the different pieces of state
    const { popup, editPopup, user, name, boards, artCollection, hovered, settingsPopup } = state
  
 

  useEffect(() => {
   
      axios.get(`/allboards/${user._id}`).then((response) => {
   
        setState(prevState => ({
          ...prevState,
          boards: response.data,
   
        }))
      });
    

   
  }, [user]);


  const closeImage = (e) => {
    if (e.target.className === "overlay") {
      setState({
        ...state,  
        popup: false,  
        editPopup: null,  
      })
      document.body.style.overflowY = "unset";
    }

  }

  function addBoard(e) {
    e.preventDefault()
    setState({
      ...state,  
      popup: false,  
   
    })

    axios.post('/addBoard', {
      name: name,
      art: artCollection,
      user: user._id
    }).then(res => {
      if (res.status === 200) {
        
        setState({
          ...state,
          boards: [...boards, res.data],
        });
        navigate(`/profile/${res.data}`, {
          state: {
            id: res.data,
            art: artCollection
          }
        });
        localStorage.setItem('boards', JSON.stringify(boards));
      }

    })
      .catch(err => console.log(err))
  }

  async function deleteBoard(id) {
  
    try {

      const updatedBoards = boards.filter(board => board._id !== id);
      await axios.delete(`/boards/${id}`)
        .then(res => {
          if (res.status === 200) {
     
            setState({
              ...state,
              boards: updatedBoards,
            });
          }
        })
        .catch(err => console.log(err))


    } catch (err) {
      console.log(err);
    }

  }
  const OnCheckboxClick = (e) => {
    if (e.target.checked) {
      setState({
        ...state,
        artCollection: true,
      });
    
    }
    else {
      setState({
        ...state,
        artCollection: false,
      });
     
    }
  }
  function editBoard(e, id) {
    e.preventDefault()
    axios.put(`/boards/${id}`, {
      name: name,
      art: artCollection

    }).then(res => {
      if (res.status === 200) {
 
        setState({
          ...state,
          boards: boards.map(board => board._id === id ? res.data : board),  // update the relevant board in the boards array
          editPopup: null,  // update the editPopup value
        });
      }

    })
    
    
    .catch(err => console.log(err))
  }


  return (
    <>
      {popup &&
        <section onClick={closeImage} className='overlay'>
          <form onSubmit={addBoard} className='modal'>
            <h2>Create a board</h2>
            <label htmlFor='boardName'>Name</label>
            <input autoFocus onChange={(e) => setState({
  ...state,
  name: e.target.value
})} autoComplete='off' id='boardName' type="text" placeholder='Board name'></input>
            <div className='checklist'>
              <label class="wrapper">
                <input onClick={(e) => OnCheckboxClick(e)} type="checkbox" id="checkbox" />
                <span class="left"></span>
                <span class="right"></span>
              </label>
              <span className={artCollection ? 'selected' : ''}>art collection</span>
            </div>
            <button disabled={!name}>Create</button>
          </form>
        </section>
      }
      {editPopup &&
        <section onClick={closeImage} className='overlay'>
          <form onSubmit={(e) => editBoard(e, editPopup._id)} className='modal'>
            <h2>Edit the board</h2>
            <label htmlFor='boardName'>Name</label>
            <input autoFocus onChange={(e) => setState({
  ...state,
  name: e.target.value
})} value={!name ? editPopup.name : name} autoComplete='off' id='boardName' type="text" placeholder={editPopup.name}></input>
           
            <button>Edit</button>
          </form>
        </section>
      }
      <section className='page'>
        <Header page={'boards'} />
        <section className='container'>
          {boards && boards.map((board, index) => (
            <section onMouseEnter={() =>    setState({
              ...state,
              hovered: index,
            })} onMouseLeave={() => {
              setState({
                ...state,
                hovered: null,
                settingsPopup: null
              })
           
              }} key={index} className='cardContainer'>
              
              {user && 
              <div data-id={board._id} onClick={() => setState({
                ...state,
                settingsPopup: settingsPopup === null ? index : null,  // update the settingsPopup value
              })} className={hovered === index ? 'settings show' : 'settings'}><img data-id={board._id} src={dots}></img>
                  <ul className={settingsPopup === index ? ' settingsPopup show' : 'settingsPopup'}>
                    <li onClick={() => setState({
                ...state,
                editPopup: board,
             
              }) }>Edit</li>
                    <li onClick={() => deleteBoard(board._id)}>Delete</li>
                  </ul>
  
                </div>
              }
              
              <section onClick={() => navigate(`/profile/${board._id}`, {
                state: {
                  id: board._id,
                  art: board.art
                }
              })} className='card'>
                <div className='thumbnails'>

                  {boards && <Thumbnail thumbs={board.thumbnails} art={board.art} id={board._id} />}
                </div>
              </section>
              <span className='boardName'>{board.name}</span>
            </section>
          ))}
          {user && 
          <div className='addButtonContainer'>
          <button onClick={() => setState({
                ...state,
                popup: true,
        
              }) } title='Create a board' className='addButton'>
            <img src={plus}></img>
          </button>
        </div>
          }
          
        </section>
      </section>
    </>
  )
}

export default Home