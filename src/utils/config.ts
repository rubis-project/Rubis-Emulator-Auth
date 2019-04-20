import * as fs from 'fs';
import * as yaml from 'js-yaml';

export default class Config {
    static load(filename: string): any {
        return yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
    }
}