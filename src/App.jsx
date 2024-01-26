import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useAuthContext } from "./context/UserAuthContext";
import { ChatContextProvider } from './context/ChatContex'


import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'
import Loader from "./components/Loader";

function App() {
  
  const { currentUser, loading } = useAuthContext()
  
  const WrappedChat = () => {
    return (
      <ChatContextProvider>
        <Chat />
      </ChatContextProvider>
    )
  }
  
  const ProtectedRoute = () => {
    if(loading) return <Loader />
    if(currentUser) return <WrappedChat />
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
