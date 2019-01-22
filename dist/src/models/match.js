"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const team_1 = require("./team");
class Match {
    constructor(matchConfig) {
        this.teamFirst = new team_1.default(matchConfig.teamIdFirst, matchConfig.teamNameFirst, 0);
        this.teamSecond = new team_1.default(matchConfig.teamIdSecond, matchConfig.teamNameSecond, 0);
    }
}
exports.default = Match;
