import * as fs from 'fs';
import * as colors from 'colors';

export default class Logger {
    static global: Logger;
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    log(message: string) : void {
        console.log(colors.green('[' + this.name + ']') + ' : ' + message);
        this.write('infos', message);
    }
  
    warning(message: string) : void {
        console.log(colors.yellow('[' + this.name + ']') + ' : ' + message);
        this.write('warning', message);
    }

    debug(message: string) : void {
        console.log(colors.cyan('[' + this.name + ']') + ' : ' + message);
    }

    error(message: string, write?: boolean) : void {
        console.log(colors.red('[' + this.name + ']') + ' : ' + message);
        if(write) {
            this.write('error', message);
        }
    }

    write(from: string, message: string) : void {
        let filename = 'logs/' + from + '.log';
        if (fs.existsSync(filename)) {
            fs.appendFile(filename, `[${this.getTimeNow()}][${this.name}] : ${message} \n`, {encoding: 'utf8'}, (err) => {
                if(err) this.error("Can't write into log file, check rights on your computer", false);
            });
        } else {
            fs.writeFile(`logs/${from}.log`, `[${this.getTimeNow()}][${this.name}] : Log file created \n`, (err) => {
                if(err) this.error("Can't write into log file, check rights on your computer", false);
            });
        }
    }

    getTimeNow() : string {
        let now = new Date();
        return now.toLocaleDateString()+ ' ' + now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCMilliseconds();
    }
}