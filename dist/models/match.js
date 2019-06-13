"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Match {
    constructor(team_first, team_second, label, startDate, endDate) {
        this.state = 'en attente';
        this.team_first = team_first;
        this.team_second = team_second;
        this.startDate = startDate;
        this.endDate = endDate;
        this.label = label;
    }
}
exports.default = Match;
