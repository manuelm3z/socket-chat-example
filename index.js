const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
    
    socket.on('disconnect', () => {
        io.emit('user_disconnected');
    });

    socket.on('new_user_conected', user => {
        io.emit('user_conected', user);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});