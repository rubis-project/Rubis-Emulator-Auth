import * as net from 'net';
import Session from './session';

export default class Server {
    server: net.Server;
    clients: any[];

    constructor() {
        this.clients = [];

        this.server = net.createServer((socket: net.Socket) => {
            this.clients.push(new Session(socket));
        });

        this.server.on('error', (err) => {
            throw err;
        });
    }
    
    listen(host?: string, port?: number) {
        this.server.listen(port, host, () => console.log(`Listening on ${host}:${port}`));
    }
}