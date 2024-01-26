import React from 'react'

import { IconArrowLeft } from "../assets/icons/svg";

import useColor from "../hooks/useColor";

const TopBar = ({ chat, onBack }) => {
  
  const {color} = useColor(chat.id)
    return (
        <div className="p-2 flex gap-2 items-center border-b border-fuchsia-700">
            <div onClick={onBack}>
                <IconArrowLeft />
            </div>
            <div className={`avatar w-10 text-3xl ${color}`}>{chat.name.toUpperCase()[0]}</div>
            <div className="font-bold">{chat.name}</div>
        </div>
    );
};

export default TopBar