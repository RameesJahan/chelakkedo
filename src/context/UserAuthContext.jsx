import { useState, useEffect, useContext, createContext } from 'react'
import { onAuthStateChanged, RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/config";

const UserAuthContext = createContext()

export const UserAuthContextProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  
  useEffect(() => 
    onAuthStateChanged(auth,(user) => setUser(user)), []);
  
  const renderCaptcha = (ph) => {
    return new Promise((resolve, reject) => { 
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
          signInWithPhoneNumber(auth, ph, recaptchaVerifier).then((res) => {
            setConfirmation(res)
            resolve(res)
          }).catch((err) => {
            reject(err)
            recaptchaVerifier.reset()
          })
        },
        'expired-callback': () => {
          recaptchaVerifier.reset()
          reject({message:"reCaptcha Expired"})
        }
      });
      recaptchaVerifier.render()
    })
  }
  
  const confirmOTP = (otp) => {
    return new Promise((resolve, reject) => {
      confirmation.confirm(otp).then((res) => {
        setUser(res.user)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
  
  return (
    <UserAuthContext.Provider
      value={{
        user,
        renderCaptcha,
        confirmOTP
      }}
    >
      {children}
    </UserAuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(UserAuthContext);