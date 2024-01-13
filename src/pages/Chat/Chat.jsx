import React from 'react'

import ChatList from "../../components/ChatList";

const Chat = () => {
  return (
    <main className="w-full h-full p-3 bg-neutral-950 flex flex-nowrap">
      <section className="h-full w-full sm:w-1/3 ">
        <ChatList />
      </section>
      <section className="h-full grow overflow-x-auto">
      </section>
    </main>
  )
}

export default Chat