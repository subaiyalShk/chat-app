const express = require('express');
const cors = require('cors');
const app= express();
const cookieParser= require('cookie-parser');
const UsersController = require('./controllers/Users.controller');
require('./config/mongoose.config');
require('dotenv').config({path:__dirname + '/../.env'});
console.log(process.env.SECRET_KEY)

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// origin has to be from where client is making requests to server
app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000' 
}));


require('./routes/Users.routes')(app);
require('./routes/Message.routes')(app);
const {addUser, removeUser, getUser, getUsersInRoom} = require('./OnlineUsers.js')

const server = app.listen(8000, ()=>{
    console.log("Listening at port 8000")
})


const io = require("socket.io")(server);
let connectedClients=0;

const messages = []
io.on("connection", socket =>{
    connectedClients++;
    console.log(socket.id)
    console.log("We have " + connectedClients + "connected!") 
    
    // Error handling can be done by passing a second argument
    socket.on('join', ({name, room}, callback)=>{
        console.log(name, room)
        const {error, user} = addUser({id: socket.id, name, room});

        if(error) return callback({error:'error'})
        
        socket.emit('message', {user:'admin', text:`${user.name}, welcome to the room ${user.room}`})

        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name}, has joined!`})

        socket.join(user.room);

        io.to(user.room).emit('roomData', {room:user.room, users:getUsersInRoom(user.room)})

        callback()
    } )

    socket.on('sendMessage', (message, callback)=> {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', {user:user.name, text:message})
        
        callback()
    })

    // // This is an event listener
    // socket.on('new message', payload => {
    //     console.log(payload)
    //     // messages.push(payload)
    //     io.emit('updated messages', payload)
    // })

    // This is an event listener
    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id)
        
        if(user){
            io.to(user.room).emit('message', {user:'admin', text: `${user.name} has left`})
            io.to(user.room).emit('roomData', {room:user.room, users:getUsersInRoom(user.room)})
        }

        connectedClients--;
        console.log("We have " + connectedClients + "connected!")
    })
})





