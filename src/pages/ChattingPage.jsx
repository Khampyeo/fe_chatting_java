import React, { useEffect, useState } from "react";
import NavLeft from "../component/NavLeft";
import BodyChat from "../component/BodyChat";
import { w3cwebsocket } from "websocket";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName, setUser } from "../redux/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  pushMessageHistory,
  selectMessagesHistory,
  setMessagesHistory,
} from "../redux/messageHistory";

export default function ChattingPage() {
  const userName = useSelector(selectUserName);
  const messages = useSelector(selectMessagesHistory);

  const [client, setClient] = useState(null);
  const [friends, setFriends] = useState([]);
  const [reconnect, setReconnect] = useState(false);
  const [friendloading, setFriendLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (userName == null) {
      navigate("/signin");
      return;
    }
    loadHistoryMessages();
    fetchData();
  }, []);

  const loadHistoryMessages = async () => {
    setHistoryLoading(true);
    const url = process.env.REACT_APP_RESTAPI + "/api/messages";

    const response = await axios.get(url);
    const messageHistory = response.data;
    messageHistory.sort((a, b) => {
      return a.time - b.time;
    });
    dispatch(setMessagesHistory(messageHistory));

    setHistoryLoading(false);

    return;
  };

  const fetchData = async () => {
    setFriendLoading(true);
    const url = process.env.REACT_APP_RESTAPI + "/api/chatUsers";
    const response = await axios.get(url);

    const data = response.data;
    setFriends(data);
    setFriendLoading(false);
  };

  const sendMessageToAll = (input) => {};

  return (
    <div className="flex w-full h-[100vh]">
      <div className="bg-white h-full shrink-0 hidden md:w-[350px] md:block sm:w-[250px] sm:block ">
        <NavLeft friends={friends} friendloading={friendloading} />
      </div>
      <div className="bg-white h-full flex-1 border-x-[1px] border-[#eaeaea] max-w-[800px]">
        <BodyChat messages={messages} sendMessageToAll={sendMessageToAll} />
      </div>
    </div>
  );
}
