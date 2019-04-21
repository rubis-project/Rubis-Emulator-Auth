import Logger from '../utils/logger';
import Definitions from '../definitions';
import Session from './session';
import AccountDatabase from '../database/account';
import CharacterDatabase from '../database/character';
import Basic from '../utils/basic';
import DWrapper from '../utils/wrapper';
import ServerManager from '../managers/server';

export default class Handler {
    static handleCheckVersion(session: Session, packet: string) {
        Logger.global.debug('handleCheckVersion: ' + packet);
        if (packet == Definitions.dofusVersion) {
            session.state = 1;
            session.logger.debug('AuthSession->handleCheckVersion >>> ' + packet);
        } else {
            DWrapper.wrongGameVersion(session, Definitions.dofusVersion);
        }
    }

    static handleCheckAccount(session: any, packet: string) {
        let data = packet.split('#1');
        Logger.global.debug('handleCheckAccount: ' + packet);
        AccountDatabase.getAccountByUsername(data[0], (account: AccountDatabase) => {
            if (account) {
                if (account.banned) {
                    DWrapper.accountBanned(session);
                }
                console.log(account);
                var originalPass = Basic.encryptPasswordMethod1(account.password, session.key);
                session.logger.debug('AuthSession->handleCheckAccount >>> password=' + data[1] + ', originalPass=' + originalPass);
                console.log(data[1], originalPass);

                if (data[1] == originalPass) {
                    session.account = account;
                    session.state = 2; 

                    // session.send("Ad" + session.account.pseudo);
                    DWrapper.sendPseudo(session, session.account.pseudo);
                    DWrapper.sendcommunity(session, 0);

                    DWrapper.sendServersList(session, [
                        { id: 1, state: 1, population: 0, subscriptionRequired: false }
                    ]);
                    // session.send(`AH1;0;4;0`);
                    // session.send("AlK0")
                    DWrapper.sendRank(session, true);
                    DWrapper.sendSecretQuestion(session, 'DELETE?');
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
        DWrapper.sendQueue(session);

        CharacterDatabase.getCharactersByAccountId(session.account.id, (characters: any) => {
            DWrapper.sendCharacterList(session, session.account.subscription, characters);
        });
    }

    static handleServerSelection(session: any, packet: string) {
        Logger.global.debug('handleServerSelection: ' + packet);
        let serverId = packet.substr(2);
        let serverData = ServerManager.servers[serverId];

        session.send('AYK' + serverData.host + ":" + serverData.port + ";" + session.key);
    }

    static waitingQueue(session: any, packet: string) {
        return;
    }
}