const express = require('express');
const bodyParser = require('body-parser');
const { v4: newId } = require('uuid');

const app = express();
const server = require('http').Server(app);
const cors = require('cors');

var users = []


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,

    })
)
app.use(cors({
    origin: "*"

}));

app.options(
    cors({
        origin: 'http://localhost:3000'
    })
)

const io = require('socket.io')(server, {
    cors: {
        origin: ['http://192.168.0.123:3000', 'http://localhost:3000'],
        methods: ['GET', 'POST']
    }
})


app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
})

app.get('/dialogs', (req, res) => {
    res.status(200).send(users);
})

app.get('/reloadDialogs', (req, res) => {
    setTimeout(() => res.status(200).send(users), 1000)
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    if (users.some((i) => i.username === username)) {
        res.status(400).send('This username already exists');
    } else {
        const id = newId();
        users.push({ id, username });
        res.status(201).send({ id, username });
    }
})

io.on('connection', socket => {
    console.log(socket.id);
    socket.on('auth', (username) => {
        if (!users.some(i => i.username === username)) {
            users.push({ id: socket.id, username });
            socket.emit('setProfile', { username, id: socket.id })
            io.emit('dialogs', users);
        } else {
            socket.emit('setProfile', { error: 'This username already has registered' });
        }
    })
    socket.on('message', (message) => {
        const { to, ...send } = message;
        io.to(to).emit('message', send);
    })

    socket.on('disconnect', () => {
        users = users.filter((item) => item.id !== socket.id);
        io.emit('dialogs', users);
    })
})

server.listen(4000);