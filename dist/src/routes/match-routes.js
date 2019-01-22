"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matchs = require("../../data/db.json"); //load our local database file
class MatchRoutes {
    routes(app) {
        app.route('/matchs')
            .get((req, res) => {
            res.status(200).send(matchs);
        });
    }
}
exports.MatchRoutes = MatchRoutes;
