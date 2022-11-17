const socket = io.connect();

const inputBox = document.querySelector('input');
const myButton = document.querySelector('button');
myButton.addEventListener('click', ()=>{
    socket.emit('message', inputBox.value);
});

socket.on('messages', msj =>{
    const messageHtml = msj.map(msj => `Date: ${msj.date}SocketId: ${msj.socketId} -> message: ${msj.message}`).join('<br>');
    document.querySelector('p').innerHTML = messageHtml;
});