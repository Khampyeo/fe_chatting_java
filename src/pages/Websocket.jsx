import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default function Websocket() {
  // const [stompClient, setStompClient] = useState(null);
  // const [connected, setConnected] = useState(false);
  // const [messages, setMessages] = useState([]);
  // const [messageInput, setMessageInput] = useState("");
  // const [nickname, setNickname] = useState("");

  // useEffect(() => {
  //   return () => {
  //     if (stompClient) {
  //       stompClient.disconnect();
  //     }
  //   };
  // }, [stompClient]);

  // const connect = () => {
  //   const username = "Kham";
  //   const url = `${process.env.REACT_APP_SOCKETAPI}/ws`;
  //   const socket = new SockJS(url);
  //   const client = Stomp.over(socket);
  //   client.connect(
  //     {},
  //     () => {
  //       client.subscribe("/topic/public", onMessageReceived);

  //       client.send(
  //         "/app/chat.addUser",
  //         {},
  //         JSON.stringify({ sender: username, type: "JOIN" })
  //       );
  //     },
  //     () => {
  //       console.log(
  //         "Could not connect to WebSocket server. Please refresh this page and try again!"
  //       );
  //     }
  //   );
  //   setStompClient(client);
  // };
  // const onMessageReceived = (payload) => {
  //   const message = JSON.parse(payload.body);
  // };
  // const disconnect = () => {
  //   if (stompClient) {
  //     stompClient.disconnect();
  //   }
  //   setConnected(false);
  //   setStompClient(null);
  //   console.log("Disconnected");
  // };

  // const sendMessage = () => {
  //   if (stompClient && messageInput) {
  //     const chatMessage = {
  //       sender: "Kham",
  //       content: messageInput,
  //       type: "CHAT",
  //     };
  //     stompClient.send(
  //       "/app/chat.sendMessage",
  //       {},
  //       JSON.stringify(chatMessage)
  //     );
  //     setMessageInput("");
  //   }
  // };
  return (
    <div>
      {/* <p onClick={connect}>Connect</p>
      <p onClick={disconnect}>Disconnect</p> */}
    </div>
  );
}
