import React, { useState, useEffect } from "react";
import useTime from "../hooks/useTime";

import { ImgSend, ImgArrowLeft } from "../assets/icons/svg";

import data from './dummydata'
const messages = [
    {
        sender: "user",
        message: "libero rutrum ac lobortis vel",
        time: "1704856913000"
    },
    {
        sender: "me",
        message: "integer",
        time: "1705226771000"
    },
    {
        sender: "me",
        message: "lacinia aenean sit amet justo morbi ut odio cras mi",
        time: "1704900317000"
    },
    {
        sender: "me",
        message: "orci luctus et",
        time: "1704502129000"
    },
    {
        sender: "user",
        message: "eleifend pede libero quis orci nullam molestie nibh",
        time: "1704943434000"
    },
    {
        sender: "user",
        message: "pede ullamcorper augue a suscipit nulla elit ac nulla",
        time: "1705315780000"
    },
    {
        sender: "user",
        message:
            "natoque penatibus et magnis dis parturient montes nascetur ridiculus",
        time: "1704857727000"
    },
    {
        sender: "user",
        message: "quis turpis eget elit sodales scelerisque",
        time: "1704987190000"
    },
    {
        sender: "user",
        message: "libero quis",
        time: "1704747061000"
    },
    {
        sender: "user",
        message: "orci vehicula condimentum curabitur in libero ut massa",
        time: "1705429333613"
    },
    {
        sender: "me",
        message: "id",
        time: "1704465941000"
    },
    {
        sender: "me",
        message:
            "facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt",
        time: "1705052699000"
    },
    {
        sender: "me",
        message: "vulputate elementum nullam varius nulla facilisi cras",
        time: "1704470049000"
    },
    {
        sender: "user",
        message: "vehicula condimentum curabitur in libero ut",
        time: "1704986472000"
    },
    {
        sender: "user",
        message: "vestibulum",
        time: "1704509895000"
    },
    {
        sender: "user",
        message: "lacinia aenean",
        time: "1704712054000"
    },
    {
        sender: "me",
        message: "dui nec nisi volutpat eleifend donec ut dolor",
        time: "1704833458000"
    },
    {
        sender: "me",
        message: "mattis egestas metus",
        time: "1704828092000"
    },
    {
        sender: "me",
        message: "porttitor lorem id ligula suspendisse",
        time: "1704082147000"
    },
    {
        sender: "user",
        message: "risus praesent lectus vestibulum quam sapien varius ut",
        time: "1704659855000"
    }
];

const sorted = messages.sort((a, b) => {
    return parseInt(b.time) - parseInt(a.time);
});

const TopBar = ({ title, onBack }) => {
    return (
        <div className="p-2 flex gap-2 items-center border-b border-fuchsia-700">
            <div onClick={onBack}>
                <ImgArrowLeft />
            </div>
            <div className="avatar w-10 text-3xl bg-amber-500">A</div>
            <div className="font-bold">{title}</div>
        </div>
    );
};

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
                <div>{message}</div>
                <div className="text-slate-600 text-sm text-right">
                    {time_string}
                </div>
            </div>
        </div>
    );
};

const Divider = ({ date }) => {
    return (
        <div className="flex gap-2 items-center text-slate-400 text-sm">
            <hr className="grow border-slate-400" />
            <span>{date}</span>
            <hr className="grow border-slate-400" />
        </div>
    );
};

const Conversations = () => {
    const { getDate, getTime } = useTime();
    let prevDate = null;

    return (
        <div
            className="w-full h-full bg-[url('/images/chat_bg.jpg')] bg-cover bg-center  
                 overflow-y-auto flex flex-col-reverse no-scrollbar"
        >
            {sorted.map((item, i) => {
                const date = getDate(item.time);

                const show = date !== prevDate;
                prevDate = date;

                return (
                    <div key={i}>
                        {show && <Divider date={date} />}
                        <Bubble
                            message={item.message}
                            time={item.time}
                            send={item.sender === "me" ? true : false}
                        />
                    </div>
                );
            })}
        </div>
    );
};

const BottomBar = () => {
    return (
        <div className="p-2 flex gap-2 items-center border-t border-fuchsia-700">
            <div className="grow">
                <input
                    autoFocus
                    className="m-0 p-2 w-full bg-transparent rounded border border-fuchsia-700 focus:border-fuchsia-100"
                    type="text"
                />
            </div>
            <div>
                <div className="w-11 h-11 grid place-items-center bg-fuchsia-700 rounded hover:bg-fuchsia-100 hover:text-fuchsia-700">
                    <ImgSend />
                </div>
            </div>
        </div>
    );
};

const ChatRoom = ({ active,onBack }) => {
  
  const renderChat = () => {
    if(active){
      const chat = data.find(item => item.id === active)
      return (
        <div className="h-full w-full flex flex-col">
          <div>
              <TopBar title={chat.name} onBack={onBack} />
          </div>
          <div className="grow overflow-y-auto">
              <Conversations />
          </div>
          <div>
              <BottomBar />
          </div>
        </div>
      )
    }
    return (
      <div className=" h-full flex items-center justify-center">
        <span>No Chat is Selected</span>
      </div>
    )
  }
  
  return (
      <div className="section text-white flex flex-col">
        {renderChat()}
      </div>
  );
};

export default ChatRoom;
