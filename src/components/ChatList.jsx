import React,{ useState, useEffect } from 'react'
//import data from './dummydata'

import { useChatContext } from "../context/ChatContex";
import { useUser,useChat } from "../hooks/useFirebase";

import ChatListSearch from "./ChatListSearch";
import ChatUserCard from "./ChatUserCard";
import UserProfile from "./UserProfile";
import CreateChat from "./CreateChat";

const ChatList = ({onClickChat,active}) => {
  const [search, setSearch] = useState('');
  const [myChats, setMyChats] = useState([]);
  const [newChat, setNewChat] = useState(false);
  
  const { currentUser } = useChatContext()
  const { chats } = useChat(currentUser.id)
  const { getUser } = useUser(currentUser.id)
  
  console.log(chats)
  console.log(myChats)
  useEffect(() => {
    const fetchData = async () => {
      const _new = await Promise.all(chats.map(async chat => {
        const _m = chat.members
        const _other = _m.filter(_i => {
          return _i !== currentUser.id
        })[0]
        
        const _u = await getUser(_other)
        return {...chat,name:_u.name}
      }))
      console.log(_new)
      setMyChats(_new)
    }
    fetchData()
  }, [chats]);
  
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
        {
          myChats.filter((chat) => {
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
      {newChat&&<CreateChat onBack={() => setNewChat(false)} />}
    </div>
  )
}

export default ChatList