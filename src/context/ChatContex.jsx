import React,{ createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/config";
import useFirebase from "../hooks/useFirebase";

const ChatContext = createContext()

export const ChatContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { getUser,createUser } = useFirebase()
  
  useEffect(() => 
    onAuthStateChanged(auth,async(user) => {
      if(user){
        const _u = await getUser(user.uid)
        if(_u){
          setCurrentUser(_u)
          
        }else{
          const newU = await createUser({
            id:user.uid,
            name:"User",
            phone: user.phoneNumber
          })
          console.log(newU)
        }
      }
      
    }), []);
  
  return (
    <ChatContext.Provider 
      value={{currentUser}}
    >
      {children}
    </ChatContext.Provider>  
  )
}

export const useChatContext = () => useContext(ChatContext)
