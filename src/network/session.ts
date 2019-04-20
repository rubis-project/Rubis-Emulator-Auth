import Basic from '../utils/basic';

export default class Session {
    socket: any;
    key: string;

    constructor(socket: any) {
        this.socket = socket;
        this.key = Basic.randomString(32);

        socket.on('data', (data: string) => console.log('<<<<<', data.toString()));
        socket.on('close', () => socket.end());

        // socket.write(`HC${this.key}` + "\x00");
        this.send(`HC${this.key}`);
    }

    send(packet: string) : void {
        if(this.socket != undefined) {
            this.socket.write(packet + "\x00");
            console.log('>>>>> ' + packet);
            // this.logger.debug('>>>>> ' + packet);
        }
    }
}