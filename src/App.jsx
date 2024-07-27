
import { Route, Routes } from 'react-router-dom'
import './App.css'
import ReservationForm from './component/Form/ReservationForm'
import Navbar from './component/navbar/Navbar'
import Home from './component/Home/Home'
import About from './component/About/About'


function App() {


  return (
    <>  
     <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<ReservationForm />} />
            <Route path="/about" element={<About />} />


          
        </Routes>
 
    </>
  )
}

export default App
