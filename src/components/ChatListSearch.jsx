import React from 'react'
import {IconSearch} from "../assets/icons/svg";


const ChatListSearch = ({ value, onChange }) => {
  
  return (
    <div className="w-full px-4 py-2 text-white rounded border flex flex-nowrap gap-2 has-[:focus]:border-fuchsia-700">
      <IconSearch />
      <input 
        className="flex-1 bg-transparent" 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."/>
    </div>
  )
}

export default ChatListSearch