export default class Definitions {
    static version: any = { major: 1, minor: 0, revision: 0, patch: 0 };
    static author: string = "ZoukiDev";
    static deviceName: string = "Rubis Auth";
    static dofusVersion: string = '1.29.1';
    static SERVER: any = {
        STATUS: {
            OFFLINE: 0,
            ONLINE: 1,
            SAVING: 2
        },
        POPULATION: {
            RECOMMENDED: 0,
            AVERAGE: 1,
            HIGH: 2,
            LOW: 3,
            FULL: 4
        }
    };

    static getVersion() : string {
        let version = Definitions.version;
        return version.major + '.' + version.minor + '.' + version.revision + '.' + version.patch;
    }
}