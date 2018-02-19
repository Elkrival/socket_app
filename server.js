const express = require('express');
const app = express();
const http = require('http').Server(app)
const socket = require('socket.io')(http)
const PORT = process.env.PORT || 8080;

app.get('/', (async(req, res)=>{
 res.sendFile(__dirname + '/html/index.html')
}))
http.listen(PORT, (async () =>{
 console.log(`Listening on ${PORT}`)
}))

socket.on('connection', (async(socket)=>{
 console.log('a user is connected')
 socket.on("disconnect", (async()=>{
  console.log('user has disconnected')
 }))
}))
