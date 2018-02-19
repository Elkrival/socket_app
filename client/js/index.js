const socket = io();

const happy = async() =>{
socket.emit('happy',{ reason: 'it\'s my birdday'})
}
socket.on('serverMsg', (async(data) =>{
console.log(data.msg)
}))
