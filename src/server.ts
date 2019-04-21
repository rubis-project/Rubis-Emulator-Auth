import Config from './utils/config';
import IConfig from './interfaces/iconfig';
import Logger from './utils/logger';
import Server from './network/server';
import HttpServer from './http/server';
import DatabaseManager from './database/manager';

export default class AuthServer {
    static Config: IConfig;
    static server: Server;
    static httpServer: HttpServer;

    static initialize() {
        AuthServer.loadConfig();
        AuthServer.loadLogger();
        DatabaseManager.initialize(AuthServer.Config.mysql);
        AuthServer.loadServer();
    }

    static start() {
        AuthServer.server.listen(AuthServer.Config.host, AuthServer.Config.port);
        AuthServer.httpServer.listen(81, () => {
            console.log('HttpServer started on port 81')
        });
    }

    static loadConfig() {
        AuthServer.Config = Config.load('./config.yml');
    }

    static loadLogger() {
        Logger.global = new Logger('Global');
        Logger.global.log('Logger loaded');
    }

    static loadServer() {
        AuthServer.server = new Server();
        AuthServer.httpServer = new HttpServer();
        AuthServer.httpServer.initialize();
    }
}

(() => {
    AuthServer.initialize();
    AuthServer.start();
})();