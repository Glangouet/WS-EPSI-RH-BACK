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
  email VARCHAR,
  role VARCHAR)`);
    }

    addUser(user: User) {
        this.db.run(`INSERT INTO user(username, role)
        VALUES(?, ?)`,
            [
                user.email,
                user.role
            ],
            (err) => {
                if(err) {
                    return console.log(err.message);
                }
                console.log('User was added to the table.');
            })
    }

    getUserByUsername(email: string) {
        this.db.run(`SELECT * FROM user WHERE email=${email}`,
            (err) => {
                if(err) {
                    return console.log(err.message);
                }
                console.log(`get an user with id: ${email}`);
            });
    }

    getUserByUsernameAndPassword(user: User): Promise<User> {
        return new Promise(resolve => {
            this.db.get(`SELECT * FROM user WHERE email=${user.email} AND WHERE password=${user.password}`,
                (err, raw: User) => {
                    if(err) {
                        return console.log(err.message);
                    }
                    console.log(`get an user with id: ${user.email}`);
                    resolve(raw)
                });
        });
    }

    buildFixtures() {
        const user1 = new User(null, 'guillaume@dialo-home.com', RolesEnum.ROLE_ADMIN, 'test');
        const user2 = new User(null, 'ludovic@epsi.fr', RolesEnum.ROLE_REFEREE, 'test');
        const user3 = new User(null, 'roxane@epsi.fr', RolesEnum.ROLE_USER, 'test');
        this.addUser(user1);
        this.addUser(user2);
        this.addUser(user3);
    }

}
export default UserDao;
