import DatabaseManager from './manager';
import Logger from '../utils/logger';

export default class AccountDatabase {
    id: number;
    username: string;
    password: string;
    pseudo: string;
    banned: number|boolean;
    subscription: number;
    
    constructor(id: number, username: string, password: string, pseudo: string, banned: number|boolean, subscription: number) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.pseudo = pseudo;
        this.banned = banned;
        this.subscription = subscription;
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
                    row[0].banned,
                    row[0].subscription
                ));
            } else {
                callback(undefined);
            }
        });
    }

    static createAccount(username: string, password: string, pseudo: string, banned?: string, callback?: Function) {
        DatabaseManager.db.query('INSERT INTO accounts (username, password, pseudo, banned, subscription) VALUES (?, ?, ?, ?, ?)', [username, password, pseudo, 0, 0], (err: string, row: any) => {
            if (err) if (err) Logger.global.error('Account->createAccount >>> An error as occured');
            if (callback) callback();
        });
    }
}