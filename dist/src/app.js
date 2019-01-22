"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const match_routes_1 = require("./routes/match-routes");
const initialize_routes_1 = require("./routes/initialize-routes"); //used to parse the form data that you pass in the request
class App {
    constructor() {
        this.matchRoutes = new match_routes_1.MatchRoutes();
        this.initializeRoutes = new initialize_routes_1.InitializeRoutes();
        this.app = express(); //run the express instance and store in app
        this.config();
        this.initializeRoutes.routes(this.app);
        this.matchRoutes.routes(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
    }
}
exports.default = new App().app;
