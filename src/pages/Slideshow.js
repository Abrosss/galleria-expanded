
import { useEffect, useState, useRef } from 'react';
import {useLocation} from 'react-router-dom';
import back from '../shared/icon-back-button.svg'
import next from '../shared/icon-next-button.svg'
import play from '../shared/play.svg'
import pause from '../shared/pause.svg'
import view from '../shared/icon-view-image.svg'
import gallery from '../data.json'
import logo from '../shared/logo.svg';
import {Link} from 'react-router-dom'
import axios from '../api/axios';
function Slideshow() {
  const location = useLocation();
 
  const [art, setArt] = useState(location.state.art)
  const [progress, setProgress] = useState(Math.round((art.i / (gallery.length - 1)) * 100))
  const [data, setData] = useState({img: "", i: 0})
  const [slideshow, setSlideshow] = useState(location.state.slide)
  const [index, setIndex] = useState(art.i)
  const [pictures, setPictures] = useState(location.state.pictures)
  const [secondsPerSlide, setSecondsPerSlide] = useState(4)
  const [board, setBoard] = useState([])

  const secondsInput = useRef()
  console.log(secondsPerSlide)
  useEffect(() => {
    if(board.art) {
      axios.get(`/art/${art.img.board}`).then((response) => {
    
        setPictures(response.data);
       
      });
    }
    else {
      axios.get(`/pictures/${art.img.board}`).then((response) => {
    
        setPictures(response.data);
       
      });
    }
    
  }, [board]);
  useEffect(() => {
  
    axios.get(`/boards/${art.img.board}`).then((response) => {
console.log(response.data[0])
      setBoard(response.data[0]);
    });
  }, []);
  const viewImage = (img, i) => {
    setData({img, i})
    document.body.style.overflowY = "hidden";
    setSlideshow(false)
  }
  const closeImage = (e) => {
    setData({img: "", i: 0})
    document.body.style.overflowY = "unset";
  }
  const action = (action) => {
   
   if(action === "next") {
    if(art.i>=pictures.length - 1) {
  
      setArt({img:pictures[0], i:0})
      setProgress(0)
    }
    else  {
      setArt({img:pictures[art.i+1], i:art.i+1})

      setProgress(Math.round(((art.i+1) / (pictures.length)) * 100))
    }
   
 
   } 
   if(action=== "previous") {
    if(art.i<=0) {
      setArt({img:pictures[pictures.length-1], i:pictures.length-1})
      setProgress(100 - 7)
    }
    else  {
      
      setArt({img:pictures[art.i-1], i:art.i-1})
      setProgress(Math.round(((art.i-1) / (pictures.length)) * 100))
    }
   }
   if( action === 'pause') {
    setSlideshow(false)
   }
   if( action === 'play') {
    setSlideshow(true)
   }
  }

  // useEffect(() => {
  //   setArt({img:gallery[index], i:index})
  // }, [index])
  var timeleft = 0;
  useEffect(() => {
   
 
    let  myInterval = setInterval(() => slider(secondsPerSlide),1000);
    return () => {
      clearInterval(myInterval)
    }
  },[slideshow, art])

function slider(secondsPerSlide) {
let total = secondsPerSlide * pictures.length
let second = 100/total
console.log(total)
  
    if (slideshow) {
      console.log(timeleft++)
      setProgress(prev => prev + second)
    } 
    
    if(timeleft> 0 && timeleft % secondsPerSlide === 0) {
     
      setArt({img:pictures[art.i+1], i:art.i+1})
      // setProgress(Math.round(((art.i+1) / (pictures.length)) * 100))
      if(art.i == (pictures.length - 1)) {  setArt({img:pictures[0], i:0})
      setProgress(0) } 
    

      
        
      
    }
  
}



  
  const slide = (e) => {
    e.preventDefault()
    setSlideshow(!slideshow)
    
  }

  function sliderDuration(e, seconds) {
    e.preventDefault()
    
    if(seconds == 0) setSlideshow(false)
    else setSecondsPerSlide(seconds)
    
    secondsInput.current.blur()
  }

  return (
    <>
    <section className='page'>
    {data.img && 
      <section onClick={closeImage} className='overlay'>
        <section className='zoom-image'>
          <img src={data.img.image} alt="art"></img>
          <span onClick={closeImage} className='close'>CLOSE</span>
        </section>
      </section>
      }
      <header>
        <Link to ='/'><img src={logo} alt="logo"></img></Link>
        <a onClick={slide} href='/slideshow'>START SLIDESHOW</a>
    </header>
    <section className='slideshow' >
      {/* <nav><Link to ={`/profile/${board._id}`}>{board.name}</Link></nav> */}
      {board && board.art ?
       <section className='slideshow-container '>
       <section className='image-container'>
       <div className="image-container__image">
       <img src={art.img.image} alt="art"   ></img>
       <div onClick={() => viewImage(art.img, art.i)} className='view-image'>
         <div><img src={view} alt="art"></img></div>
         <span>VIEW IMAGE</span>
       </div>
       
     </div>
     <div className='image-container__caption'>
         <div className='text'>
         <h2>{art.img.title && art.img.title}</h2>
         <p>{art.img.artist && art.img.artist.name}</p>
         </div>
         {art.img.artist.image && 
         <div className='artist'>
         <img src={art.img.artist.image} alt="artist"></img>
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
      :
      <section className='slideshow-container center'>
      <section className='image-container'>
      <div className="image-container__image">
      <img src={art.img.image} alt="art"   ></img>
      {/* <div onClick={() => viewImage(art.img, art.i)} className='view-image'>
        <div><img src={view} alt="art"></img></div>
        <span>VIEW IMAGE</span>
      </div> */}
    
    </div>
    {/* <div className='image-container__caption'>
        <div className='text'>
        <h2>{art.img.name}</h2>
        <p>{art.img.artist.name}</p>
        </div>
        <div className='artist'>
          <img src={art.img.artist.image} alt="artist"></img>
        </div>
      </div> */}
    </section>
    {/* <div className='description'>
      <span className='year'>{art.img.year}</span>
      <p>{art.img.description}</p>
      <div><a href={art.img.source} target="_blanc" className='button link'>GO TO SOURCE</a></div>
      
    </div> */}
    </section>}
  

  
    </section>
    {board.art ?
   <section className='progress-container '>
   <div class="progress">
       <div style={{flexBasis: progress + "%"}} class="progress__filled"></div>
      </div>
     <section className='slide-name'>
       <h4>{art.img.title}</h4>
       <p>{art.img.artist.name}</p>
     </section>

     <section className='controls'>
     <img className='button' onClick={() => action('previous')} src={back} alt="click previous"></img>
     {slideshow ? <img className='button' onClick={() => action('pause')} src={pause} alt="click play"></img> : <img className='button' onClick={() => action('play')} src={play} alt="click play"></img>} 

     <img className='button' onClick={() => action('next')} src={next} alt="click next"></img>
     </section>
   </section> :
    <section className='progress-container center'>
    <div class="progress">
        <div style={{flexBasis: progress + "%"}} class="progress__filled"></div>
       </div>
      {/* <section className='slide-name'>
        <h4>{art.img.name}</h4>
        <p>{art.img.artist.name}</p>
      </section> */}
           <section>
            <div className='changePerSlide'>Change a slide every 
              <form onSubmit={(e) => sliderDuration(e, secondsInput.current.value)}>
              <input ref={secondsInput} className='secondsPerSlide' placeholder={secondsPerSlide}></input>
              </form>
              seconds</div></section>
      <section className='controls'>
      <img className='button' onClick={() => action('previous')} src={back} alt="click previous"></img>
     {slideshow ? <img className='button' onClick={() => action('pause')} src={pause} alt="click play"></img> : <img className='button' onClick={() => action('play')} src={play} alt="click play"></img>} 
      <img className='button' onClick={() => action('next')} src={next} alt="click next"></img>
      </section>
    </section>
  }
    </section>
  </>
  )
}

export default Slideshow