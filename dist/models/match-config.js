"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MatchConfig {
    constructor(data) {
        this.dateStart = data['dateStart'];
        this.dateHalfTime = data['dateHalfTime'];
        this.teamIdFirst = data['teamIdFirst'];
        this.teamNameFirst = data['teamNameFirst'];
        this.teamIdSecond = data['teamIdSecond'];
        this.teamNameSecond = data['teamNameSecond'];
    }
    checkDataAreFull() {
        return !!(this.dateStart
            && this.dateHalfTime
            && this.teamIdFirst
            && this.teamNameFirst
            && this.teamIdSecond
            && this.teamNameSecond);
    }
}
exports.default = MatchConfig;
