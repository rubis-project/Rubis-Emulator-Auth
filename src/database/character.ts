import DatabaseManager from './manager';
import Logger from '../utils/logger';

export default class CharacterDatabase {
    id: number;
    accoundId: number;
    name: string;
    breed: number;
    sex: number;
    skin: number;
    colors: string;
    serverId: number
    
    constructor(id: number, accountId: number, name: string, breed: number, sex: number, skin: number, colors: string, serverId: number) {
        this.id = id;
        this.accoundId = accountId;
        this.name = name;
        this.breed = breed;
        this.sex = sex;
        this.skin = skin;
        this.colors = colors;
        this.serverId = serverId;
    }

    static getCharactersByAccountId(accountId: number, callback: Function) {
        DatabaseManager.db.query('SELECT * FROM characters WHERE accountId=?', [accountId], (err: string, row: any) => {
            if (err) Logger.global.error('CharacterDatabase->getCharactersByAccountId >>> An error as occured');
            if (row[0]) {
                callback(new CharacterDatabase(
                    row[0].id,
                    row[0].accoundId,
                    row[0].name,
                    row[0].breed,
                    row[0].sex,
                    row[0].skin,
                    row[0].colors,
                    row[0].serverId,
                ));
            } else {
                callback(undefined);
            }
        });
    }

    static createCharacter(accountId: number, name: string, breed: number, sex: number, skin: number, colors: string, serverId: number, callback?: Function) {
        DatabaseManager.db.query('INSERT INTO accounts (accountId, name, breed, sex, skin, colors, serverId) VALUES (?, ?, ?, ?, ?, ?, ?)', [accountId, name, breed, sex, skin, colors, serverId], (err: string, row: any) => {
            if (err) if (err) Logger.global.error('CharacterDatabase->createCharacter >>> An error as occured');
            if (callback) callback();
        });
    }
}