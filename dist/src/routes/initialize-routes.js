"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match_service_1 = require("../services/match-service");
const match_config_1 = require("../models/match-config");
class InitializeRoutes {
    routes(app) {
        app.route('/initialize')
            .post((req, res) => {
            if (Object.keys(req.body).length > 0) {
                res.status(400).send('Missing data.');
            }
            match_service_1.default.matchConfig = new match_config_1.default(req.body);
            console.log(match_service_1.default.matchConfig);
            if (match_service_1.default.matchConfig.checkDataAreFull()) {
                match_service_1.default.initializeMatch();
                res.status(200).send(match_service_1.default.match);
            }
            else {
                res.status(400).send('Missing data.');
            }
        });
    }
}
exports.InitializeRoutes = InitializeRoutes;
