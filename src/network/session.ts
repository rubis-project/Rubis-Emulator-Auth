import * as net from 'net';
import Basic from '../utils/basic';
import Logger from '../utils/logger';
import Handler from './handler';

export default class Session {
    socket: any;
    key: string;
    state: number;
    logger: Logger;

    constructor(socket: net.Socket) {
        this.state = 0;
        this.key = Basic.randomString(32);
        this.logger = new Logger('AuthSession(' + socket.remoteAddress + ':' + socket.remotePort + ')');
        this.socket = socket;

        // socket.on('data', (data: string) => console.log('<<<<<', data.toString()));
        socket.on('data', (data: string) => this.onData(data));
        socket.on('error', (err) => socket.destroy());
        socket.on('close', () => socket.end());

        // socket.write(`HC${this.key}` + "\x00");
        this.send(`HC${this.key}`);
    }

    onData(data: string): void {
        var packets: string[] = data.toString().replace('\x0a', '').split('\x00');
        for(var i in packets) {
            var packet: string = packets[i].trim();
            if(packet != '') {
                this.logger.debug('<<<<< ' + packet);
                this.handle(packet);
            }
        }
    }

    send(packet: string) : void {
        if(this.socket != undefined) {
            this.socket.write(packet + "\x00");
            this.logger.debug('>>>>> ' + packet);
        }
    }

    handle(packet: string) : void {
        // if (packet == 'Af') { //TODO: Waiting queue
        //     Handler.waitingQueue(this, packet);
        // }
        switch(this.state) {
            case 0:
                Handler.handleCheckVersion(this, packet);
                break;
            case 1:
                Handler.handleCheckAccount(this, packet);
                break;
            case 2:
                if(packet.indexOf('Ax') == 0) {
                    Handler.handleServerList(this, packet);
                } else {
                    Handler.handleServerSelection(this, packet);
                }
                break;
        }
    }
}