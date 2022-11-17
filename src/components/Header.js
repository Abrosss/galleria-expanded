import React from 'react'
import logo from '../shared/logo.svg';
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';

function Header() {
  
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem('board')))
  
  
  const navigate = useNavigate();
  const viewImage = (i) => {

let img = boards[0].links[0]
console.log(img)
    navigate('/slideshow',{state: {
      art:{img, i},
      slide: true

    }
      });

  }
  return (
    <header>
        <Link to ='/profile'><img src={logo} alt="logo"></img></Link>
        <a onClick={() => viewImage(0)} href='/slideshow'>START SLIDESHOW</a>
    </header>
  )
}

export default Header