class Team {

    public id?: number;
    public label?: string;
    public playersNb?: number;
    public score?: number;

    constructor(id?: number, label?: string, playersNb?: number, score?: number) {
        this.id = id;
        this.label = label;
        score ? this.score = score : 0;
        playersNb ? this.playersNb = playersNb : 0
    }
}

export default Team;
