var socket= io();
        
socket.on('connect',function(){
console.log('Connected to server'); 
        
socket.emit('createEmail',{
  to:'jen@example.com',
  text:'Hey. This is Prateek'
  });
  });
            
socket.on('disconnect',function(){
    
console.log('Disconnected from server'); 
});

socket.on('newMessage', function(message){
   console.log('New Message', message); 
});

socket.emit('createMessage',{
   from:'Prateek',
    text:'First message from client to server'
});

        