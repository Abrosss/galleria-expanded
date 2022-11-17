
import './style.css';

import Home from './pages/Home';
import Slideshow from './pages/Slideshow';
import Add from './pages/Add'
import AddLinks from './pages/AddLinks'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <>
   
    <Router>

      <Routes>
        <Route path="/profile/:id" element = {<AddLinks/>}/>
        <Route path="/profile" element = {<Add/>}/>
        <Route path='/slideshow' element = {<Slideshow/>}/>
        <Route path='/' element = {<Home/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
