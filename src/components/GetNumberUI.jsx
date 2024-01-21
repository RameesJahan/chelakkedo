import React,{useState} from 'react'
import { countries, getEmojiFlag, getCountryCode } from "countries-list";
import Selecter from "./Selecter";

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

export default GetNumberUI