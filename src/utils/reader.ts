export default class DReader {
    static getLoginData(packet: string): any {
        let data = packet.split('#1');
        return {
            username: data[0],
            password: data[1]
        }
    }
}