import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
