import { createContext, useContext } from 'react';
import { useState } from 'react';
const PopupContext = createContext({
    linksPopup: false,
    setLinksPopup: () => {},
  });

  export const PopupComponent = ({children}) => {
    const [linksPopup, setLinksPopup] = useState(false);
  
    return (
      <PopupContext.Provider value={{ linksPopup, setLinksPopup }}>
        {children}
      </PopupContext.Provider>
    );
  };
  export default PopupContext