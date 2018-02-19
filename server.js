const express = require('express');
const app = express();
const http = require('http').Server(app)
const socket = require('socket.io')(http)
const PORT = process.env.PORT || 8080;

app.get('/', (async(req, res)=>{
 res.sendFile(__dirname + '/client/html/index.html')
}))
app.use('/client', express.static(__dirname + '/client/html'))
http.listen(PORT, (async () =>{
 console.log(`Listening on ${PORT}`)
}))

socket.on('connection', (async(sockets)=>{
 console.log('a user is connected')
 sockets.on('happy', (async(data) =>{
  console.log('happy ', data.reason)
 }))
 sockets.emit('serverMsg', { msg: "hello "})
 sockets.on("disconnect", (async()=>{
  console.log('user has disconnected')
 }))
}))

/*

             We will have two types of communication using the Express module the client will be asking the server for a file such as the sprite.
             Package Communcaiton will be handled by socket.io it will send client data to the server (user inputs), server sends data to the client(monster position)
*/
