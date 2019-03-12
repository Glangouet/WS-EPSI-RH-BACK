import * as socketIo from 'socket.io';

class SocketService {
    public io: any;

    public listen(listen: any) {
        this.io = socketIo(listen);
    }
}

export default new SocketService();
