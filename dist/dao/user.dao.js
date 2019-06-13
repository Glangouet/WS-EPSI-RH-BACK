"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const roles_enum_1 = require("../enum/roles.enum");
class UserDao {
    constructor(db) {
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
    addUser(user) {
        this.db.run(`INSERT INTO user(username, role)
        VALUES(?, ?)`, [
            user.email,
            user.role
        ], (err) => {
            if (err) {
                return console.log(err.message);
            }
            console.log('User was added to the table.');
        });
    }
    getUserByUsername(email) {
        this.db.run(`SELECT * FROM user WHERE email=${email}`, (err) => {
            if (err) {
                return console.log(err.message);
            }
            console.log(`get an user with id: ${email}`);
        });
    }
    getUserByUsernameAndPassword(user) {
        return new Promise(resolve => {
            this.db.get(`SELECT * FROM user WHERE email=${user.email} AND WHERE password=${user.password}`, (err, raw) => {
                if (err) {
                    return console.log(err.message);
                }
                console.log(`get an user with id: ${user.email}`);
                resolve(raw);
            });
        });
    }
    buildFixtures() {
        const user1 = new user_1.default(null, 'guillaume@dialo-home.com', roles_enum_1.RolesEnum.ROLE_ADMIN, 'test');
        const user2 = new user_1.default(null, 'ludovic@epsi.fr', roles_enum_1.RolesEnum.ROLE_REFEREE, 'test');
        const user3 = new user_1.default(null, 'roxane@epsi.fr', roles_enum_1.RolesEnum.ROLE_USER, 'test');
        this.addUser(user1);
        this.addUser(user2);
        this.addUser(user3);
    }
}
exports.default = UserDao;
