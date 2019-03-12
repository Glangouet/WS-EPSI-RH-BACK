import User from "../models/user";
import {RolesEnum} from "../enum/roles.enum";

class UserDao implements DaoInterface {

    private db: any;

    constructor(db: any) {
        this.db = db;
        this.initializeDao();
        this.buildFixtures();
    }

    initializeDao() {
        this.db.run(`
  CREATE TABLE IF NOT EXISTS user(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR,
  role VARCHAR)`);
    }

    addUser(user: User) {
        this.db.run(`INSERT INTO user(username, role)
        VALUES(?, ?)`,
            [
                user.username,
                user.role
            ],
            (err) => {
                if(err) {
                    return console.log(err.message);
                }
                console.log('User was added to the table.');
            })
    }

    getUserByUsername(username: string) {
        this.db.run(`SELECT * FROM user WHERE username=${username}`,
            (err) => {
                if(err) {
                    return console.log(err.message);
                }
                console.log(`get an user with id: ${username}`);
            });
    }

    buildFixtures() {
        const user1 = new User(null, 'Guillaume', RolesEnum.ROLE_ADMIN);
        const user2 = new User(null, 'Ludovic', RolesEnum.ROLE_ADMIN);
        const user3 = new User(null, 'Roxane', RolesEnum.ROLE_ADMIN);
        this.addUser(user1);
        this.addUser(user2);
        this.addUser(user3);
    }

}
export default UserDao;
