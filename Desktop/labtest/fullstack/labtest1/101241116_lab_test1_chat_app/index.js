var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const ROUTER = require('./route');
var app = express();
var http = require('http').Server(app);
var cors = require('cors');
var io = require('socket.io')(http);
const db = 'mongodb+srv://admin:admin@cluster0.4nbjm.mongodb.net/myFirst?retryWrites=true&w=majority';
var server;
const PORT = 9000;
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(ROUTER);
app.use(cors());

io.on('connection', (socket) => {
    
    console.log(`User Connected`)

    socket.on("register", function(data) // new user register
    {
        if(data.users == true){
            socket.emit("signUpValid", false);
        }else{
            socket.emit("signUpValid", true);
        }
    })

   
    socket.on("signIn", function(data) // sign in 
     {
        if(data.users == false){
            socket.emit("logInValid", false);
        }
        else {
            data.users.forEach((user) => {
                if((data.username == user.username) && (data.password == user.password)){
                    socket.emit("logInValid", {username: data.username});
                }
            })
        }
    })

    socket.on("userValidate", function(data) //check user information if user exists or not
     {
        if(data.users == true){
            socket.emit("checkUserValid", data.username);
        }else{
            socket.emit("checkUserValid", false);
        }
    })

    socket.on("userTyping", function(data) //user is typing 
    {
        socket.broadcast.to(data.room).emit('showChat', data.username);
    })

    socket.on('joinGroup', function(data) //user join group
    {
        if(socket.currentRoom != ''){
            socket.leave(socket.currentRoom);
        }
        socket.currentRoom = data.room;
        socket.join(data.room);
        console.log(socket.rooms);
    })

    socket.on('leaveRoom', function(data)
    {
        socket.leave(socket.currentRoom);
        socket.currentRoom = '';
        console.log('User left room : ' , socket.rooms);
    })

    socket.on('groupMessage', function(data) 
    {
        var text = { message:data.message, from_user:data.from_user }
        socket.broadcast.to(data.room).emit('newMessage', text);
    })

    socket.on("logOut", function(data) 
    {
        socket.disconnect();
        console.log("User Logged Out");
    })

})

mongoose.connect(db, 
    function(error) 
    {
      if(error)
      {
          console.log('Error connecting: ', error);
      }
      else
      {
          console.log('MongoDB is successfully connected');
      }
    }
);

server = http.listen(PORT, () =>{
    console.log('Server is running on port', PORT);
});