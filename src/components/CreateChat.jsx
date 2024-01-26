import React,{ useState } from 'react'
import { useOther, useChat } from "../hooks/useFirebase";
import { useChatContext } from "../context/ChatContex";
import { useAuthContext } from "../context/UserAuthContext";

import Loader from "./Loader";

import { IconArrowLeft, IconSearch } from "../assets/icons/svg";

const CreateChat = ({onBack}) => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [other, setOther] = useState(null);
  const { currentUser } = useAuthContext()
  const { myChats,setActive } = useChatContext()
  const { createChat } = useChat(currentUser.id)
  const getOther = useOther()
  
  const handleSubmit = async() => {
    setLoading(true)
    
    try{
      const _other = await getOther(phone)
      setOther(_other)
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  
  const isChatExist = (_other) =>{
    return myChats.some((_chat) => _chat.members.includes(_other.id))
  }
  
  const handleCreate = async() => {
    setLoading(true)
    if(isChatExist(other)){
      setActive(other.id)
      onBack()
    }else{
      try{
        await createChat({
          from:currentUser,
          to:other
        })
        onBack()
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    
  }
  
  const renderResult = () => {
    if(loading) return <Loader sm />
    if(other){ 
      return (
        <div onClick={handleCreate} className="p-2 flex items-center mt-2 gap-2 border rounded border-fuchsia-700 hover:bg-slate-700">
          <div className="avatar bg-amber-500">{other.name.toUpperCase()[0]}</div>
          <span className="font-medium">{other.name}</span>
        </div>
      )
    }
    return (
      <div className="text-center">No result found!</div>
    )
  }
  
  return (
    <div className="absolute p-2 top-0 left-0 w-full h-full bg-slate-900 text-white">
      <div className="w-full flex gap-2 items-center">
        <div onClick={onBack} className="hover:text-fuchsia-700">
          <IconArrowLeft />
        </div>
        <div className="grow">
          <input 
            className="min-w-0 w-full p-2 rounded border border-white bg-slate-900 outline-none focus:border-fuchsia-700" 
            type="tel" 
            placeholder="+919876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />
        </div>
        <div onClick={handleSubmit} className="p-2 rounded bg-fuchsia-700 hover:bg-white hover:text-fuchsia-700">
          <IconSearch className="w-6 h-6" />
        </div>
      </div>
      <span className="text-sm font-light">Please enter phone number with country code</span>
      {renderResult()}
    </div>
  )
}

export default CreateChat