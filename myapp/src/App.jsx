import { useState } from 'react'
import './App.css'
import MainForm from './pages/form/MainForm'
import Preview from './pages/form/Preview'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Profile from './pages/form/Profile'
import Home from './pages/home/Home'
import Login from './pages/form/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>


    </BrowserRouter>
      
     
    </>
  )
}

export default App
