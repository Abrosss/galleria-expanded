
import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import back from '../shared/icon-back-button.svg'
import next from '../shared/icon-next-button.svg'
import view from '../shared/icon-view-image.svg'
import gallery from '../data.json'
import logo from '../shared/logo.svg';
import {Link} from 'react-router-dom'
function Slideshow() {
  const location = useLocation();
 
  const [art, setArt] = useState(location.state.art)
  const [progress, setProgress] = useState(Math.round((art.i / (gallery.length - 1)) * 100))
  const [data, setData] = useState({img: "", i: 0})
  const [slideshow, setSlideshow] = useState(location.state.slide)
  const [index, setIndex] = useState(art.i)
 
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

    if(art.i>=gallery.length - 1) {
  
      setArt({img:gallery[0], i:0})
      setProgress(0)
    }
    else  {
      setArt({img:gallery[art.i+1], i:art.i+1})

      setProgress(Math.round(((art.i+1) / (gallery.length)) * 100))
    }
   
 
   } 
   if(action=== "previous") {
    if(art.i<=0) {
      setArt({img:gallery[gallery.length-1], i:gallery.length-1})
      setProgress(100 - 7)
    }
    else  {
      
      setArt({img:gallery[art.i-1], i:art.i-1})
      setProgress(Math.round(((art.i-1) / (gallery.length)) * 100))
    }
   }
  }

  useEffect(() => {
    setArt({img:gallery[index], i:index})
  }, [index])
  useEffect(() => {
    let myInterval
  let index
  if(Math.round(progress) % 6 === 0) {
    index = (Math.floor(progress) * gallery.length)/ 100
    setIndex(Math.floor(index))
  } 
    myInterval = setInterval(() => {
      if (slideshow) {
        setProgress(progress + .1)
      } 
      if(Math.round(progress) === 101) {
       
          setProgress(0)
        
        
      }
      
    }, 100)
    return () => {
      clearInterval(myInterval)
    }
  },[progress, slideshow])
  const slide = (e) => {
    e.preventDefault()
    setSlideshow(true)
    
  }

  return (
    <>
    {data.img && 
      <section onClick={closeImage} className='overlay'>
        <section className='zoom-image'>
          <img src={data.img.images.gallery} alt="art"></img>
          <span onClick={closeImage} className='close'>CLOSE</span>
        </section>
      </section>
      }
      <header>
        <Link to ='/'><img src={logo} alt="logo"></img></Link>
        <a onClick={slide} href='/slideshow'>START SLIDESHOW</a>
    </header>
    <section className='slideshow' >
      
    <section className='slideshow-container'>
      <section className='image-container'>
      <div className="image-container__image">
      <img src={art.img.images.hero.large} alt="art"   ></img>
      <div onClick={() => viewImage(art.img, art.i)} className='view-image'>
        <div><img src={view} alt="art"></img></div>
        <span>VIEW IMAGE</span>
      </div>
    
    </div>
    <div className='image-container__caption'>
        <div className='text'>
        <h2>{art.img.name}</h2>
        <p>{art.img.artist.name}</p>
        </div>
        <div className='artist'>
          <img src={art.img.artist.image} alt="artist"></img>
        </div>
      </div>
    </section>
    <div className='description'>
      <span className='year'>{art.img.year}</span>
      <p>{art.img.description}</p>
      <div><a href={art.img.source} target="_blanc" className='button link'>GO TO SOURCE</a></div>
      
    </div>
    </section>
    <section className='progress-container'>
    <div class="progress">
        <div style={{flexBasis: progress + "%"}} class="progress__filled"></div>
       </div>
      <section className='slide-name'>
        <h4>{art.img.name}</h4>
        <p>{art.img.artist.name}</p>
      </section>
      <section className='controls'>
      <img className='button' onClick={() => action('previous')} src={back} alt="click previous"></img>
      <img className='button' onClick={() => action('next')} src={next} alt="click next"></img>
      </section>
    </section>
    </section>
  </>
  )
}

export default Slideshow