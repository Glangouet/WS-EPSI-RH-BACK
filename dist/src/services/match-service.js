"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match_1 = require("../models/match");
class MatchService {
    initializeMatch() {
        this.match = new match_1.default(this.matchConfig);
        return true;
    }
}
exports.default = new MatchService();
