import React from 'react'
import { createContext, useContext } from 'react';
import { useState } from 'react';

const ArtToBeEditedContext = createContext({
  editPopup: null,
  setEditPopup: () => {},
});

export const EditedArtComponent = ({children}) => {
  const [editPopup, setEditPopup] = useState(null)

  return (
    <ArtToBeEditedContext.Provider value={{ editPopup, setEditPopup }}>
      {children}
    </ArtToBeEditedContext.Provider>
  );
};
export default ArtToBeEditedContext 