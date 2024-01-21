import React from "react";
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
    getDocs,
    serverTimestamp
} from "firebase/firestore";

const useFirebase = () => {
  
    const getUser = async id => {
        const docRef = doc(db, "users", id);
        const res = await getDoc(docRef);
        if(res.exists()) return { ...res.data(), id:res.id }
        return null
    };

    const createUser = async data => {
        const docRef = doc(db, "users", data.id);
        await setDoc(docRef, {
            name: data.name,
            phone: data.phone,
            status: "",
            chat_rooms: []
        });
        const res = await getDoc(docRef);
        return { ...res.data(), id: res.id }
    };

    const createChat = async data => {
        const collRef = collection(db, "chat_rooms");
        const docFromRef = doc(db, "users", data.from);
        const docToRef = doc(db, "users", data.to);
        const chat_id = await addDoc(collRef, {
            members: [data.from, data.to],
            admin: "",
            type: "Single",
            unread: 0,
            last_message: "",
            last_seen:'',
            created_at: serverTimestamp()
        });
        const batch = writeBatch(db)
        batch.update(docFromRef,{
          chat_rooms: arrayUnion(chat_id)
        })
        batch.update(docToRef,{
          chat_rooms: arrayUnion(chat_id)
        })
        
        await batch.commit()
    };
    
    const getChatRooms = async id => {
      const collRef = collection(db, "chat_rooms");
      const q = query(collRef, where("members", "array-contains", id))
      const docSnaps = await getDocs(q)
      return docSnaps.map((doc) => {
        return doc.data()
      })
    }
    
    return {getUser,createUser,createChat}
};
export default useFirebase
