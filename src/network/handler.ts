import Logger from '../utils/logger';
import Definitions from '../definitions';
import Session from './session';
import AccountDatabase from '../database/account';
import CharacterDatabase from '../database/character';
import Basic from '../utils/basic';
import DWrapper from '../utils/wrapper';
import DReader from '../utils/reader';
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
        let data = DReader.getLoginData(packet);
        Logger.global.debug('handleCheckAccount: ' + packet);
        AccountDatabase.getAccountByUsername(data.username, (account: AccountDatabase) => {
            if (account) {
                if (account.banned) { 
                    DWrapper.accountBanned(session);
                }
                // console.log(account);
                var originalPass = Basic.encryptPasswordMethod1(account.password, session.key);
                session.logger.debug('AuthSession->handleCheckAccount >>> password=' + data.password + ', originalPass=' + originalPass);

                if (data.password == originalPass) {
                    session.account = account;
                    session.state = 2; 

                    DWrapper.sendPseudo(session, session.account.pseudo);
                    DWrapper.sendcommunity(session, 0);
                    DWrapper.sendServersList(session, ServerManager.servers);
                    DWrapper.sendRank(session, true);
                    DWrapper.sendSecretQuestion(session, 'DELETE?');
                } else {
                    session.send('AlEx');
                }
            }
            // else {
            //     session.send('AlEx');
            // }
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
        let serverId = parseInt(packet.substr(2));
        let serverData = ServerManager.servers[ServerManager.findByServerId(serverId)];

        session.send('AYK' + serverData.host + ":" + serverData.port + ";" + session.key);
    }

    static waitingQueue(session: any, packet: string) {
        return;
    }
}