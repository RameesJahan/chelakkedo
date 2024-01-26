import React,{ createContext, useContext, useState, useEffect } from 'react'

import { useAuthContext } from "../context/UserAuthContext";
import { useUser,useChat } from "../hooks/useFirebase";

const ChatContext = createContext()

export const ChatContextProvider = ({children}) => {
  
  const [ myChats, setMyChats] = useState([]);
  const [active, setActive] = useState(null);
  const { currentUser } = useAuthContext()
  const { chats, loading } = useChat(currentUser.id)
  const { getUser } = useUser(currentUser.id)
  
  useEffect(() => {
    const fetchData = async () => {
      const _new = await Promise.all(chats.map(async chat => {
        const _m = chat.members
        const _other = _m.filter(_i => {
          return _i !== currentUser.id
        })[0]
        
        //const _u = await getUser(_other)
        return {
          ...chat,
          name: chat.name[currentUser.id],
          otherId:_other,
          last:chat.last_seen.seconds*1000  // changing firebase serverTimestamp to normal timestamp 
        }
      }))
      setMyChats(_new)
    }
    fetchData()
  }, [chats]);
  
  
  return (
    <ChatContext.Provider 
      value={{ myChats,active,setActive,loading }}
    >
      {children}
    </ChatContext.Provider>  
  )
}

export const useChatContext = () => useContext(ChatContext)
