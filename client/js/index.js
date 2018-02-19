const socket = io();
socket.emit('happy', {
 reason:'it\'s my birfday'
})
