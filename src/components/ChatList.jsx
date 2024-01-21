import React,{ useState } from 'react'
//import data from './dummydata'

import { useChatContext } from "../context/ChatContex";

import ChatListSearch from "./ChatListSearch";
import ChatUserCard from "./ChatUserCard";
import UserProfile from "./UserProfile";

const ChatList = ({onClickChat,active}) => {
  const [search, setSearch] = useState('');
  const [chats, setChats] = useState([]);
  
  const { currentUser } = useChatContext()
  
  return (
    <div className="section w-full flex flex-col">
      <div className="p-2 flex justify-between items-center">
        <h3 className="logo">Chelakkedo</h3>
        <UserProfile />
      </div>
      <div className="p-2">
        <ChatListSearch value={search} onChange={(v) => setSearch(v)} />
      </div>
      <div className="grow w-full p-2 overflow-y-auto">
        <div className="w-full p-2 text-center bg-fuchsia-700 rounded text-white font-medium">New Chat</div>
        {
          chats.filter((chat) => {
            return chat.name.toLowerCase().includes(search.toLowerCase())
          })
          .map((chat) => (
            <div key={chat.id} >
               <ChatUserCard 
                  active={chat.id === active?true:false}
                  user={chat} 
                  onClick={() => onClickChat(chat.id)}
               />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ChatList