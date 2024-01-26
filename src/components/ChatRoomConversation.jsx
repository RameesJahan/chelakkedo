import React, { useEffect } from 'react'

import useTime from "../hooks/useTime";
import { useRead } from "../hooks/useFirebase";

import { useAuthContext } from "../context/UserAuthContext"
import { useChatContext } from "../context/ChatContex"

import Bubble from "./MessageBubble";
import Divider from "./DateDivider";

const Conversation = ({messages}) => {
  let prevDate = null;
  
  const { getDate, getTime } = useTime();
  const { setRead } = useRead()
  const { currentUser } = useAuthContext()
  const { active } = useChatContext()
  
  useEffect(() => {
    try{
      setRead(active,currentUser.id)
    }catch(error){
      console.log(error)
    }
  }, [messages]);
  
  const groupByDate = (_messages) => {
    console.log("rendering")
    return _messages.reduce((result,_message) => {
      const _timestamp = _message["send_time"]
      const _date = getDate(_timestamp)
      
      if(!result[_date]){
        result[_date] = []
      }
      
      result[_date].push(_message)
      return result
    },{})
  }
  
  
  const groupedMessages = groupByDate(messages)
  console.log(groupedMessages)

  return (
    <div
      className="w-full h-full bg-[url('/images/chat_bg.jpg')] bg-cover bg-center  
                 overflow-y-auto flex flex-col-reverse no-scrollbar"
    >
      {Object.entries(groupedMessages).map(([date,_messages]) => (
        <div key={date}>
          <Divider date={date} />
          <div className="flex flex-col-reverse">
          {
            _messages.map((item) => (
              <Bubble
                key={item.id}
                message={item.message}
                time={item.send_time}
                send={item.from === currentUser.id ? true : false}
              />
            ))
          }
          </div>
        </div>
      ))}
    </div>
  );
};



export default Conversation;
