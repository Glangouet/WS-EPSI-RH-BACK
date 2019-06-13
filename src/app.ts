import * as express from 'express';
import {Controller} from './types/controller';
import SocketService from './services/socket.service';
import socketIo from 'socket.io';
import  * as Sqlite3 from 'sqlite3';
import MatchDao from "./dao/match.dao";
import UserDao from "./dao/user.dao";
import TeamDao from "./dao/team.dao";
import MatchService from "./services/match.service";
import Match from "./models/match";

class App {

    public app: express.Application;
    public port: number;
    public sockets: any;
    public controllers: Controller[];
    public db = new Sqlite3.Database('./data/mspr.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the doc SQlite database.');
    });
    public daoList: object;

    constructor(controllers: Controller[], sockets: any, port: number) {
        this.app = express();
        this.port = port;
        this.sockets = sockets;
        this.controllers = controllers;
    }

    private initializeDao() {
        this.daoList = {};
        this.daoList[UserDao.name] = new UserDao(this.db);
        this.daoList[TeamDao.name] = new TeamDao(this.db);
        this.daoList[MatchDao.name] = new MatchDao(this.db);
    }

    private initializeControllers() {
        this.controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private initializeSocketIo() {
        const matchService = new MatchService(this.daoList);
        SocketService.io.on('connection', (socket: socketIo.Socket) => {
            const injector = {
                io: SocketService.io,
                socket: socket,
                daoList: this.daoList,
                matchService: matchService
            };
            this.sockets.forEach((name: any) => {
                new name(injector);
            });

            socket.join(socket.id);
            console.log('nouvelle  connexion: ' + socket.id);
            matchService.handleGetMatchs().then(
                (matchList: Match[]) => {
                    socket.emit('match_list', matchList);
                }
            );
        });
    }

    public listen() {
        const listen = this.app.listen(this.port, () => {
            console.log(`Main app listening on the port ${this.port}`);
        });
        SocketService.listen(listen);
        this.initializeDao();
        this.initializeSocketIo();
        this.initializeControllers();
    }
}

export default App;
