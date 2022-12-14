import React from 'react'
import logo from '../shared/logo.svg';
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import jwtDecode from 'jwt-decode'
import GoogleAuthButton from '../components/GoogleAuthButton'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Axios from 'axios'
function Header({page}) {
  console.log(page)
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem('board')))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')))
  const [isLoading, setIsLoading] = useState(false)
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
  const onSuccess = (response) => {

    console.log(response)
       // The response object is passed as an argument to the onSuccess function.
       // You can access it using the "response" argument.
    
       handleGoogle(jwtDecode(response.credential))
      
       // You can use the response object to get the user's profile information,
       // such as their name and email address.
     };
     const onFailure = (error) => {
       console.error('Failed to log in with Google!');
       console.error(error);
       // You can use the error object to handle the error and display an appropriate
       // message to the user.
     };
   
     const handleGoogle = (user) => {
       setIsLoading(true)
       Axios.post("http://localhost:5000/google-signup", {
   
         email: user.email,
         username: user.email.slice(0, user.email.indexOf("@")),
       }).then(res => {
         if (res.status === 200) {
           setUser(res.data)
           setIsLoading(false)
           localStorage.setItem('auth', JSON.stringify(res.data))
           navigate("/profile")
         }
   
       })
         .catch(err => {
           console.log(err)
           setIsLoading(true)
         })
     }
  return (
    <header>
        <Link to ='/profile'><img src={logo} alt="logo"></img></Link>
      {user ? <a onClick={handleLogout} href=''>Sign out</a> : <GoogleOAuthProvider
          clientId="730246444349-9hq6kctetsldg9sd6ssiiot1d476oje8.apps.googleusercontent.com"

        >
          <GoogleAuthButton onSuccess={onSuccess} onFailure={onFailure} />
        </GoogleOAuthProvider> }  
       {page !== 'boards' && <a onClick={() => viewImage(0)} href='/slideshow'>START SLIDESHOW</a>} 
    </header>
  )
}

export default Header