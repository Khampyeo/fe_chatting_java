import React, { useEffect, useState } from "react";
import NavLeft from "../component/NavLeft";
import BodyChat from "../component/BodyChat";
import Stomp from "stompjs";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId, selectUserName, setUser } from "../redux/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  pushMessageHistory,
  selectMessagesHistory,
  setMessagesHistory,
} from "../redux/messageHistory";
import SockJS from "sockjs-client";

export default function ChattingPage() {
  const userName = useSelector(selectUserName);
  const userId = useSelector(selectUserId);
  const messages = useSelector(selectMessagesHistory);

  const [friends, setFriends] = useState([]);
  const [friendloading, setFriendLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);

  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (userName == null) {
      navigate("/signin");
      return;
    }

    connect();
    loadHistoryMessages();
    fetchData();

    return () => {
      disconnect();
    };
  }, [userName]);

  const loadHistoryMessages = async () => {
    setHistoryLoading(true);
    const url = process.env.REACT_APP_RESTAPI + "/api/messages";

    const response = await axios.get(url);
    const messageHistory = response.data.data;
    messageHistory.sort((a, b) => {
      return a[1].timestamp - b[1].timestamp;
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

  const connect = () => {
    const url = `${process.env.REACT_APP_SOCKETAPI}/ws`;
    const socket = new SockJS(url);
    const client = Stomp.over(socket);
    client.debug = () => {};

    client.connect(
      {},
      () => {
        client.subscribe("/topic/public", onMessageReceived);

        client.send(
          "/app/chat.addUser",
          {},
          JSON.stringify({ sender: userName, type: "JOIN" })
        );
      },
      () => {
        console.log(
          "Could not connect to WebSocket server. Please refresh this page and try again!"
        );
      }
    );
    setStompClient(client);
  };
  const onMessageReceived = (payload) => {
    console.log(messages);
    const message = JSON.parse(payload.body);
    switch (message.type) {
      case "JOIN":
        break;
      case "CHAT":
        console.log(message);
        const body = [
          message.sender,
          {
            userId: message.senderId,
            message: message.content,
            timestamp: message.timestamp,
          },
        ];

        dispatch(pushMessageHistory(body));
        break;
      case "LEAVE":
        break;
      default:
        break;
    }
  };

  const disconnect = () => {
    if (stompClient) {
      stompClient.disconnect();
    }
    setConnected(false);
    setStompClient(null);
    console.log("Disconnected");
  };

  const sendMessage = (input) => {
    const timestamp = new Date().getTime();
    if (stompClient && input) {
      const chatMessage = {
        sender: userName,
        content: input,
        type: "CHAT",
        senderId: userId,
        timestamp: timestamp,
      };
      stompClient.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify(chatMessage)
      );
      const url = process.env.REACT_APP_RESTAPI + "/api/messages";

      axios.post(url, {
        userId: userId,
        message: input,
        timestamp: timestamp,
      });
    }
  };
  const signOut = () => {
    setFriends([]);
    dispatch(setUser({ name: null, id: null }));
    dispatch(setMessagesHistory([]));
    disconnect();
  };
  return (
    <div className="flex w-full h-[100vh]">
      <div className="bg-white h-full shrink-0 hidden md:w-[350px] md:block sm:w-[250px] sm:block ">
        <NavLeft friends={friends} friendloading={friendloading} />
      </div>
      <div className="bg-white h-full flex-1 border-x-[1px] border-[#eaeaea] max-w-[800px]">
        <BodyChat
          messages={messages}
          signOut={signOut}
          sendMessageToAll={sendMessage}
        />
      </div>
    </div>
  );
}
