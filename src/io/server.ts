import * as Express from 'express';
const Http = require('http');
import * as io from 'socket.io';
import ServerManager from '../managers/server';
import AuthServer from '../server';
import DWrapper from '../utils/wrapper';

export default class HttpServer {
    server: any;
    httpserver: any;
    io: any;

    initialize() {
        this.server = Express();
        this.httpserver = Http.Server(this.server);
        this.io = io(this.httpserver);

        this.loadEvents();
        this.loadIoEvents();
    }

    loadEvents() {
        this.server.get('/account', (req: Express.Request, res: Express.Response) => {
            if (!req.query.ticket) {
                res.json({status: false, message: 'ticket undefined'}); 
            } else {
                let account:any = AuthServer.server.getClientByTicket(req.query.ticket).account;
                delete account.id;
                res.json({
                    status: true,
                    data: account,
                });
            }
        });
    }

    loadIoEvents() {
        this.io.on('connection', (socket: any) => {
            socket.on('changeServerStatus', (serverId: number, status: number) => {
                console.log('changeServerStatus', serverId, status);
                ServerManager.changeServerStatus(serverId, status);
                // send to all client new server status
                // AuthServer.server.broadcast(`AH${serverId};${status};${0};${0}`);
                
                AuthServer.server.clients.map(session => {
                    DWrapper.sendServersList(session, ServerManager.servers);
                });
            });
        });
    }

    listen(port: number, callback?: Function) {
        this.httpserver.listen(port, callback);
    }
}