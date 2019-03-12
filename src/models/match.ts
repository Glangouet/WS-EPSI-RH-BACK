import Team from "./team";

class Match {

    public teamFirst: Team;
    public teamSecond: Team;
    public startDate: number;
    public endDate: number;
    public label: string;

    constructor(teamFirst: Team, teamSecond: Team, label: string, startDate: number, endDate: number) {
        this.teamFirst = teamFirst;
        this.teamSecond = teamSecond;
        this.startDate = startDate;
        this.endDate = endDate;
        this.label = label;
    }
}

export default Match;