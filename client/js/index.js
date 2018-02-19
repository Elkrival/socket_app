//  ---------------------- Canvas ---------------

const ctx = document.getElementById('ctx').getContext("2d")
ctx.font = "10px Arial"


// ----------------------- Socket ----------------
const socket = io();

const happy = async() =>{
socket.emit('happy',{ reason: 'it\'s my birdday'})
}
socket.on('serverMsg', (async(data) =>{
console.log(data.msg)
}))
// newPosition > this socket connection will take the new x and y position of the element, by clearing the canvas and redrawging.

// socket.on('newPosition', (async(data)=>{
//  ctx.clearRect(0,0,250,250);
//  ctx.fillText("I", data.x,data.y)
// }))
// new position function works
socket.on('newPositions', (async(data)=>{

 ctx.clearRect(0,0,250,250);
 // data.map((position)=>{
 //  ctx.fillText("S", position.x, position.y)
 // })
 for (var i = 0; i < data.length; i++) {
  ctx.fillText(data[i].number, data[i].x, data[i].y)
 }
}))

// the newpositions function is an array this time, therefore we need to loop through the array when handling multiple users
