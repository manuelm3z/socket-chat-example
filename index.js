const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    socket.on('new_user_conected', user => {
        io.emit('user_conected', user);
    });
    
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
    
    socket.on('new_typing', user => {
        io.emit('typing', user);
    });

    socket.on('new_stop_typing', user => {
        io.emit('stop_typing', user);
    });

    socket.on('disconnect', () => {
        const clients = io.of('/').connected;

        let users = [];

        for (let user in clients) {
            users.push(user);
        }

        io.emit('user_disconnected', users);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});