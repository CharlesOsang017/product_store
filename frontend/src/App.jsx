import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import CreateProduct from "./pages/CreateProduct"
import Home from "./pages/home"
import { Toaster } from 'react-hot-toast'



function App() {

  return (
  
    <div>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path='/create' element={<CreateProduct />}/>      
    </Routes>
    <Toaster />
    </div>
   
  )
}

export default App
