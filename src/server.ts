import Config from './utils/config';
import IConfig from './interfaces/iconfig';
import Logger from './utils/logger';
import Server from './network/server';
import HttpServer from './io/server';
import DatabaseManager from './database/manager';

export default class AuthServer {
    static Config: IConfig;
    static server: Server;
    static ioServer: HttpServer;

    static initialize() {
        AuthServer.loadConfig();
        AuthServer.loadLogger(); 
        DatabaseManager.initialize(AuthServer.Config.mysql);
        AuthServer.loadServer();
    }

    static start() {
        AuthServer.server.listen(AuthServer.Config.host, AuthServer.Config.port);
        AuthServer.ioServer.listen(AuthServer.Config.io.port, () => {
            console.log(`IoServer listening on ${AuthServer.Config.io.port}`);
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
        AuthServer.ioServer = new HttpServer();
        AuthServer.ioServer.initialize();
    }
}

(() => {
    AuthServer.initialize();
    AuthServer.start();
})();