import React, { useState, useEffect } from "react";

import useTime from "../hooks/useTime";
import { useMessage } from "../hooks/useFirebase";

import { useChatContext } from "../context/ChatContex";
import { useAuthContext } from "../context/UserAuthContext"

import TopBar from "./ChatRoomTopBar";
import Conversation from './ChatRoomConversation'
import BottomBar from './ChatRoomBottomBar'


const ChatRoom = ({ onBack }) => {
  
  const { myChats,active,setActive } = useChatContext()
  const { currentUser } = useAuthContext()
  const { messages, sendMessage,readMessage } = useMessage(active)
  
  const handleSend = async(message) => {
    console.log(message)
    try{
      const chat = myChats.find(item => item.id === active)
      sendMessage({
        from:currentUser.id,
        to:chat.otherId,
        message
      })
    }catch(error){
      console.log(error)
    }
  } 
  
  const renderChat = () => {
    if(active){
      const chat = myChats.find(item => item.id === active)
      return (
        <div key={active} className="h-full w-full flex flex-col">
          <div>
            <TopBar chat={chat} onBack={() => setActive(null)} />
          </div>
          <div className="grow overflow-y-auto">
              <Conversation messages={messages} />
          </div>
          <div>
              <BottomBar onSend={handleSend} />
          </div>
        </div>
      )
    }
    return (
      <div className=" h-full flex items-center justify-center">
        <span>No Chat is Selected</span>
      </div>
    )
  }
  
  return (
      <div className="section text-white flex flex-col">
        {renderChat()}
      </div>
  );
};

export default ChatRoom;
