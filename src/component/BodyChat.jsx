import React, { useEffect, useRef, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectUserId, selectUserName } from "../redux/user";
import { PiFinnTheHumanLight } from "react-icons/pi";
import axios from "axios";

export default function BodyChat({ messages, sendMessageToAll, signOut }) {
  const [input, setInput] = useState("");
  const userName = useSelector(selectUserName);
  const userId = useSelector(selectUserId);
  console.log(messages);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  let lastUserName = null;

  const updateMessagesHistory = (input, roomId) => {};
  return (
    <div className="w-full flex flex-col h-full">
      <div className="h-[60px] border-b-[1px] border-[#eaeaea] shrink-0 flex justify-end items-center mx-4">
        <div
          className="font-bold cursor-pointer hover:text-[#d5431a] transition-all"
          onClick={signOut}
        >
          Sign out
        </div>
      </div>
      <div className="flex-1 px-2 overflow-y-scroll">
        <div className="w-full h-full ">
          {messages.map(
            (message, key) => {
              if (message[1].userId === userId) {
                lastUserName = message[0];
                return (
                  <div
                    key={key}
                    className="flex items-center mt-2 mr-2 justify-end"
                  >
                    <p className="px-3 py-1 ml-2 rounded-[16px] bg-[#d5431a] text-[15px] text-white max-w-[75%] text-left whitespace-pre-line">
                      {message[1].message}
                    </p>
                  </div>
                );
              } else {
                let bool = false;
                if (messages.length > key + 1)
                  bool = messages[key + 1][0] === message[0];

                if (lastUserName === message[0])
                  return (
                    <div key={key} className=" mt-2">
                      <div className="flex items-center">
                        <PiFinnTheHumanLight
                          className={`p-1 w-[30px] h-[30px] rounded-full bg-white border border-gray-500 shrink-0 ${
                            bool ? "invisible" : "block"
                          }`}
                        />
                        <p className="px-3 py-1 ml-2 rounded-[18px] bg-[#f0f0f0] text-[15px] font-light max-w-[75%] text-left whitespace-pre-line">
                          {message[1].message}
                        </p>
                      </div>
                    </div>
                  );
                else {
                  lastUserName = message[0];
                  return (
                    <div key={key} className=" mt-2">
                      <p className="text-[12px] text-[#a3a4a6] text-left pl-[40px]">
                        {message[0]}
                      </p>
                      <div className="flex items-center max-w-[75%]">
                        <PiFinnTheHumanLight
                          className={`p-1 w-[30px] h-[30px] rounded-full bg-white border border-gray-500 shrink-0 ${
                            bool ? "invisible" : "block"
                          }`}
                        />
                        <p className="px-3 py-1 ml-2 rounded-[16px] bg-[#f0f0f0] text-[15px] font-light max-w-[75%] text-left whitespace-pre-line">
                          {message[1].message}
                        </p>
                      </div>
                    </div>
                  );
                }
              }
            }

            // )
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 p-2 h-[60px]">
        <div className="cursor-pointer hover:bg-[#f3f3f5] p-1 rounded-full transition-all">
          <IoAddCircle className="text-[24px] text-[#d5431a]"></IoAddCircle>
        </div>
        <div className="bg-[#f3f3f5] flex-1 rounded-[16px] px-3 py-1 flex items-center">
          <input
            type="text"
            className="bg-[#f3f3f5] w-full outline-none resize-none"
            placeholder="Aa"
            value={input}
            onInput={(e) => setInput(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                sendMessageToAll(input);
                setInput("");
                updateMessagesHistory(input, 1);
              }
            }}
          />
        </div>
        <div className="cursor-pointer hover:bg-[#f3f3f5] p-1 rounded-full transition-all">
          <IoSend
            className="text-[24px] text-[#d5431a]"
            onClick={() => {
              sendMessageToAll(input);
              setInput("");
            }}
          ></IoSend>
        </div>
      </div>
    </div>
  );
}
