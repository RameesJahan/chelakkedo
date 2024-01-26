import React, { useState,useMemo,useEffect } from "react";
import { db } from "../firebase/config";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  writeBatch,
  updateDoc,
  arrayUnion,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
  serverTimestamp,
  increment
} from "firebase/firestore";

const useUser = (defaultId) => {
  const [usr, setUsr] = useState(null);
  const [id, setId] = useState(defaultId);
  const [usrDoc,setUsrDoc] = useState(null)
  
  useEffect(() => {
    if(id){
      const docRef = doc(db,"users",id)
      setUsrDoc(docRef)
      const unSub = onSnapshot(docRef,(snap) => {
        const newUsr = {...snap.data(),id:snap.id}
        setUsr(newUsr)
      })
      return () => unSub()
    }
  }, [id]);
  
  const createUser = async(data) => {
    const docRef = doc(db,"users",data.id)
    await setDoc(docRef, {
      name: data.name,
      phone: data.phone,
      status: "",
      chat_rooms: []
    });
    const res = await getDoc(docRef);
    return { ...res.data(), id: res.id }
  }
  
  const getUser = async(_id) => {
    const docRef = doc(db,"users",_id)
    const res = await getDoc(docRef);
    if (res.exists()) return { ...res.data(), id: res.id }
    return null
  }
  
  const updateName = async (name) => {
    await updateDoc(usrDoc,{
      name:name
    })
  }
  
  return { setId,usr,getUser,createUser,updateName}
}

const useChat = (id) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatColRef = collection(db, "chat_rooms");
  
  const handleError = (error) => {
    setLoading(false)
    console.log(error)
  }
  
  useEffect(() => {
    const q = query(chatColRef,orderBy("last_seen","desc"), where("members", "array-contains", id));
    const unSub = onSnapshot(q,(snaps) => {
      const _new = []
      snaps.forEach((d) => {
         _new.push({
           ...d.data(),
           id:d.id
         })
      })
      setChats(_new)
      
      setLoading(false)
    },handleError)
    return () => unSub()
  }, [id]);
  
  const createChat = async(data) => {
    const docFromRef = doc(db, "users", data.from.id);
    const docToRef = doc(db, "users", data.to.id);
   
    const chat_id = await addDoc(chatColRef, {
      members: [data.from.id, data.to.id],
      name: {
        [data.from.id]: data.to.name,
        [data.to.id]: data.from.name
      },
      admin: "",
      type: "Single",
      unread: {
        [data.from.id]:0,
        [data.to.id]:0
      },
      last_message: "",
      last_seen: serverTimestamp(),
      created_at: serverTimestamp()
    });
    const batch = writeBatch(db);
    batch.update(docFromRef, {
      chat_rooms: arrayUnion(chat_id)
    });
    batch.update(docToRef, {
      chat_rooms: arrayUnion(chat_id)
    });
    
    await batch.commit();
  }
  return {chats ,createChat ,loading}
}

const useOther = () => {
  const getOther = async ph => {
    const colRef = collection(db,"users")
    const q = query(colRef,where("phone","==",ph))
    const _docs = await getDocs(q)
    const _new = []
    _docs.forEach(_doc => {
      _new.push({..._doc.data(),id:_doc.id})
    })
    if(_new.length>0) return _new[0]
    return null
  }
  return getOther
}

const useMessage = (id) => {
  const [messages, setMessages] = useState([]);
  
  const msgColRef = collection(db,`chat_rooms/${id}/messages`)
  const q = query(msgColRef,orderBy("time","desc"))
  
  useEffect(() => {
    const unSub = onSnapshot(q,(snap) => {
      const newMsgs = snap.docs.map((d) => {
        return {
          ...d.data(),
          id:d.id,
          send_time: d.data().time.seconds*1000 // changing firebase serverTimestamp to normal timestamp 
        }
      })
      setMessages(newMsgs)
    })
    return () => unSub()
  }, [id]);
  
  const sendMessage = async(data) => {
    const msgId = await addDoc(msgColRef, {
      from: data.from,
      to: data.to,
      message: data.message,
      status: "sended",
      time: serverTimestamp()
    });

    const chatRef = doc(db, "chat_rooms", id);
    await updateDoc(chatRef, {
      last_message: data.message,
      last_seen: serverTimestamp(),
      [`unread.${data.to}`]: increment(1)
    });
  }
  return {messages,sendMessage}
}

const useRead = () => {
  const setRead = async(id,userId) => {
    const docRef = doc(db,"chat_rooms", id)
    await updateDoc(docRef,{
      [`unread.${userId}`]: 0
    })
  }
  
  return { setRead }
}

export {useUser,useMessage,useChat,useOther,useRead}

