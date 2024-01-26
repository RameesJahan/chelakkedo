import React,{useState} from 'react';

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
        {/*<span className="text-sm mt-1">Didn't get OTP?<span className="text-blue-500" > Resend</span> </span>*/}
      </div>
    )
}

export default VerifyNumberUI