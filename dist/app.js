"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socket_service_1 = require("./services/socket.service");
const Sqlite3 = require("sqlite3");
const match_dao_1 = require("./dao/match.dao");
const user_dao_1 = require("./dao/user.dao");
const team_dao_1 = require("./dao/team.dao");
const match_service_1 = require("./services/match.service");
class App {
    constructor(controllers, sockets, port) {
        this.db = new Sqlite3.Database('./data/mspr.db', (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to the doc SQlite database.');
        });
        this.app = express();
        this.port = port;
        this.sockets = sockets;
        this.controllers = controllers;
    }
    initializeDao() {
        this.daoList = {};
        this.daoList[user_dao_1.default.name] = new user_dao_1.default(this.db);
        this.daoList[team_dao_1.default.name] = new team_dao_1.default(this.db);
        this.daoList[match_dao_1.default.name] = new match_dao_1.default(this.db);
    }
    initializeControllers() {
        this.controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    initializeSocketIo() {
        const matchService = new match_service_1.default(this.daoList);
        socket_service_1.default.io.on('connection', (socket) => {
            const injector = {
                io: socket_service_1.default.io,
                socket: socket,
                daoList: this.daoList,
                matchService: matchService
            };
            this.sockets.forEach((name) => {
                new name(injector);
            });
            socket.join(socket.id);
            console.log('nouvelle  connexion: ' + socket.id);
            matchService.handleGetMatchs().then((matchList) => {
                socket.emit('match_list', matchList);
            });
        });
    }
    listen() {
        const listen = this.app.listen(this.port, () => {
            console.log(`Main app listening on the port ${this.port}`);
        });
        socket_service_1.default.listen(listen);
        this.initializeDao();
        this.initializeSocketIo();
        this.initializeControllers();
    }
}
exports.default = App;
