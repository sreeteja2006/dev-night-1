import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/Home'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import CreateAuction from './pages/CreateAuction'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/create-auction" element={<CreateAuction/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
