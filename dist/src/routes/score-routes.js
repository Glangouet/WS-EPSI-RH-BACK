"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScoreRoutes {
    routes(app) {
        app.route('/score')
            .get((req, res) => {
            res.status(200).send();
        });
    }
}
exports.ScoreRoutes = ScoreRoutes;
