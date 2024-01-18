import React,{ useState } from 'react'

import ChatList from "../../components/ChatList";
import ChatRoom from "../../components/ChatRoom";

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);
  
  return (
    
    <main className="w-full h-full p-3 bg-neutral-950 flex flex-nowrap">
      <section className={`h-full w-full sm:w-1/3 ${activeChat&&"hidden"} md:block`}>
        <ChatList active={activeChat} onClickChat={(id) => setActiveChat(id)}/>
      </section>
      <section className="h-full grow overflow-x-auto">
        <ChatRoom active={activeChat} onBack={() => setActiveChat(null)} />
      </section>
    </main>
  )
}

export default Chat