class Team {

    public id?: number;
    public label?: string;
    public playersNb?: number = 0;
    public score?: number = 0;

    constructor(id?: number, label?: string, playersNb?: number, score?: number) {
        this.id = id;
        this.label = label;
    }
}

export default Team;
