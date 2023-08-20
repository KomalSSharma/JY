import { useState } from 'react'
import './App.css'
import MainForm from './pages/form/MainForm'
import Preview from './pages/form/Preview'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Profile from './pages/form/Profile'
import Home from './pages/home/Home'
import Login from './pages/form/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<MainForm/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route exact path='/preview' element={<Preview/>}/>
      <Route exact path='/profile' element={<Profile/>}/>

     
    </Routes>
    </BrowserRouter>
      
     
    </>
  )
}

export default App
