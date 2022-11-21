const socket = io.connect();

function addMessage() {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const newMessage = {
        name: name,
        message: message,
    };
    
    socket.emit('new-message', newMessage);
    return false;
}


function render(data) {
    const html = data.map((elem, index) => {
        return (`
        <div>
            <strong>${elem.name}</strong>
            <em>${elem.message}</em>
        </div>
        `);
    }).join(' ');
        document.getElementById('messages').innerHTML = html;
    }



socket.on('messages', function (data) {
    render(data)
    });