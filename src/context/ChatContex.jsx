import React,{ createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/config";
import { useUser } from "../hooks/useFirebase";

import Loader from "../components/Loader";

const ChatContext = createContext()

export const ChatContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  //const { getUser,createUser,liveUpdateUser } = useFirebase()
  const { setId,usr,getUser,createUser } = useUser(currentUser?.id)
  
  
  useEffect(() => {
    const unSubAuth = onAuthStateChanged(auth,async(user) => {
      if(user){
        setId(user.uid)
        const _u = await getUser(user.uid)
        if(_u){
          setCurrentUser(_u)
        }else{
          const newU = await createUser({
            id:user.uid,
            name:"User",
            phone: user.phoneNumber
          })
          console.log(usr)
          setCurrentUser(newU)
        }
      }
    })
  }, []);
  
  if(!currentUser) return <Loader />
  
  return (
    <ChatContext.Provider 
      value={{ currentUser, setCurrentUser}}
    >
      {children}
    </ChatContext.Provider>  
  )
}

export const useChatContext = () => useContext(ChatContext)
