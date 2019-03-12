import Match from "../models/match";
import TeamDao from "../dao/team.dao";
import MatchDao from "../dao/match.dao";

class MatchService {

    public teamDao: TeamDao;
    public matchDao: MatchDao;
    public matchList: Match[];

    constructor(daoList: any) {
        this.teamDao = daoList[TeamDao.name];
        this.matchDao = daoList[MatchDao.name];
    }


    handleGetMatchs(): Promise<Match[]> {
        return new Promise(resolve => {
            this.matchDao.getMatchList().then(
                matchList => {
                    matchList.forEach(m => {

                        // recuperation premiere team
                        this.teamDao.getTeamById(m.team1_id).then(
                            firstTeam => {
                                m.teamFirst = firstTeam;

                                // recuperation seconde teamp
                                this.teamDao.getTeamById(m.team2_id).then(
                                    secondTeam => {
                                        m.teamSecond = secondTeam;

                                        // renvoi le tout
                                        this.matchList = matchList;
                                        resolve(matchList);
                                    });
                            });
                    });
                }
            );
        });
    }
}

export default MatchService;
