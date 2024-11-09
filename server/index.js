var express = require ("express");
var app = express();
var server = require('http').Server(app); //creamos una variable para el servidor y cargamos la libreria http y le pasamos nuestra app como variable


var io = require('socket.io')(server,{
    cors: { // Permite el acceso de orígenes mixtos (CORS)
        origin: '*'
    }
})

//cargo una vista estatica por defecto
app.use(express.static('client'));

app.get('/hola-mundo', function(req, res){
    res.status(200).send('Hola mundo desde una ruta');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NodeJS de Andre',
    nickname: 'Bot - Andre'
}];


//apertura de conexon al socket
//el metodo "on()" me permite lazar eventos. El metodo puesto se encargara de recibir las conexiones de los clientes y detectara cada vez que un ciente se conecte
io.on('connection', function(socket){
    console.log("El cliente con IP: "+socket.handshake.address+" se ha conectado");

    socket.emit('messages', messages);


    socket.on('add-message', (data) => {
        messages.push(data);

        io.emit('messages', messages);
    });


});
//este metodo detecta si un cliente de ha conectado a nuestro socket

server.listen(6677, function(){
    console.log('Servidor funcionando en http://localhost:6677');

});


