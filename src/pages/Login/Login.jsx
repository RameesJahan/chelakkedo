import React,{ useState, useEffect, useRef } from "react";
import { countries, getEmojiFlag, getCountryCode } from "countries-list";
import { useNavigate } from "react-router-dom";


import Selecter from "../../components/Selecter";
import ErrorBox from "../../components/ErrorBox";
import {useAuthContext} from "../../context/UserAuthContext";

import IMG_SUCCESS from "../../assets/images/success.png";

const c_list = Object.keys(countries).map(element => {
    const item = {
        id: getCountryCode(countries[element].name),
        name: countries[element].name,
        code: countries[element].phone,
        emoji: getEmojiFlag(getCountryCode(countries[element].name))
    };
    return item;
});



const GetNumberUI = ({onGet}) => {
  
  const [selected, setSelected] = useState(() => c_list.find(obj => obj.name === 'India'));
  const [ipNumber, setIpNumber] = useState('');
  const [numError, setNumError] = useState(false);
  
  
  const handleOnSelect = (id) => {
    const i = c_list.find(obj => obj.id === id)
    setSelected(i)
  }
  
  const handleGetOtp = () => {
    if(ipNumber.length===0){
      setNumError(true)
      return
    }
    let ph = '+'+selected.code+ipNumber
    onGet(ph)
  }
  
  const handleNumChange = (value) => {
    setIpNumber(value)
    setNumError(false)
  }
   
  
  return (
    <div className="flex w-full flex-col items-center">
      <label className="self-start">Enter your phone number</label>
      <Selecter
          selected={selected}
          data={c_list}
          onSelect={(id) => handleOnSelect(id)}
          className="w-full px-4 py-2 mt-2 rounded bg-transparent text-white text-center"
      />
      {Boolean(selected) || <span className="text-sm text-red-400 self-start">Please select a country</span>}
      <div className="w-full px-4 py-2 mt-4 rounded border border-gray-400 flex flex-nowrap gap-1 has-[:focus]:outline has-[:focus]:outline-fuchsia-400">
          <span>+{selected?.code || "000"}</span>
          <input
              required 
              className="flex-1 bg-transparent"
              type="tel"
              id="phone"
              value={ipNumber}
              onChange={(e) => handleNumChange(e.target.value)}
              placeholder="Enter Phone number "
          />
      </div>
      {numError && <span className="text-sm text-red-400 self-start">Please enter your phone number</span>}
      <div className="px-4 py-2 mt-5" id="recaptcha-container" />
      <div 
          className="w-full px-4 py-2 mt-5 font-bold text-md rounded bg-fuchsia-400 hover:bg-fuchsia-800 text-black text-center"
          onClick={() => handleGetOtp()}>
          Get OTP
      </div>
    </div>
  )
}

const VerifyNumberUI = ({onEdit, onVerify}) => {
  
  const [otp, setOtp] = useState('');
  
  const handleVerify = () => {
    onVerify(otp)
  }
  
  return (
      <div className="text-center flex flex-col items-center">
        <span className="text-md mt-4">We have send a OTP to your Mobile Number</span>
        <div onClick={onEdit} className="text-md mb-2 text-blue-500">Edit Phone Number</div>
        <input 
            className="bg-transparent w-full p-2 border rounded text-center tracking-[0.75rem] focus:border-fuchsia-700" 
            type="number" 
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        <div 
          className="w-full px-4 py-2 mt-5 font-bold text-md rounded bg-fuchsia-400 hover:bg-fuchsia-800 text-black"
          onClick={handleVerify}
          >
          Verify OTP
        </div>
        <span className="text-sm mt-1">Didn't get OTP?<span className="text-blue-500"> Resend</span> </span>
      </div>
    )
}



const Login = () => {
  const [sentOTP, setSentOTP] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState('');
  const { renderCaptcha,confirmOTP } = useAuthContext()
  const diaRef = useRef()
  const navigate = useNavigate()
  
  useEffect(() => {
    //diaRef.current?.showModal()
  }, []);
  
  const handleOnVerify = (otp) => {
    confirmOTP(otp).then( res => {
      diaRef.current?.showModal()
      navigate('/')
    }).catch((err) => setError(err.message))
  }
  
  const handleOnGet = (ph) => {
    console.log(ph)
    renderCaptcha(ph).then((res) => {
      
      setSentOTP(true)
    })
    .catch((err) => setError(err.message))
  }
  const handleEdit = () => {
    setSentOTP(false)
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
          <dialog className="max-w-xs bg-slate-900" ref={diaRef}>
            <div className="flex flex-col items-center p-8">
              <img className="w-32 aspect-square" src={IMG_SUCCESS} alt="IMG_SUCCESS" />
              <span className="text-center text-2xl font-bold text-green-500 mt-4">Login Success</span>
            </div>
          </dialog>
      </div>
  );
};

export default Login;
