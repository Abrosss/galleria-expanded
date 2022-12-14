
import './style.css';

import Slideshow from './pages/Slideshow';
import Boards from './pages/Boards'
import Gallery from './pages/Gallery'
import SignIn from './pages/SignIn'
import DefaultPage from './pages/DefaultPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <>
   
    <Router>

      <Routes>
        <Route path="/profile/:id" element = {<Gallery/>}/>
        <Route path="/profile" element = {<Boards/>}/>
        <Route path='/slideshow' element = {<Slideshow/>}/>
        <Route path='/signin' element = {<SignIn/>}/>
        <Route path='/' element = {<DefaultPage/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
