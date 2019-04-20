import Server from './network/server';
import Config from './utils/config';
import IConfig from './interfaces/iconfig';
import DatabaseManager from './database/manager';

class AuthServer {
    static Config: IConfig;
    static server: any;

    static initialize() {
        AuthServer.loadConfig();
        DatabaseManager.initialize(AuthServer.Config.mysql, () => {
            console.log('database Connected');
        });
        AuthServer.loadServer();
    }

    static start() {
        AuthServer.server.listen(AuthServer.Config.host, AuthServer.Config.port);
    }

    static loadConfig() {
        AuthServer.Config = Config.load('./config.yml');
        // console.log('config', AuthServer.Config);
    }

    static loadServer() {
        AuthServer.server = new Server();
    }
}

(() => {
    AuthServer.initialize();
    AuthServer.start();
})();