import { useState } from 'react'
import './App.css'
import HomePage from './pages/Home'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import CreateAuction from './pages/CreateAuction'
import Signup from './pages/Signuppage'
import Login  from './pages/Loginpage'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/create-auction" element={<CreateAuction/>}></Route>
      <Route path ="/sign-up"  element = {<Signup/>}></Route>
      <Route path ="/login"  element = {<Login/>}></Route>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
