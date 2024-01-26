import React,{ useState, useRef,useEffect } from "react";

import { IconSend } from "../assets/icons/svg";

const BottomBar = ({ onSend }) => {
  
  const [rows, setRows] = useState(1);
  const [message, setMessage] = useState('');
  const ipRef = useRef(null)
  
  useEffect(() => {
    const len = message.split('\n').length
    const maxLen = 5
    if(len>0 && len<= maxLen){
      setRows(len)
    }else if(len>maxLen){
      setRows(maxLen)
    }
  }, [message]);
  
  const handleClick = (e) => {
    onSend(message)
    setMessage('')
    ipRef.current.focus()
  }
  
  const handleChange = (value) => {
    setMessage(value)
    console.log(value)
  }
  
  return (
    <div className="p-2 flex gap-2 items-center border-t border-fuchsia-700">
      <div className="grow flex items-center">
        <textarea
          rows={rows}
          autoComplete="on"
          ref={ipRef}
          autoFocus
          className="m-0 p-2 w-full bg-transparent rounded border border-fuchsia-700 resize-none focus:border-fuchsia-100"
          value={message}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <div onClick={handleClick} className="w-11 h-11 grid place-items-center bg-fuchsia-700 rounded hover:bg-fuchsia-100 hover:text-fuchsia-700">
          <IconSend />
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
