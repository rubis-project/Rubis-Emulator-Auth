export default interface IConfig {
    host: string;
    port: number;
    debug: boolean;
    mysql: IConfigMysql;
    http: IConfigHttp;
}

interface IConfigMysql {
    host: string;
    port: number;
    dbname: string;
    user: string;
    password: string;
}

interface IConfigHttp {
    port: number;
    password: string;
}