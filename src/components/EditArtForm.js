import React from 'react'
import ArtPictureForm from './ArtPictureForm';
function EditArtForm({editedArt, editArt}) {
    
    const inputProps = {
        autoComplete: 'off',
        onChange: e => handleInputChangeEditArt(e),
    };
    const handleInputChangeEditArt = (e) => {
        const { name, value } = e.target;

        editedArt[name] = value;
        console.log(editedArt)

    };
  
    return (
        <>
            <ArtPictureForm
                editedArt={editedArt}
                inputProps={inputProps}
            />


            <div className='buttons'>
                <button onClick={(e) => editArt(e, editedArt._id)}>Edit</button>
            </div>
        </>
    )
}

export default EditArtForm