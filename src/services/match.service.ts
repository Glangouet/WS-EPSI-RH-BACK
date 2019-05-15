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


    async handleGetMatchs(): Promise<Match[]> {
        return new Promise(resolve => {
            this.matchDao.getMatchList().then(
                async matchList => {

                    const hydrateMatch = await this.hydrateTeams(matchList);

                    // renvoi le tout
                    this.matchList = hydrateMatch;
                    resolve(hydrateMatch);
                }
            );
        });
    }

    public async hydrateTeams(matchList: Match[]) {
            for (let m of matchList) {
                // recuperation team
                m.team_first = await this.teamDao.getTeamById(m.team1_id);
                m.team_second = await this.teamDao.getTeamById(m.team2_id);
            }

            return matchList;
    }
}

export default MatchService;
