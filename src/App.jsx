import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/Home'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import CreateAuction from './pages/CreateAuction'
import Login from './pages/Loginpage'
import Signup from './pages/Signuppage'
import AuctionItems from './pages/AuctionItems'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/create-auction" element={<CreateAuction/>}></Route>
      <Route path='/login' element={<Login></Login>}/>
      <Route path='/signup' element={<Signup></Signup>}/>
      <Route path='auction-items' element={<AuctionItems/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
