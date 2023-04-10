const express = require("express");

const app = express();

const PORT = 4000;

// new immport

const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

// set up a configuration to connect server to client

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

// establishing a web socket connection

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  // listen the message recceive from the client
  socket.on("message", (data) => {
    // send the message to all the user on the server
    socketIO.emit("messageResponse", data);
  });

  //   adds the user when new user join the server

  socket.on("newUser", (data) => {
    users.push(data);
    socketIO.emit("newUserResponse", users);
  });

  //   console.log("users", users);

  //  for disconnection of the user
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");

    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

http.listen(PORT, () => {
  console.log(`server is running at PORT ${PORT}`);
});
