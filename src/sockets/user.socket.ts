import {Socket} from 'socket.io';
import UserDao from "../dao/user.dao";
import User from "../models/user";

class UserSocket {

    private io: Socket;
    private socket: Socket;
    private userDao: UserDao;

    constructor(injector: any) {
        this.io = injector.io;
        this.socket = injector.socket;
        this.userDao = injector.daoList[UserDao.name];
        this.initializeEvent();
    }

    private initializeEvent() {
        this.socket.on('login', (user: User) => {
            this.login(user);
        });
    }

    private login(user: User) {
        this.userDao.getUserByUsernameAndPassword(user).then(
            user => {
                if (user) {
                    this.socket.emit('login', user);
                } else {
                    this.socket.emit('userNotFound');
                }
            }
        )
    }

}
export default UserSocket;
