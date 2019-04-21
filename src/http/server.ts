import * as Express from 'express';
import AuthServer from '../server';

export default class HttpServer {
    server: Express.Express = Express();

    initialize() {
        this.loadEvents();
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
                })
            }
        });
    }

    listen(port: number, callback?: Function) {
        this.server.listen(port, callback);
    }
}