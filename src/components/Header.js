import React from 'react'
import logo from '../shared/logo.svg';
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';

function Header({page}) {
  console.log(page)
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem('board')))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')))
  
  const navigate = useNavigate();
  const viewImage = (i) => {

let img = boards[0].links[0]
console.log(user)
    navigate('/slideshow',{state: {
      art:{img, i},
      slide: true

    }
      });

  }
  const handleLogout = () => {
    localStorage.removeItem('auth')
    setUser(null)
  }
  return (
    <header>
        <Link to ='/profile'><img src={logo} alt="logo"></img></Link>
      {user ? <a onClick={handleLogout} href='/logout'>Sign out</a> : <a href='/signin'>Sign in</a> }  
       {page !== 'boards' && <a onClick={() => viewImage(0)} href='/slideshow'>START SLIDESHOW</a>} 
    </header>
  )
}

export default Header