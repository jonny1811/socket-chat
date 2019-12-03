class Users {
    constructor() {
        this.peoples = [];
    }

    setPeople(id, name, room) {
        let people = {id, name, room};

        this.peoples.push(people);

        return this.peoples;
    }

    getPeople(id) {
        let people = this.peoples.filter(people => people.id === id)[0];

        return people;
    }

    getPeoples() {
        return this.peoples;
    }

    getPeoplesPerRoom(room) {
        let peoplesRoom = this.peoples.filter(people => people.room === room);
        return peoplesRoom;
    }

    deletePeople(id) {

        let deletedPeople = this.getPeople(id);

        this.peoples = this.peoples.filter(people => people.id !== id);

        return deletedPeople;
    }
}

module.exports = {
    Users
}