import React,{ useState } from 'react'

import ChatList from "../../components/ChatList";
import ChatRoom from "../../components/ChatRoom";

import { useChatContext } from "../../context/ChatContex";

const Chat = () => {
  
  const { active } = useChatContext()
  
  return (
      <main className="w-full h-full p-3 bg-neutral-950 flex flex-nowrap gap-1">
        <section className={`h-full w-full md:w-1/3 ${active&&"hidden"} md:block`}>
          <ChatList />
        </section>
        <section className={`h-full grow overflow-x-auto ${!active&&'hidden'} md:block`}>
          <ChatRoom />
        </section>
      </main>
  )
}

export default Chat