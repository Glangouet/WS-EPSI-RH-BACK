"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_dao_1 = require("../dao/user.dao");
class UserSocket {
    constructor(injector) {
        this.io = injector.io;
        this.socket = injector.socket;
        this.userDao = injector.daoList[user_dao_1.default.name];
        this.initializeEvent();
    }
    initializeEvent() {
        this.socket.on('login', (user) => {
            this.login(user);
        });
    }
    login(user) {
        this.userDao.getUserByUsernameAndPassword(user).then(user => {
            if (user) {
                this.socket.emit('login', user);
            }
            else {
                this.socket.emit('userNotFound');
            }
        });
    }
}
exports.default = UserSocket;
