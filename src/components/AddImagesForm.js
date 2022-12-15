import React from 'react'
import { useState } from 'react';
function AddImagesForm({isArt,  addPictures, inputList, setInputList}) {
    const [error, setError] = useState(null)
   
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
    
        const list = [...inputList];
        list[index][name] = value;
    
      };
      const handleAddClick = (e) => {
        e.preventDefault()
        if (inputList.length < 6) setInputList([...inputList, {}]);
        else setError('you cannot add more')
    
      };
  return (
    <>
     <ul className="links">
            {inputList && inputList.map((list, i) => {
              const inputProps = {
                autoComplete: 'off',
                onChange: e => handleInputChange(e, i),
              };
              return (
                <li key={i}>
                  <input {...inputProps} autoFocus className='input' type="text" placeholder="Paste a link" name="link" />
                </li>
              )
            })}
          </ul>
          {error && <span>{error}</span>}
          <button className='addMoreLinks' onClick={handleAddClick}>Add more images</button>
          <button onClick={addPictures}>Submit</button>
    </>

   
  )
}

export default AddImagesForm