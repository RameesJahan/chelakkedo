import React from "react";

import ChatUserCard from "./ChatUserCard";

import { useChatContext } from "../context/ChatContex";

const ChatListChats = ({search}) => {
  
  const { myChats,active,setActive } = useChatContext()
  
  return (
    <div>
      {myChats
        .filter(chat => {
          return chat.name.toLowerCase().includes(search.toLowerCase());
        })
        .map(chat => (
          <ChatUserCard
            key={chat.id}
            active={chat.id === active ? true : false}
            chat={chat}
            onClick={() => setActive(chat.id)}
          />
        ))}
    </div>
  );
};

export default ChatListChats;
