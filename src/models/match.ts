import Team from "./team";
import MatchConfig from "./match-config";

class Match {

    public teamFirst: Team;
    public teamSecond: Team;

    constructor(matchConfig: MatchConfig) {
        this.teamFirst = new Team(matchConfig.teamIdFirst, matchConfig.teamNameFirst, 0);
        this.teamSecond = new Team(matchConfig.teamIdSecond, matchConfig.teamNameSecond, 0);
    }
}

export default Match;