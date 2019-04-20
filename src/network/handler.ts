import Logger from '../utils/logger';
import Definitions from '../definitions';
import Session from './session';
import AccountDatabase from '../database/account';

export default class Handler {
    static handleCheckVersion(session: Session, packet: string) {
        Logger.global.debug('handleCheckVersion: ' + packet);
        if (packet == Definitions.dofusVersion) {
            session.state = 1;
            session.logger.debug('AuthSession->handleCheckVersion >>> ' + packet);
        } else {
            session.send('AlEv'+Definitions.dofusVersion);
        }
    }

    static handleCheckAccount(session: any, packet: string) {
        let data = packet.split('#1');
        Logger.global.debug('handleCheckAccount: ' + packet);
        AccountDatabase.getAccountByUsername(data[0], (account: AccountDatabase) => {
            if (account) {
                console.log(account);

                // process connection
            } else {
                session.send('AlEx');
            }
        });
    }

    static handleServerList(session: any, packet: string) {
        Logger.global.debug('handleServerList: ' + packet);
    }
    static handleServerSelection(session: any, packet: string) {
        Logger.global.debug('handleServerSelection: ' + packet);
    }
}