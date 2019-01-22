import * as express from 'express';
import * as bodyParser from 'body-parser';
import {MatchRoutes} from "./routes/match-routes";
import {InitializeRoutes} from "./routes/initialize-routes"; //used to parse the form data that you pass in the request

class App {

    public app: express.Application;
    public matchRoutes: MatchRoutes = new MatchRoutes();
    public initializeRoutes: InitializeRoutes = new InitializeRoutes();

    constructor() {
        this.app = express(); //run the express instance and store in app
        this.config();
        this.initializeRoutes.routes(this.app);
        this.matchRoutes.routes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
    }

}

export default new App().app;
