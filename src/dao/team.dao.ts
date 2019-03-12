import Team from "../models/team";

class TeamDao implements DaoInterface {

    private db: any;

    constructor(db: any) {
        this.db = db;
        this.initializeDao();
        this.buildFixtures();
    }

    initializeDao() {
        this.db.run(`
  CREATE TABLE IF NOT EXISTS team(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label VARCHAR NOT NULL, 
  players_nb INTEGER NOT NULL
  )`
        );
    }

    addTeam(team: Team) {
        this.db.run(`INSERT INTO team(label, players_nb)
        VALUES(?, ?)`,
            [
                team.label,
                team.playersNb
            ],
            (err) => {
                if(err) {
                    return console.log(err.message);
                }
                console.log('Team was added to the table.');
            })
    }

    getTeamById(id: number): Promise<any> {
        return new Promise(resolve => {
            this.db.get(`SELECT * FROM team WHERE id=${id}`,
                (err, rows) => {
                    if(err) {
                       throw err.message;
                    }
                    resolve(rows);
                });
        });
    }

    buildFixtures() {
        const team1 = new Team(null, 'PARIS', 25);
        const team2 = new Team(null, 'OM', 25);
        const team3 = new Team(null, 'SAINT ETIENNE', 25);
        this.addTeam(team1);
        this.addTeam(team2);
        this.addTeam(team3);
    }

}
export default TeamDao;
