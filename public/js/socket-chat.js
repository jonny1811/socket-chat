var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('enterChat', user, function(res) {
        console.log('Usuarios conectados', res);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('createMenssage', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('createMessage', function(menssage) {

    console.log('Servidor:', menssage);

});

/* Escuchar cambios de usuarios
cuando un usuario entra o sale del chat */
socket.on('listPeople', function(peoples) {

    console.log('Servidor:', peoples);

});

// Mensajes Privados
socket.on('privateMessage', function(message) {
    console.log('Mensaje Privado', message);
});