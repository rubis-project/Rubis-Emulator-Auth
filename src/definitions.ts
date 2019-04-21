export default class Definitions {
    static version: any = { major: 1, minor: 0, revision: 0, patch: 0 };
    static author: string = "ZoukiDev";
    static deviceName: string = "Rubis";
    static dofusVersion: string = '1.29.1';

    static getVersion() : string {
        let version = Definitions.version;
        return version.major + '.' + version.minor + '.' + version.revision + '.' + version.patch;
    }
}