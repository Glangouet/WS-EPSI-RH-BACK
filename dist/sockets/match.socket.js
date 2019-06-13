"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match_dao_1 = require("../dao/match.dao");
class MatchSocket {
    constructor(injector) {
        this.io = injector.io;
        this.socket = injector.socket;
        this.matchDao = injector.daoList[match_dao_1.default.name];
        this.initializeEvent();
    }
    initializeEvent() {
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
exports.default = MatchSocket;
