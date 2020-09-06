const empty = require('./empty');

class Users {
    constructor() {
        this.lastId = 1;
        this.users = [{
            ...empty.user,
            id: 1,
            username: 'admin',
            password: '1234',
            role: 'admin'
          }
        ];
    }

    getUsers = () => {
        return this.users.map(u => {
            const {password, ...user} = u;
            return user;
        });
    };
    getUser = (id) => {
        return this.users.find(u => u.id === parseInt(id)) || {};
    };
    getUserByUsername = (username) => {
        return this.users.find(u => u.username === username) || {};
    };
    getNewId = () => {
        this.lastId += 1;
        return this.lastId;
    };
    checkUsernameExists = (username) => {
        return this.users.findIndex(u => u.username === username) > -1;
    };
    createUser = (user) => {
        const newUser = {
          ...empty.user,
          ...user,
          id: this.getNewId()
        };
        this.users.push(newUser);
        return newUser;
    };
    updateUser = (user) => {
        const userIndex = this.users.findIndex(u => u.id === parseInt(user.id));
        if (userIndex >= 0) {
          this.users.splice(userIndex, 1, user);
          return this.getUser(userIndex);
        } else {
            return false;
        }
    };
    deleteUser = (id) => {
        const userIndex = this.users.findIndex(u => u.id === parseInt(id));
        if (userIndex >= 0) {
            this.users.splice(userIndex, 1);
            return true;
        } else {
            return false;
        }
    };
}

const users = new Users();
module.exports = users;