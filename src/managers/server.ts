export default class ServerManager {
    static servers: any = {
        1: { state: 1, population: 0, subscriptionRequired: false, host: "127.0.0.1", port: 3001 }
    };

    static add(serverId: number, serverData: any) {
        ServerManager.servers[serverId] = serverData;
    }
}