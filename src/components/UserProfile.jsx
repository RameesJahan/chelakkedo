import React,{ useState, useEffect, useRef } from 'react'

import { useAuthContext } from "../context/UserAuthContext";
import { useChatContext } from "../context/ChatContex";
import { useUser } from "../hooks/useFirebase";

import { IconCross} from "../assets/icons/svg";

const UserProfile = () => {
  
  const [active, setActive] = useState(false);
  const [newName, setNewName] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const bodyRef = useRef(null)
  
  const { currentUser,logOut } = useAuthContext()
  const { updateName } = useUser(currentUser.id)
  
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
  
  
  const handleKeyDown = (e) => {
    if(e.key=="Enter"){
      saveName()
    }
  }
  
  const saveName = async() => {
    if(!newName) return setIsEdit(false)
    try{
      await updateName(newName)
      handleCancel()
    }catch(error){
      console.log(error)
    }
  }
  const handleEdit = () => {
    console.log(isEdit)
    if(isEdit){
      saveName()
    }else{
      setIsEdit(true)
    }
    
  }
  
  const handleCancel = () => {
    setIsEdit(false)
    setNewName('')
  }
  
  const handleSignOut = async() => {
    await logOut()
    window.location.reload()
  }
  
  return (
    <div className="relative" ref={bodyRef}>
      <div onClick={() => setActive(v => !v)} className="avatar bg-rose-500 w-10 text-3xl text-white">{currentUser?.name.toUpperCase()[0]}</div>
      {active && 
        <div className="absolute mt-1 p-2 top-full right-0 w-60 rounded border border-fuchsia-700 text-white bg-slate-900 shadow">
          <h4 className="py-2 font-medium">{currentUser?.name}</h4>
          {
            <div className={`${isEdit?'flex':'hidden'} overflow-auto rounded border px-2 py-1`}>
              <input 
                className="min-w-0 bg-transparent border-none outline-none" 
                type="text" 
                autoFocus
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter new name..."
              />
              <div onClick={handleCancel}>
                <IconCross />
              </div>
            </div>
          }
          <div onClick={handleEdit} className="w-full mt-1 p-1 text-center shadow rounded border border-fuchsia-700">{isEdit?"Save":"Edit Name"}</div>
          <div onClick={handleSignOut} className="w-full mt-1 p-1 text-center shadow rounded bg-red-700">Sign Out</div>
        </div>
      }
    </div>
  )
}

export default UserProfile