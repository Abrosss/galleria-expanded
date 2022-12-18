import React from 'react'

import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from '../api/axios'
import Axios from 'axios'
import GoogleAuthButton from '../components/GoogleAuthButton'
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwtDecode from 'jwt-decode'
function SignIn() {
  axios.defaults.withCredentials = true

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const auth = localStorage.getItem('auth');

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
    <main className='container'>
      <section className='signup'>
        <h2>Sign In</h2>

        <GoogleOAuthProvider
          clientId="730246444349-9hq6kctetsldg9sd6ssiiot1d476oje8.apps.googleusercontent.com"

        >
          <GoogleAuthButton onSuccess={onSuccess} onFailure={onFailure} />
        </GoogleOAuthProvider>
      </section>

    </main>
  )
}

export default SignIn