import React from 'react'

import useTime from "../hooks/useTime";

const Bubble = ({ message, send, time }) => {
    const { getDate, getTime } = useTime();
    const time_string = getTime(time);
    const date_string = getDate(time);

    return (
        <div className="flex flex-col w-full p-1 ">
            <div
                className={`max-w-[80%] text-slate-100 rounded-xl border border-fuchsia-700 p-2 ${
                    send
                        ? "self-end rounded-br-none bg-slate-900"
                        : "self-start rounded-bl-none bg-slate-950"
                }`}
            >
                <p className="whitespace-pre-line">{message}</p>
                <div className="text-slate-600 text-sm text-right">
                    {time_string}
                </div>
            </div>
        </div>
    );
};

export default Bubble