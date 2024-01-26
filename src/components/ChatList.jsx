import React,{ useState, useEffect } from 'react'
//import data from './dummydata'

import { useChatContext } from "../context/ChatContex";
import { useAuthContext } from "../context/UserAuthContext.jsx";

import ChatListSearch from "./ChatListSearch";

import UserProfile from "./UserProfile";
import CreateChat from "./CreateChat";
import Loader from "./Loader";
import ChatListChats from "./ChatListChats";

const ChatList = () => {
  const [search, setSearch] = useState('');
  const [newChat, setNewChat] = useState(false);
  
  const { currentUser } = useAuthContext()
  const { myChats,active,setActive, loading } = useChatContext()
  
  const renderChats = () => {
    if(loading) return <Loader sm />
    return <ChatListChats search={search} />
  }
  
  
  return (
    <div className="section w-full flex flex-col relative overflow-auto">
      <div className="p-2 flex justify-between items-center">
        <h3 className="logo">Chelakkedo</h3>
        <UserProfile />
      </div>
      <div className="p-2">
        <ChatListSearch value={search} onChange={(v) => setSearch(v)} />
      </div>
      <div className="grow w-full p-2 overflow-y-auto">
        <div onClick={() => setNewChat(true)} className="w-full p-2 text-center bg-fuchsia-700 rounded text-white font-medium">New Chat</div>
        {renderChats()}
      </div>
      {newChat&&<CreateChat onBack={() => setNewChat(false)} />}
    </div>
  )
}

export default ChatList