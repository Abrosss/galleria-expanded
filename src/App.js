
import './style.css';

import Home from './pages/Home';
import Slideshow from './pages/Slideshow';
import Boards from './pages/Boards'
import Gallery from './pages/Gallery'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <>
   
    <Router>

      <Routes>
        <Route path="/profile/:id" element = {<Gallery/>}/>
        <Route path="/profile" element = {<Boards/>}/>
        <Route path='/slideshow' element = {<Slideshow/>}/>
        <Route path='/' element = {<Home/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
