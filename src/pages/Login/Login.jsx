import React,{ useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";

import GetNumberUI from "../../components/GetNumberUI";
import VerifyNumberUI from "../../components/VerifyNumberUI";
import ErrorBox from "../../components/ErrorBox";
import Loader from "../../components/Loader";

import { useAuthContext } from "../../context/UserAuthContext";

import IMG_SUCCESS from "../../assets/images/success.png";



const Login = () => {
  const [sentOTP, setSentOTP] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user,confirmOTP,renderCaptcha } = useAuthContext()
  const diaRef = useRef()
  const navigate = useNavigate()
  
  user && navigate('/')
  
  const handleOnVerify = (otp) => {
    setLoading(true)
    confirmOTP(otp).then((res) => {
      navigate('/')
    }).catch((err) => {
      setError(err.message)
      setLoading(false)
    })
  }
  
  const handleOnGet = (ph) => {
    renderCaptcha(ph).then((res) => {
      setSentOTP(true)
    }).catch((err) => {
      setError(err.message)
      alert(err.message)
      window.location.reload()
    })
  }
  
  const handleEdit = () => {
    window.location.reload()
  }
  
  return (
    <div className="bg-slate-900 h-full p-5 flex flex-col items-center overflow-y-auto">
      <h3 className="my-10 logo text-center">
          Chelakkedo
      </h3>
      <div className="w-full max-w-xs p-4 rounded border border-gray-400 flex flex-col items-center text-white">
          <h4 className="my-5 text-white text-xl font-bold font-mono text-center">
              Login
          </h4>
          {error&& <ErrorBox error={error} />}
          {sentOTP? <VerifyNumberUI onEdit={handleEdit} onVerify={(d) => handleOnVerify(d)}/>:<GetNumberUI onGet={handleOnGet} />}
      </div>
      {loading && <Loader/>}
    </div>
  );
};

export default Login;
