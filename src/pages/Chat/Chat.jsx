import React,{ useState } from 'react'

import ChatList from "../../components/ChatList";
import ChatRoom from "../../components/ChatRoom";

import { ChatContextProvider } from '../../context/ChatContex'

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);
  
  
  
  return (
    <ChatContextProvider>
      <main className="w-full h-full p-3 bg-neutral-950 flex flex-nowrap gap-1">
        <section className={`h-full w-full md:w-1/3 ${activeChat&&"hidden"} md:block`}>
          <ChatList active={activeChat} onClickChat={(id) => setActiveChat(id)}/>
        </section>
        <section className={`h-full grow overflow-x-auto ${!activeChat&&'hidden'} md:block`}>
          <ChatRoom active={activeChat} onBack={() => setActiveChat(null)} />
        </section>
      </main>
    </ChatContextProvider>
  )
}

export default Chat