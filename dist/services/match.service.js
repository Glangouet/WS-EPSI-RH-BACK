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
const team_dao_1 = require("../dao/team.dao");
const match_dao_1 = require("../dao/match.dao");
class MatchService {
    constructor(daoList) {
        this.teamDao = daoList[team_dao_1.default.name];
        this.matchDao = daoList[match_dao_1.default.name];
    }
    handleGetMatchs() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.matchDao.getMatchList().then((matchList) => __awaiter(this, void 0, void 0, function* () {
                    const hydrateMatch = yield this.hydrateTeams(matchList);
                    // renvoi le tout
                    this.matchList = hydrateMatch;
                    resolve(hydrateMatch);
                }));
            });
        });
    }
    hydrateTeams(matchList) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let m of matchList) {
                // recuperation team
                m.team_first = yield this.teamDao.getTeamById(m.team1_id);
                m.team_second = yield this.teamDao.getTeamById(m.team2_id);
            }
            return matchList;
        });
    }
}
exports.default = MatchService;
