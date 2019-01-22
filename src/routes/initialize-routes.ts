import {Request, Response} from "express";
import matchService from "../services/match-service";
import MatchConfig from "../models/match-config";


export class InitializeRoutes {

    public routes(app): void { //received the express instance from app.ts file
        app.route('/initialize')
            .post((req: Request, res: Response) => {
                matchService.matchConfig = new MatchConfig(req.body);
                if (matchService.matchConfig.checkDataAreFull()) {
                    matchService.initializeMatch();
                    res.status(200).send(matchService.match);
                } else {
                    res.status(400).send('Missing data.');
                }
            })
    }
}