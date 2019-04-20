import * as mysql from 'mysql';

export default class DatabaseManager {
    static db: any;
    // static logger: Utils.Logger;

    static initialize(mysqlConfig: any, callback?: Function): any {
        // Manager.logger = new Utils.Logger('Database');
        DatabaseManager.db = mysql.createConnection({
            host     : mysqlConfig.host     || 'localhost',
            port     : mysqlConfig.port     || 3306,
            user     : mysqlConfig.user     || 'root',
            password : mysqlConfig.password || '',
            database : mysqlConfig.dbname || 'rubis_auth',
        });
        DatabaseManager.db.connect((err: any) => {
            if (err) throw err;
            if (callback) callback();
        });
    }
    
}