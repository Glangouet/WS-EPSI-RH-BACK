import {Request, Response} from "express";

export class ScoreRoutes {

    public routes(app): void { //received the express instance from app.ts file
        app.route('/score')
            .get((req: Request, res: Response) => {
                res.status(200).send();
            })
    }
}