import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useAuthContext } from "./context/UserAuthContext";


import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'

function App() {
  
  const { user } = useAuthContext()
  
  const ProtectedRoute = () => {
    if(user) return <Chat />
    return <Home />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
