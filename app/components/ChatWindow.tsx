'use-client'

import clsx from "clsx";
import { useState } from "react"
import { HiPaperAirplane } from 'react-icons/hi2'

const ChatWindow = () => {
    const [messages, setMessages] = useState(['andi ', 'mandi', 'sandi']);
    const [typing , setTyping] = useState("");
    const [isOwn , setIsOwn] = useState(true);

    const messagesAlign = clsx("text-white my-1 w-auto flex" , isOwn && "items-end justify-end" )

    const handleOnClick = () => {
        if (typing.trim() !== '') {
            setMessages([...messages, typing]);
            setTyping('');
          }
    }

    return (
        <div className=" bg-slate-700 h-[600px] rounded-md flex flex-col justify-between w-[300px]">
            <div className="text-white font-bold text-xl p-4 px-5">
                Chat with Anonymous
                <div className="border-orange-200 border mt-1" />
            </div>
            <div className="h-full overflow-auto flex flex-col justify-end ">
                {messages.map((messageContent) => {
                    return (
                        <div className={messagesAlign}>
                            <div className={` bg-slate-600 ${isOwn ? 'rounded-l-lg' : 'rounded-r-lg'} p-2`}>
                                {messageContent}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex gap-1 m-2">
                    <input type="text" placeholder="type here.." value={typing} className="form-input  block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leadin-6" onChange={(e) => setTyping(e.target.value)} onSubmit={handleOnClick}/>
                    <button onClick={handleOnClick} className="rounded-full p-2 bg-orange-300 cursor-pointer hover:bg-orange-400 transition" >
                        <HiPaperAirplane size={18} className="text-white" />
                    </button>
            </div>
        </div>
    )
}

export default ChatWindow