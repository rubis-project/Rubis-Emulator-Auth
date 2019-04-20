import DatabaseManager from './manager';
import Logger from '../utils/logger';

export default class AccountDatabase {
    id: number;
    username: string;
    password: string;
    pseudo: string;
    banned: number|boolean;
    
    constructor(id: number, username: string, password: string, pseudo: string, banned: number|boolean) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.pseudo = pseudo;
        this.banned = banned;
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
                    row[0].banned
                ));
            } else {
                callback(undefined);
            }
        });
    }

    static createAccount(username: string, password: string, pseudo: string, banned?: string, callback?: Function) {
        DatabaseManager.db.query('INSERT INTO accounts (username, password, pseudo, banned) VALUES (?, ?, ?, ?)', [username, password, pseudo, 0], (err: string, row: any) => {
            if (err) if (err) Logger.global.error('Account->createAccount >>> An error as occured');
            if (callback) callback();
        });
    }
}