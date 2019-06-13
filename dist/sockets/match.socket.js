"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const match_dao_1 = require("../dao/match.dao");
const team_dao_1 = require("../dao/team.dao");
class MatchSocket {
    constructor(injector) {
        this.io = injector.io;
        this.socket = injector.socket;
        this.matchDao = injector.daoList[match_dao_1.default.name];
        this.teamDao = injector.daoList[team_dao_1.default.name];
        this.initializeEvent();
        this.matchService = injector.matchService;
    }
    initializeEvent() {
        this.socket.on('new_match', (match) => {
            this.onNewMatch(match);
        });
        this.socket.on('start', (data) => {
            //
        });
        this.socket.on('end', (data) => {
            //
        });
        this.socket.on('update_match', (match) => {
            this.onUpdateMatch(match);
        });
    }
    onUpdateMatch(match) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.matchDao.updateMatchScore(match);
            this.matchService.handleGetMatchs().then((matchList) => {
                console.log(matchList);
                this.io.emit('match_list', matchList);
            });
        });
    }
    onNewMatch(match) {
        return __awaiter(this, void 0, void 0, function* () {
            const team1 = yield this.verifAndReturnTeam(match.team_first);
            const team2 = yield this.verifAndReturnTeam(match.team_second);
            match.team_first = team1;
            match.team_second = team2;
            match.startDate = new Date().getTime();
            match.endDate = new Date().getTime();
            match.team2_score = 0;
            match.team1_score = 0;
            match.team1_id = team1.id;
            match.team2_id = team2.id;
            this.matchDao.addMatch(match);
            console.log(match);
            this.matchService.handleGetMatchs().then((matchList) => {
                this.io.emit('match_list', matchList);
            });
        });
    }
    verifAndReturnTeam(team) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamCheck = yield this.teamDao.getTeamByLabel(team.label);
            if (teamCheck) {
                return teamCheck;
            }
            team.score = 0;
            team.id = null;
            team.playersNb = 20;
            this.teamDao.addTeam(team);
            return yield this.teamDao.getTeamByLabel(team.label);
        });
    }
}
exports.default = MatchSocket;
