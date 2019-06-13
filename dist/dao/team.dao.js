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
const team_1 = require("../models/team");
class TeamDao {
    constructor(db) {
        this.db = db;
        this.initializeDao();
        this.buildFixtures();
    }
    initializeDao() {
        this.db.run(`
  CREATE TABLE IF NOT EXISTS team(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label VARCHAR NOT NULL, 
  players_nb INTEGER NOT NULL
  )`);
    }
    addTeam(team) {
        this.db.run(`INSERT INTO team(label, players_nb)
        VALUES(?, ?)`, [
            team.label,
            team.playersNb
        ], (err) => {
            if (err) {
                return console.log(err.message);
            }
            console.log('Team was added to the table.');
        });
    }
    getTeamById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.db.get(`SELECT * FROM team WHERE id=${id}`, (err, rows) => {
                    if (err) {
                        throw err.message;
                    }
                    resolve(rows);
                });
            });
        });
    }
    buildFixtures() {
        const team1 = new team_1.default(null, 'PARIS', 25);
        const team2 = new team_1.default(null, 'OM', 25);
        const team3 = new team_1.default(null, 'SAINT ETIENNE', 25);
        this.addTeam(team1);
        this.addTeam(team2);
        this.addTeam(team3);
    }
}
exports.default = TeamDao;
