import {Socket} from 'socket.io';
import MatchDao from "../dao/match.dao";

class MatchSocket {

    private io: Socket;
    private socket: Socket;
    private matchDao: MatchDao;

    constructor(injector: any) {
        this.io = injector.io;
        this.socket = injector.socket;
        this.matchDao = injector.daoList[MatchDao.name];
        this.initializeEvent();
    }

    private initializeEvent() {
        this.socket.on('start', (data) => {
            //
        });
        this.socket.on('end', (data) => {
            //
        });
        this.socket.on('newScore', (data) => {
            //
        });
    }

}
export default MatchSocket;
