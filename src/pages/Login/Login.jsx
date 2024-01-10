import React,{ useState } from "react";
import { countries, getEmojiFlag, getCountryCode } from "countries-list";

import Selecter from "../../components/Selecter/Selecter";

const c_list = Object.keys(countries).map(element => {
    const item = {
        id: getCountryCode(countries[element].name),
        name: countries[element].name,
        code: countries[element].phone,
        emoji: getEmojiFlag(getCountryCode(countries[element].name))
    };
    return item;
});

const Login = () => {
  
  const [selected, setSelected] = useState(() => c_list.find(obj => obj.name === 'India'));
  const [ipNumber, setIpNumber] = useState('');
  const [numError, setNumError] = useState(false);
  
  const handleOnSelect = (id) => {
    const i = c_list.find(obj => obj.id === id)
    setSelected(() => i)
  }
  
  const handleGetOtp = () => {
    if(ipNumber.length===0){
      setNumError(() => true)
      return
    }
    let ph = '+'+selected.code+ipNumber
    
  }
  
  const handleNumChange = (value) => {
    setIpNumber(() => value)
    setNumError(() => false)
  }
  
  return (
      <div className="bg-slate-900 h-full p-5 flex flex-col items-center overflow-y-auto">
          <h3 className="my-10 text-fuchsia-400 text-2xl font-extrabold font-mono text-center">
              Chelakkedo
          </h3>
          <div className="w-full max-w-xs p-4 rounded border border-gray-400 flex flex-col items-center text-white">
              <h4 className="my-5 text-white text-xl font-bold font-mono text-center">
                  Login
              </h4>
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
              <div 
                  className="px-4 py-2 mt-5 font-bold text-md rounded-full bg-fuchsia-400 hover:bg-fuchsia-800 text-black"
                  onClick={() => handleGetOtp()}>
                  Get OTP
              </div>
          </div>
      </div>
  );
};

export default Login;
