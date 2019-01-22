import {Request, Response} from "express";

import matchs = require('../../data/db.json'); //load our local database file

export class MatchRoutes {

    public routes(app): void { //received the express instance from app.ts file
        app.route('/matchs')
            .get((req: Request, res: Response) => {
                res.status(200).send(matchs);
            })
    }
}