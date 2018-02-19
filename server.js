const express = require('express');
const app = express();
const crypto = require('crypto')
const http = require('http').Server(app)
const socket = require('socket.io')(http)
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/client'))
app.get('/', (async(req, res)=>{
 res.sendFile(__dirname + '/client/html/index.html')
}))
http.listen(PORT, (async () =>{
 console.log(`Listening on ${PORT}`)
}))
const SOCKET_LIST = {}

socket.on('connection', (async(sockets)=>{
 console.log('a user is connected')
 socket.id = Math.random()
 socket.x=0;
 socket.y=0;
 socket.number = "" + Math.floor(10 * Math.random())
 SOCKET_LIST[socket.id] = sockets
 sockets.on('happy', (async(data) =>{
  console.log('happy ', data.reason)
  if(!!data.reason === true){
   sockets.emit('serverMsg', { msg: 'howdy' })
  }
 }))
 sockets.emit('serverMsg', { msg: "hello "})
 sockets.on("disconnect", (async()=>{
  console.log('user has disconnected')
 }))
}))
// Handling One PLayer
// setInterval(()=>{
//  for(socket_user in SOCKET_LIST){
//   const user = SOCKET_LIST[socket_user]
//    socket.x++;
//    socket.y++;
//    socket.emit('newPosition', { x:socket.x, y:socket.y})
//  }
// },1000/25)
/*

             We will have two types of communication using the Express module the client will be asking the server for a file such as the sprite.
             Package Communcaiton will be handled by socket.io it will send client data to the server (user inputs), server sends data to the client(monster position)


               -------- Handling Multiple Users -----------

            We want to use a socket list to handle multiple users the list will have an ID and to generate the id we will use the Crypto library.

            We add the first player: To do that we will set an interval function that runs every 250ms, this function will loop through the player and it will retrieve the players position, then the position will be shown to the user

           For multiplayer we will refine the setInterval function slightly by adding a package content array that will store the other user positions, then we will loop through the list again and emit the positions therefore sharing with multiple users.
*/
setInterval(()=> {
 const pack = []
 for (player in SOCKET_LIST) {
  const players = SOCKET_LIST[player]
  socket.x++
  socket.y++

  pack.push({ x: socket.x, y: socket.y, number: socket.number })
 }
 for (viewer in SOCKET_LIST) {
  const players = SOCKET_LIST[viewer]
  socket.emit('newPositions', pack)
 }
}, 10000/25);
