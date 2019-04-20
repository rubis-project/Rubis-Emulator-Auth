import Config from './utils/config';
import IConfig from './interfaces/iconfig';
import Logger from './utils/logger';
import Server from './network/server';
import DatabaseManager from './database/manager';

class AuthServer {
    static logger: Logger;
    static Config: IConfig;
    static server: any;

    static initialize() {
        AuthServer.loadConfig();
        AuthServer.loadLogger();
        DatabaseManager.initialize(AuthServer.Config.mysql);
        AuthServer.loadServer();
    }

    static start() {
        AuthServer.server.listen(AuthServer.Config.host, AuthServer.Config.port);
    }

    static loadConfig() {
        AuthServer.Config = Config.load('./config.yml');
        // console.log('config', AuthServer.Config);
    }

    static loadLogger() {
        AuthServer.logger = new Logger('Auth');
        Logger.global = new Logger('Global');

        Logger.global.log('Logger loaded');
    }

    static loadServer() {
        AuthServer.server = new Server();
    }
}

(() => {
    AuthServer.initialize();
    AuthServer.start();
})();