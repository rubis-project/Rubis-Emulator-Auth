import Logger from '../utils/logger';
import Definitions from '../definitions';
import Session from './session';
import AccountDatabase from '../database/account';
import Basic from '../utils/basic';

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
                if (account.banned) {
                    // if (account.banned > 1) {
                    //     session.send('AlEk');
                    // }
                    session.send('AlEb');
                }
                console.log(account);
                var originalPass = Basic.encryptPasswordMethod1(account.password, session.key);
                session.logger.debug('AuthSession->handleCheckAccount >>> password=' + data[1] + ', originalPass=' + originalPass);
                console.log(data[1], originalPass);

                if (data[1] == originalPass) {
                    session.account = account;
                    session.state = 2; 

                    session.send("Ad" + session.account.pseudo);
                    session.send("Ac0");
                } else {
                    session.send('AlEx');
                }

            } else {
                // session.send('AlEx');
            }
        });
    }

    static handleServerList(session: any, packet: string) {
        Logger.global.debug('handleServerList: ' + packet);
    }

    static handleServerSelection(session: any, packet: string) {
        Logger.global.debug('handleServerSelection: ' + packet);
    }

    static waitingQueue(session: any, packet: string) {
        return;
    }
}