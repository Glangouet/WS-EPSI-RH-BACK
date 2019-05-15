import Team from "./team";

class Match {

    public team1_id?: number;
    public team2_id?: number;
    public team1_score?: number;
    public team2_score?:number;
    public team_first: Team;
    public team_second: Team;
    public startDate: number;
    public endDate: number;
    public label: string;

    constructor(team_first: Team, team_second: Team, label: string, startDate: number, endDate: number) {
        this.team_first = team_first;
        this.team_second = team_second;
        this.startDate = startDate;
        this.endDate = endDate;
        this.label = label;
    }
}

export default Match;