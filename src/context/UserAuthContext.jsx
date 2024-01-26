import { useState, useEffect, useContext, createContext } from "react";
import {
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useUser } from "../hooks/useFirebase";

const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(null);
  const [reCaptcha, setReCaptcha] = useState(null);
  const [showIptName, setShowIptName] = useState(false);
  const [iptName, setIptName] = useState();

  const { usr,setId,getUser, createUser } = useUser(currentUser?.id);

  useEffect(() => {
    
    const handleAuthState = async(_user) =>{
      if(_user){
        setId(_user.uid)
        const _u = await getUser(_user.uid)
        if(_u){
          setCurrentUser(_u)
        }else{
          const newU = await createUser({
            id:_user.uid,
            name: "user"+Date.now(),
            phone: _user.phoneNumber
          })
          setCurrentUser(newU)
        }
      }
      setLoading(false)
    }
    
    const unSub = onAuthStateChanged(auth,(_user) => {
      setUser(_user)
      handleAuthState(_user)
    })
    return () => unSub()
  }, []);
  
  useEffect(() => {
    setCurrentUser(usr)
  }, [usr]);
  
  const renderCaptcha = ph => {
    return new Promise((resolve, reject) => {
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container"
      );
      signInWithPhoneNumber(auth, ph, recaptchaVerifier)
        .then(res => {
          setConfirmation(res);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const confirmOTP = async otp => {
    return new Promise((resolve, reject) => {
      confirmation
        .confirm(otp)
        .then(res => {
          setUser(res.user);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const logOut = () => {
    signOut(auth);
  };

  return (
    <UserAuthContext.Provider
      value={{
        auth,
        user,
        currentUser,
        loading,
        renderCaptcha,
        confirmOTP,
        logOut
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(UserAuthContext);
