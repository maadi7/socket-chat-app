const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
     console.log(`the person with id: ${socket.id} join the chat`);
    
    socket.on("join_chat", (data) => {
        console.log(`the room is: ${data}`);
        socket.join(data);
    });

    socket.on("send_message", (data) =>{
        console.log(data);
        socket.to(data.room).emit("receive", data);

    });
    socket.on("disconnect", () => {
       // console.log(`the member with id: ${socket.id} disconnected`); 
    });

});

server.listen(3001, () =>{
    console.log("SERVER RUNNING ........")
});