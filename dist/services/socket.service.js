"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIo = require("socket.io");
class SocketService {
    listen(listen) {
        this.io = socketIo(listen);
    }
}
exports.default = new SocketService();
