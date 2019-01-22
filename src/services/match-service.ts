import Match from "../models/match";
import MatchConfig from "../models/match-config";

class MatchService {

    public matchConfig: MatchConfig;
    public match: Match;

    public initializeMatch(): boolean {
        this.match = new Match(this.matchConfig);
        return true;
    }

}

export default new MatchService();