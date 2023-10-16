import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";

function Chat({ username, room, socket }) {
  const [input, setInput] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendIt = async () => {
    if (input !== "") {
      const MessageData = {
        author: username,
        room: room,
        message: input,
        timestamp: new Date().toLocaleTimeString(),
      };

      await socket.emit("send_message", MessageData);
      setMessageList((list) => [...list, MessageData]);
      setInput("");
      console.log(MessageData);
    }
  }

  useEffect(() => {
    socket.on("receive", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });

    socket.on("user_typing", (user) => {
      setIsTyping(true);
    });

    socket.on("user_stopped_typing", (user) => {
      setIsTyping(false);
    });
  }, [socket]);

  return (
    <div className="main">
      <div className="header">
        <h3>HELLO FROM {username === "" ? 'No one is in the chat' : username}</h3>
      </div>
      <div className="body_message">
        <ScrollToBottom className='message_container'>
          {messageList.map((messageContent, index) => (
            <div className="message" key={index} id={username === messageContent.author ? "you" : "other"}>
              <div>
                <p>{messageContent.message}</p>
                <div className="timestamp">{messageContent.timestamp}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <p>User is typing...</p>
            </div>
          )}
        </ScrollToBottom>
      </div>
      <div className="footer">
        <input
          className="inp"
          type="text"
          placeholder="Say something..."
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            socket.emit("user_typing");
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendIt();
            socket.emit("user_stopped_typing");
          }}
        />
        <button className="btn" onClick={sendIt}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
