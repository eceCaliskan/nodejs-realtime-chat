const server = require('http').createServer();
const io = require('socket.io')(3000);

const users = {}

io.on('connection', socket => {

    //when user enters
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })


    //when user sends a message
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })


    socket.on('typing', function(data) {
        console.log(data);
        socket.broadcast.emit('typing', { name: users[socket.id] });
    });


    //when user
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]

    })

});