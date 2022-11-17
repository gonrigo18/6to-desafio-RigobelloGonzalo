express = require('express');

const { Server: HttpServer } = require ('http');
const {Server: IOServer} = require ('socket.io');

const app = express();
const httpServer = new HttpServer (app);


const io =  new IOServer(httpServer);

const messages = [];

app.use(express.static(__dirname +'/public'));

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');


    socket.on('message', data => {
        messages.push({socketId: socket.id, message: data, date: new Date()});
        io.sockets.emit('messages', messages);
    });
});

const port = 8080;

const server = httpServer.listen(port, () =>{
    console.log (`Server listening en http://localhost:${port}`);
});

server.on ('err', error=> console.log(`Server error, ${err}`));