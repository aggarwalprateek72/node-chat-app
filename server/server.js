const path= require('path');
const express= require('express');
const socketIO= require('socket.io');
const http= require('http');
const publicPath= path.join(__dirname,'../public');
//console.log(publicPath);
const port= process.env.PORT || 3000;
var app= express();

var server= http.createServer(app);
var io= socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{

    console.log('New User Connected');
    
    socket.emit('newMessage',{
       from:'prateek@example.com',
        text:'I am doing good',
        createdAt:1234567890
    });
    
//listening to the createmessage event
    socket.on('createMessage',(createmessage)=>{
       console.log('Created message', createmessage); 
    });
    socket.on('disconnect',()=>{
        
    console.log('User disconnected');
    });
}); 

server.listen(port, ()=>{
    console.log(`Server is up on ${port}`);
});
