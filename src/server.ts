import App from './app';
import MatchSocket from "./sockets/match.socket";

const app = new App(
    [],
    [
        MatchSocket
    ],
    8095,
);

app.listen();
