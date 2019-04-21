import IServerList from '../interfaces/iserverlist';

export default class DWrapper {
    static helloConnection(session: any, key: string) {
        session.send(`HC${key}`)
    }
    static wrongGameVersion(session: any, dofusVersion: any) {
        session.send(`AlEv${dofusVersion}`);
    }
    static accountBanned(session: any) {
        session.send('AlEb');
    }
    static accountTempBanned(session: any, rD: number, rH: number, rM: number) {
        session.send(`AlEk|${rD}|${rH}|${rM}`);
    }
    static connectionError(session: any) {
        session.send('AlEE')
    }
    static wrongUsernameOrPassword(session: any) {
        session.send('AlEf')
    }
    static noServersAvailable(session: any) {
        session.send('M013');
    }
    static disconnectClient(session: any) {
        session.send('ATE')
    }
    static alreadyConnected(session: any) {
        session.send('AlEa')
    }
    static sendPseudo(session: any, pseudo: string) {
        session.send(`Ad${pseudo}`)
    }
    static sendcommunity(session: any, communityId: number) {
        session.send(`Ac${communityId}`)
    }
    static sendServersList(session: any, serverList: IServerList[]) {
        let stringList = '';
        serverList.map((server: IServerList) => {
            stringList += `${server.id};${server.state};${server.population};${server.subscriptionRequired ? 1 : 0}|`;
        });
        session.send(`AH${stringList.substr(0, stringList.length-1)}`);
    }
    static sendRank(session: any, isAdmin: boolean) {
        session.send(`AlK${isAdmin ? 1 : 0}`);
    }
    static sendSecretQuestion(session: any, secretQuestion: string) {
        session.send(`AQ${secretQuestion}`);
    }
    static sendQueue(session: any) {
        session.send(`Af1|0|0|1|-1`);
    }
    static sendCharacterList(session: any, subscriptionTime: number, characters: any[]) {
        let stringList = '';
        if (characters) {
            console.log('characters', characters);
            // session.send(`AxK${subscriptionTime}|1,2|2,2`);
            // TODO: process characters list
        }
        session.send(`AxK${subscriptionTime}${stringList}`);
    }
}