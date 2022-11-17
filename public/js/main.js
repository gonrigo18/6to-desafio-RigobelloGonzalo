const socket = io.connect();

function addMessage() {
    const name= document.getElementById('name').value;
    const msg = document.getElementById('message').value;

    const newMessage = {
        name: name,
        msg: message,
    };
    socket.emit('new-message', newMessage);
    return false;
}
socket.on('messages', msj =>{
    const messageHtml = msj.map(msj => `<b>${msj.name}:</b><i>${msj.message}</i>`).join('<br>');
    document.querySelector('p').innerHTML = messageHtml;
});