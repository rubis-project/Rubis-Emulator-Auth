export default class Basic {
    static HASH : Array<string> = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9","-","_"];
    static secretKey : string = 'mYSup3rSecr3TC0dE';

    static randomNum(min : number, max : number) : number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static randomString(lenght : number) : string {
        let rndStr = '';
        while (rndStr.length < lenght) {
            rndStr += Basic.HASH[Basic.randomNum(0, 25)];
        }
        return rndStr;
    }

    static encryptPasswordMethod1(pwd : string, key : string) {
        let loc4 = '';
        let loc5 = 0;
        while(loc5 < pwd.length) {
            var loc6 = pwd.charCodeAt(loc5);
            var loc7 = key.charCodeAt(loc5);
            var loc8 = Math.floor(loc6 / 16);
            var loc9 = loc6 % 16;
            loc4 = loc4 + (Basic.HASH[(loc8 + loc7 % Basic.HASH.length) % Basic.HASH.length] + Basic.HASH[(loc9 + loc7 % Basic.HASH.length) % Basic.HASH.length]);
            loc5 = loc5 + 1;
        }
        return loc4;
    }

    static encryptPasswordMethod2(pwd : string, key : string) {
        var crypto = require('crypto');
        return crypto.createHmac('md5').update(crypto.createHmac('md5').update(pwd) + key).digest('hex');
    }

    static cryptCellId(cell: number) : string {
        console.log(cell);
        let i = Math.ceil((cell / 64));
        let y = (cell % 64);

        console.log(i + " => " + Basic.HASH[i]);
        console.log(y + " => " + Basic.HASH[y]);

        return Basic.HASH[i] + Basic.HASH[y];
    }

    static uncryptCellId(cell: string) : number {
        console.log("uncryptCellId => " + cell);
        let c1 = cell.charAt(0), c2 = cell.charAt(1);
        let i = 0, y = 0, j = 0;
        while (j < Basic.HASH.length) {
            if (Basic.HASH[j] == c1) i = j * 64;
            if (Basic.HASH[j] == c2) y = j;
            j++;
        }
        return i + y;
    }

    static decimalToHex(dec: any) {
        return (dec).toString(16)
    }
}