class MatchConfig {

    public dateStart: number;
    public dateHalfTime: number;
    public teamIdFirst: number;
    public teamNameFirst: string;
    public teamIdSecond: number;
    public teamNameSecond: string;

    constructor(data) {
        this.dateStart = data['dateStart'];
        this.dateHalfTime = data['dateHalfTime'];
        this.teamIdFirst = data['teamIdFirst'];
        this.teamNameFirst = data['teamNameFirst'];
        this.teamIdSecond = data['teamIdSecond'];
        this.teamNameSecond = data['teamNameSecond'];
    }

    public checkDataAreFull(): boolean {
        return !!(this.dateStart
            && this.dateHalfTime
            && this.teamIdFirst
            && this.teamNameFirst
            && this.teamIdSecond
            && this.teamNameSecond);
    }
}

export default MatchConfig;