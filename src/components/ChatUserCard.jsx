import React,{ useState, useEffect } from 'react'

const colors = [ 
    "bg-rose-600","bg-blue-600","bg-stone-600","bg-red-600","bg-orange-600","bg-amber-600",
    "bg-yellow-600","bg-lime-600","bg-green-600","bg-emerald-600","bg-teal-600","bg-cyan-600",
    "bg-sky-600","bg-blue-600","bg-indigo-600","bg-violet-600","bg-purple-600","bg-pink-600"
  ]

const ChatUserCard = ({user, onClick, active }) => {
  
  const [color, setColor] = useState('');
  
  useEffect(() => {
    setColor(() => colors[Math.floor(Math.random()*colors.length)])
    
  }, []);
  
  
  return (
    <div 
      className={`border-b border-gray-800 p-2 flex flex-nowrap items-center gap-2 text-white ${active&&"bg-stone-800"}`}
      onClick={onClick}
      >
      <div className="flex-none">
        <div className={`avatar ${color}`}>{user.name.toUpperCase()[0]}</div>
      </div>
      <div className="grow overflow-x-hidden" >
        <h4 className="font-bold" >{user.name}</h4>
        <p className="text-sm text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis" >{user.last}</p>
      </div>
      <div className="flex-none">
        <p className="text-sm text-gray-400">{user.seen}</p>
      </div>
    </div>
  )
}

export default ChatUserCard