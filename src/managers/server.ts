import Definitions from '../definitions';

export default class ServerManager {
    static servers: any = [
        { id: 1, state: 0, population: 0, subscriptionRequired: false, host: "127.0.0.1", port: 3001 }
    ];

    static findByServerId(serverId: number): any {
        return Object.keys(ServerManager.servers).filter(key => ServerManager.servers[key].id === serverId);
    }

    static changeServerStatus(serverId: number, status: number) {
        let indexOfServer = ServerManager.findByServerId(serverId);
        let server = ServerManager.servers[indexOfServer];
        server.state = status;
        ServerManager.servers[indexOfServer] = server;
    }
}