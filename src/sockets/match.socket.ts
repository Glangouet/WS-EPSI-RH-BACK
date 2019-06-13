import {Socket} from 'socket.io';
import MatchDao from "../dao/match.dao";
import Match from "../models/match";
import Team from "../models/team";
import TeamDao from "../dao/team.dao";
import MatchService from "../services/match.service";

class MatchSocket {

    private io: Socket;
    private socket: Socket;
    private matchDao: MatchDao;
    private teamDao: TeamDao;
    private matchService: MatchService;

    constructor(injector: any) {
        this.io = injector.io;
        this.socket = injector.socket;
        this.matchDao = injector.daoList[MatchDao.name];
        this.teamDao = injector.daoList[TeamDao.name];
        this.initializeEvent();
        this.matchService = injector.matchService;
    }

    private initializeEvent() {
        this.socket.on('new_match', (match: Match) => {
            this.onNewMatch(match);
        });
        this.socket.on('start', (data) => {
            //
        });
        this.socket.on('end', (data) => {
            //
        });
        this.socket.on('update_match', (match: Match) => {
            this.onUpdateMatch(match);
        });
    }

    private async onUpdateMatch(match: Match) {
        await this.matchDao.updateMatchScore(match);
        this.matchService.handleGetMatchs().then(
            (matchList: Match[]) => {
                console.log(matchList);
                this.io.emit('match_list', matchList);
            }
        );
    }

    private async onNewMatch(match: Match) {
        const team1 = await this.verifAndReturnTeam(match.team_first);
        const team2 = await this.verifAndReturnTeam(match.team_second);
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
        this.matchService.handleGetMatchs().then(
            (matchList: Match[]) => {
                this.io.emit('match_list', matchList);
            }
        );
    }

    async verifAndReturnTeam(team: Team) {
        const teamCheck = await this.teamDao.getTeamByLabel(team.label);
        if (teamCheck) {
            return teamCheck;
        }

        team.score = 0;
        team.id = null;
        team.playersNb = 20;
        this.teamDao.addTeam(team);

        return await this.teamDao.getTeamByLabel(team.label);
    }

}
export default MatchSocket;
