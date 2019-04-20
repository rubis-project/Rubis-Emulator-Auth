import DatabaseManager from './manager';
import Logger from '../utils/logger';

export default class AccountDatabase {
    id: number;
    username: string;
    password: string;
    pseudo: string;
    
    constructor(id: number, username: string, password: string, pseudo: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.pseudo = pseudo;
    }

    static getAccountByUsername(username: string, callback: Function) {
        DatabaseManager.db.query('SELECT * FROM accounts WHERE username=?', [username], (err: string, row: any) => {
            if (err) Logger.global.error('Account->getAccountByUsername >>> An error as occured');
            if (row[0]) {
                callback(new AccountDatabase(
                    row[0].id,
                    row[0].username,
                    row[0].password,
                    row[0].pseudo,
                ));
            } else {
                callback(undefined);
            }
        });
    }

    static createAccount(username: string, password: string, pseudo: string, secretQuestion: string, callback?: Function) {
        DatabaseManager.db.query('INSERT INTO accounts (username, password, pseudo) VALUES (?, ?, ?)', [username, password, pseudo], (err: string, row: any) => {
            if (err) if (err) Logger.global.error('Account->createAccount >>> An error as occured');
            if (callback) callback();
        });
    }
}