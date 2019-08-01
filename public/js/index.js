var socket= io();
        
socket.on('connect',function(){
console.log('Connected to server'); 
    
});
            
socket.on('disconnect',function(){
    
console.log('Disconnected from server'); 
});

socket.on('newMessage', function(message){
    var formattedTime= moment(message.createdAt).format('h:mm a');
    var template= jQuery('#message-template').html();
    var html= Mustache.render(template, {
        text: message.text,
        createdAt: formattedTime,
        from: message.from
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message){
    
    var formattedTime= moment(message.createdAt).format('h:mm a');
    var template= jQuery('#location-message-template').html();
    var html= Mustache.render(template, {
        url: message.url,
        createdAt: formattedTime,
        from: message.from
    });
    jQuery('#messages').append(html);

/*
   var li= jQuery('<li></li>');
   var formattedTime= moment(message.createdAt).format('h:mm a');
   var a= jQuery('<a target="_blank">My Current Location</a>');
    
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
*/

});
jQuery('#message-form').on('submit', function(e){
   e.preventDefault();
    
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){
        
        jQuery('[name=message]').val('');
        
    });
});

var locationButton= jQuery('#send-location');

locationButton.on('click', function(){
   if(!navigator.geolocation){
       return alert('Geo Location is not supported by this Browser.');
   }
    locationButton.attr('disabled', 'disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send Location');
        
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        
    }, function (){
        
       locationButton.removeAttr('disabled').text('Send Location');
       alert('Unable to Send Location'); 
    });
    
    
});