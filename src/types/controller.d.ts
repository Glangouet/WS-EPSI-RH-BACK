import {Router} from 'express';

interface Controller {
    path: string;
    router: Router;
}

declare module 'Controller';

