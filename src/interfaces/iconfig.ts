export default interface IConfig {
    host: string;
    port: number;
    debug: boolean;
    mysql: IConfigMysql;
}

interface IConfigMysql {
    host: string;
    port: number;
    dbname: string;
    user: string;
    password: string;
}