import * as mysql from 'mysql';
import Logger from '../utils/logger';

export default class DatabaseManager {
    static db: any;
    static logger: Logger;

    static initialize(mysqlConfig: any, callback?: Function): any {
        DatabaseManager.logger = new Logger('MySQL');
        DatabaseManager.db = mysql.createConnection({
            host     : mysqlConfig.host     || 'localhost',
            port     : mysqlConfig.port     || 3306,
            user     : mysqlConfig.user     || 'root',
            password : mysqlConfig.password || '',
            database : mysqlConfig.dbname || 'rubis_auth',
        });
        DatabaseManager.db.connect((err: string) => {
            if (err) DatabaseManager.logger.error(err);
            if (callback) callback();
        });
    }
    
}