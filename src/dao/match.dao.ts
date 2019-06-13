import Match from "../models/match";
import Team from "../models/team";

class MatchDao implements DaoInterface {

    private db: any;

    constructor(db: any) {
        this.db = db;
        this.initializeDao();
        this.buildFixtures();
    }

    initializeDao() {
        this.db.run(`
  CREATE TABLE IF NOT EXISTS match(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team1_id INTEGER NOT NULL,
  team2_id INTEGER NOT NULL,
  team1_score INTEGER,
  team2_score INTEGER,
  label VARCHAR,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  state VARCHAR,
  FOREIGN KEY (team1_id) REFERENCES Team (id),
  FOREIGN KEY (team2_id) REFERENCES Team (id)
  )`
        );
    }

    addMatch(match: Match) {
        console.log(match);
        this.db.run(`INSERT INTO match(team1_id, team2_id, team1_score, team2_score, label, start_date, end_date, state)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                match.team_first.id,
                match.team_second.id,
                match.team_first.score,
                match.team_second.score,
                match.label,
                match.startDate,
                match.endDate,
                match.state
            ],
            (err) => {
           if(err) {
                return console.log(err.message);
            }
            console.log('Match was added to the table');
        })
    }

    updateMatchScore(match: Match) {
        return new Promise((resolve, reject) => {
            if (!match.team1_score) match.team1_score = 0;
            if (!match.team2_score) match.team2_score = 0;
            console.log(match);
            this.db.run(`UPDATE match
            SET team1_score=${match.team1_score}, team2_score=${match.team2_score}, state='${match.state}'
            WHERE id = ${match.id};`,
                (err) => {
                    if (err) {
                        reject(err);
                        return console.log(err);
                    }

                    resolve('Match was updated to the table');
                    console.log('Match was updated to the table');
                });
        });
    }

    getMatchById(id: number) {
        this.db.all(`SELECT * FROM match WHERE id=${id}`, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log(row.label);
            });
        });
    }

    getMatchList(): Promise<Match[]> {
        return new Promise(resolve => {
            this.db.all(`SELECT * FROM match ORDER BY id DESC`, [], (err, rows) => {
                if (err) {
                    throw err;
                }
                resolve(rows);
            });
        });
    }

    buildFixtures() {
        const match1 = new Match(new Team(1), new Team(2), 'Quart', new Date().getTime(), new Date().getTime());
        const match2 = new Match(new Team(1), new Team(3), 'Demi', new Date().getTime(), new Date().getTime());
        const match3 = new Match(new Team(2), new Team(3), 'Final', new Date().getTime(), new Date().getTime());
/*        this.addMatch(match1);
        this.addMatch(match2);
        this.addMatch(match3);*/
    }

}
export default MatchDao;
