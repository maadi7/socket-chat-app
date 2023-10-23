import './App.css';
import { useState } from "react";
import io from "socket.io-client";
import Chat from './Chat';


const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const [log, setLog] = useState(false);

  const  joinChat = () => {
     if(username.length < 6){
alert("username should contain at least 6 characters");
setUserName("");
}
     if(username.length >= 6 && room !== ""){
       setLog(true);
       socket.emit("join_chat", room);
     }
     
  };
  return (
    <div className="App">
      <div>
        <h1>ChatApp</h1>
      </div>
      {!log ?
      <div className='login_page'>
        <input className='name' type="text" placeholder='name' onChange={(event) => {
          setUserName(event.target.value);
          }}
          />
        <input className='id' type="text" placeholder='room' onChange={(event) => {
          setRoom(event.target.value);
          }}
          />
        <button id='join' onClick={joinChat}>Join Now</button>  
      </div>
      :
      <Chat socket={socket} username={username} room={room} />}
    </div>
  );
}

export default App;