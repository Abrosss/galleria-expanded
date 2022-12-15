import React from 'react'
import { useState } from 'react';
import ArtPictureForm from './ArtPictureForm';
function AddImagesForm({isArt,  addPictures, inputList, setInputList}) {
    const [error, setError] = useState(null)
    const [active, setActive] = useState(0)
    const toggleActive = (i) => {
        if (active === i)
          return setActive(null)
        setActive(i)
    
      }
      const handleAddMoreClick = (e) => {
        e.preventDefault()
    
        if (Object.keys(inputList[active]).length === 0) return
        setInputList([...inputList, {}]);
        setActive(prev => prev + 1)
    
    
    
      };
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
    {isArt ?
    <>
    <ul className="links">
           {inputList && inputList.map((list, i) => {
             const inputProps = {
               autoComplete: 'off',
               onChange: e => handleInputChange(e, i),
             };
             return (
               <li key={i}>
                 <h1><span onClick={() => toggleActive(i)}>{i + 1}.</span><input {...inputProps} autoFocus required id='title' className='input' type="text" placeholder="Title" name="title" /></h1>
                 <ArtPictureForm
                   inputProps={inputProps}
                   active={i === active}
                   toBeEdited={false}
                 />
               </li>
             )
           })}
         </ul>
         <div className='buttons'>
           <button className='addMoreLinks' onClick={handleAddMoreClick}>Add more images</button>
           <button onClick={addPictures}>Submit</button>
         </div>
   </>
    :
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
}

    </>

  )
}

export default AddImagesForm