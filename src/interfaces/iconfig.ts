export default interface IConfig {
    host: string;
    port: number;
    debug: boolean;
    mysql: IConfigMysql;
    io: IConfigIO;
}

interface IConfigMysql {
    host: string;
    port: number;
    dbname: string;
    user: string;
    password: string;
}

interface IConfigIO {
    port: number;
}