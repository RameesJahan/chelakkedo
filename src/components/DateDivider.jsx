import React from 'react'

const Divider = ({ date }) => {
    return (
        <div className="flex gap-2 items-center text-slate-400 text-sm">
            <hr className="grow border-slate-400" />
            <span>{date}</span>
            <hr className="grow border-slate-400" />
        </div>
    );
};

export default Divider