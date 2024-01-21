import React,{ useState, useEffect, useRef } from 'react'

import { useAuthContext } from "../context/UserAuthContext";
import { useChatContext } from "../context/ChatContex";

const UserProfile = () => {
  
  const [active, setActive] = useState(false);
  const bodyRef = useRef(null)
  const { logOut } = useAuthContext()
  const { currentUser } = useChatContext()
  
  const handleOutsideClick = (e) => {
    if(bodyRef.current && !bodyRef.current.contains(e.target))
      setActive(false)
  }
  
  
  useEffect(() => {
    document.addEventListener("onmousedown",handleOutsideClick)
    document.addEventListener("touchstart",handleOutsideClick)
    return () => {
      document.addEventListener("onmousedown",handleOutsideClick)
      document.addEventListener("touchstart",handleOutsideClick)
    }
  }, [])
  
  
  
  
  return (
    <div className="relative" ref={bodyRef}>
      <div onClick={() => setActive(v => !v)} className="avatar bg-rose-500 w-10 text-3xl text-white">{currentUser?.name.toUpperCase()[0]}</div>
      {active && 
        <div className="absolute mt-1 p-2 top-full right-0 w-60 rounded border border-fuchsia-700 text-white bg-slate-900 shadow">
          <h4 className="py-2">{currentUser?.name}</h4>
          <div className="w-full mt-1 p-1 text-center shadow rounded border border-fuchsia-700">Edit Name</div>
          <div onClick={logOut} className="w-full mt-1 p-1 text-center shadow rounded bg-red-700">Sign Out</div>
        </div>
      }
    </div>
  )
}

export default UserProfile