const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utilities');


const users = new Users();

io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {

        if(!data.name || !data.room) {
            return callback({
                error: true,
                message: 'El nombre/sala es necesaria'
            });
        }

        client.join(data.room);

        users.setPeople(client.id, data.name, data.room);

        client.broadcast.to(data.room).emit('listPeople', users.getPeoplesPerRoom(data.room));

        callback(users.getPeoplesPerRoom(data.room));
    });

    client.on('createMessage', (data) => {
        let people = users.getPeople(client.id)

        let message = createMessage(people.name, data.message);
        client.broadcast.to(data.room).emit('createMessage', message);
    });

    client.on('disconnect', () => {
        let deletedPeople = users.deletePeople(client.id);

        client.broadcast.to(deletedPeople.room).emit('createMessage', createMessage('Administrador', `${deletedPeople.name} salió`));
        client.broadcast.to(deletedPeople.room).emit('listPeople', users.getPeoplesPerRoom(deletedPeople.room));
    });

    // Mensajes Privados
    client.on('privateMessage', data => {

        let people = users.getPeople(client.id);

        client.broadcast.to(data.to).emit('privateMessage', createMessage(people.name, data.message));
    });

});