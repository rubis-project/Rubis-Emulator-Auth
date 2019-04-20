export default interface IConfig {
    host: string;
    port: number;
    debug: boolean;
    mysql: IConfigMysql;
}

interface IConfigMysql {
    host: string;
    port: number;
    user: string;
    password: string;
}