import React, {useState, useEffect} from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css"

function Chat({username, room, socket}){
    const [input, setInput] = useState("");
    const [messageList, setMessageList] = useState([]);

    const  sendIt = async () =>{
        if(input !== ""){
         const MessageData = {
            author: username,
            room: room,
            message: input,
         };
         
         await socket.emit("send_message", MessageData);
         setMessageList((list) => [...list, MessageData]);
         setInput("");
         console.log(MessageData)
       }
    };
    useEffect(() => {
        socket.on("receive", (data) =>{
            console.log(data);
            setMessageList((list) => [...list, data]);    
        });
    }, [socket]);


    return(
        <>
        <div className="main">
            <div className="header">
                <h3>HELLO FROM {username===""?'No one is in the chat': username}</h3>
            </div>
            <div className="body_message">
            <ScrollToBottom className='message_container'>
                 {messageList.map((messageContent, index) => {
                     return(
                         <>
                         
                         <div className="message" key={index} id={username === messageContent.author ? "you" : "other" }>
                            <p>{messageContent.message}</p>
                            <div className="author">
                                {username === messageContent.author ? "you" : messageContent.author}                             
                            </div>
                         </div>
                        
                        </>
                     )
                 })}
             </ScrollToBottom>
            </div>
        </div>
            <div className="footer">
                <input className="inp" type="text" placeholder="Say something...."
                value={input}
                onChange={(event) =>{
                 setInput(event.target.value);
                }}
                onKeyPress={(e) => {
                    e.key === "Enter" && sendIt();
                }} />
                <button className="btn" onClick={sendIt}>&#9658;</button>
            </div>
            
        
        </>
    )
}

export default Chat;