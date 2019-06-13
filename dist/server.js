"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const match_socket_1 = require("./sockets/match.socket");
const app = new app_1.default([], [
    match_socket_1.default
], 8095);
app.listen();
