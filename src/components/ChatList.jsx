import React,{ useState, useEffect } from 'react'
import data from './dummydata'



const ChatListSearch = ({ value, onChange }) => {
  
  return (
    <div className="w-full px-4 py-2 text-white rounded border flex flex-nowrap gap-2 has-[:focus]:border-fuchsia-700">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="min-w-4 w-4 min-h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
      <input 
        className="flex-1 bg-transparent" 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."/>
    </div>
  )
}

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

const ChatList = ({onClickChat,active}) => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(data);
  
  
  return (
    <div className="section flex flex-col">
      <div className="p-2">
        <h3 className="logo">Chelakkedo</h3>
      </div>
      <div className="p-2">
        <ChatListSearch value={search} onChange={(v) => setSearch(v)} />
      </div>
      <div className="grow p-2 overflow-y-auto">
        {
          users.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase())
          })
          .map((user) => (
            <div key={user.id} >
               <ChatUserCard 
                  active={user.id === active?true:false}
                  user={user} 
                  onClick={() => onClickChat(user.id)}
               />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ChatList