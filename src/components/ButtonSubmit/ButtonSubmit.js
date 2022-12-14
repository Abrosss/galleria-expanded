import React from 'react'
import './Button.css';
function ButtonSubmit(props) {
  return (
    <button type="submit" className={`button ${props.class}`}>{props.text}</button>
  )
}

export default ButtonSubmit