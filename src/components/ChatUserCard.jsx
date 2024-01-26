import React,{ useState, useEffect, useMemo } from 'react'

import useTime from "../hooks/useTime";
import useColor from "../hooks/useColor";

import { useAuthContext } from "../context/UserAuthContext";

const ChatUserCard = ({chat, onClick, active }) => {
  
  const { getDate, getTime } = useTime();
  const { currentUser } = useAuthContext()
  const { color } = useColor(chat.id)
  
  
  const last_string=getDate(chat.last)
  
  return (
    <div 
      className={`border-b border-gray-800 p-2 flex flex-nowrap items-center gap-2 text-white ${active&&"bg-stone-800"}`}
      onClick={onClick}
      >
      <div className="flex-none">
        <div className={`avatar ${color}`}>{chat.name.toUpperCase()[0]}</div>
      </div>
      <div className="grow overflow-x-hidden" >
        <h4 className="font-bold" >{chat.name}</h4>
        <p className="text-sm text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis" >{chat.last_message}</p>
      </div>
      <div className="flex-none">
        <p className="text-sm text-gray-400">{last_string}</p>
      </div>
      {
        chat.unread[currentUser.id] > 0 &&
          <div className="text-md bg-fuchsia-700 rounded-full grid place-items-center w-6 h-6">
            {chat.unread[currentUser.id]}
          </div>
      }
    </div>
  )
}

export default ChatUserCard