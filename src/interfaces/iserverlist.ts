export default interface IServerList {
    id: number;
    state: number;
    population: number;
    subscriptionRequired: boolean;
    host: string;
    port: string;
}