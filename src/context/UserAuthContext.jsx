import { useState, useEffect, useContext, createContext } from 'react'
import { onAuthStateChanged, RecaptchaVerifier,signInWithPhoneNumber,signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const UserAuthContext = createContext()

export const UserAuthContextProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(null);
  const [reCaptcha, setReCaptcha] = useState(null);
  
  useEffect(() => 
    onAuthStateChanged(auth,(user) => {
      setUser(user)
      setLoading(false)
    }), []);
  
  const renderCaptcha = (ph) => {
    return new Promise((resolve, reject) => { 
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container')
      signInWithPhoneNumber(auth, ph, recaptchaVerifier).then((res) => {
            setConfirmation(res)
            resolve(res)
          }).catch((err)=> {
            reject(err)
          })
    })
    
  }
  
  const confirmOTP = async(otp) => {
    return new Promise((resolve, reject) => { 
      confirmation.confirm(otp).then((res) => {
        setUser(res.user)
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
    
  }
  
  const logOut = () => {
    signOut(auth)
  }
  
  return (
    <UserAuthContext.Provider
      value={{
        auth,
        user,
        loading,
        renderCaptcha,
        confirmOTP,
        logOut
      }}
    >
      {children}
    </UserAuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(UserAuthContext);