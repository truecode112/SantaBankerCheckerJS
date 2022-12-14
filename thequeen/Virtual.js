var unirest = require('unirest');
var execSync = require('child_process').execSync, child;
const axios = require('axios');

class vir {
    constructor(ex, token) {
        this.f1105ex = ex;
        this.token = token;
        this.lastResponse = null;
        this.available = 0.0;
    }

     async puxarSaldo(f23050c) {
        let strToken = this.f1105ex['contextId'] + ':' + this.token;
        console.log('strTOken', strToken);
        let buffer = Buffer.from(strToken);
        let bodyResponse = null;
        let bufferString = buffer.toString('base64');
        console.log('bufferString', bufferString);
        
        await unirest.get('http://m.santander.com.br/semaphore/v1/all')
            .strictSSL(false)
            .headers({'Authorization': bufferString, 'Accept' : 'application/json',  
                    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
                    'versao-mbb' : '12.1.0.0',
                    'accept-encoding': 'gzip',
                    'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
            .end((response) => {
                console.log('headers123', response.headers);
                this.token = response.headers['access-token'];
            });
        console.log('puxar token', this.token);

        let tokenb = Buffer.from(this.token, 'base64');
        this.token = tokenb.toString();
        let stdout = execSync('java -jar app.jar mo12433c ' + '{\"accountIndexes\":[0]}' + ' ' + f23050c);
        stdout = stdout.toString();
        stdout = stdout.replace(/[\n\r]/g, '');
        strToken = this.f1105ex['contextId'] + ':' + this.token;
        buffer = Buffer.from(strToken);
        await unirest
            .post('https://m.santander.com.br/account-balance/v1/balancesByAccounts')
            .strictSSL(false)
            .headers({'Authorization': buffer.toString('base64'), 'Accept': 'application/json', 'Content-Type': 'application/json',
                'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
                'versao-mbb' : '12.1.0.0',
                'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
            .send(stdout)
            .then((response) => {
                this.lastResponse = response;
                bodyResponse = response.body;
            })
        return bodyResponse;
    }

    async puxarCartoes() {
        this.token = this.lastResponse.headers['access-token'];
        let tokenb = Buffer.from(this.token);
        this.token = tokenb.toString('base64');
        let strToken = this.f1105ex.contextId + ':' + this.token;
        let buffer = Buffer.from(strToken);
        let cardString = null;

        await unirest.get('https://m.santander.com.br/card-online/v1/cards')
            .headers({'Authorization': buffer.toString('base64'), 'Accept' : 'application/json', 
                    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
                    'versao-mbb' : '12.1.0.0',
                    'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
            .send()
            .then((response) => {
                this.lastResponse = response;
                cardString = "{'master':" +  mo12438a(response.body) + "}";
            });
        
        let cardObject = JSON.parse(cardString);
        return cardObject;
    }

    async gerarVirtual(index, f23050c) {
        this.token = this.lastResponse.headers['access-token'];
        let tokenb = Buffer.from(this.token, 'base64');
        this.token = tokenb.toString('base64');
        let ts = Date.now();
        let strToken = this.f1105ex.contextId + ':' + this.token;
        let buffer = Buffer.from(strToken);
        let resulString = null;
        let execResult = execSync('java -jar app.jar mo12438a ' + '{\"index\":' + index + ',\"deviceInfo\":{\"CellTowerId\":\"47108\",\"DeviceSystemVersion\":\"31\",\"SDK_VERSION\":\"3.6.0\",\"DeviceName\":\"null\",\"WiFiMacAddress\":\"02:00:00:00:00:00\",\"RSA_ApplicationKey\":\"null\",\"Emulator\":0,\"MNC\":\"260\",\"LocationAreaCode\":\"8514\",\"PhoneNumber\":\"-1\",\"OS_ID\":\"null\",\"MultitaskingSupported\":true,\"Languages\":\"en\",\"DeviceModel\":\"SAMSUNG\",\"GeoLocationInfo\":[{\"Status\":\"0\",\"Timestamp\":\"' + ts.toString() + '\",\"Latitude\":\"0\",\"Longitude\":\"1\"}],\"DeviceSystemName\":\"Android\",\"Compromised\":0,\"ScreenSize\":\"1080x1794\",\"WiFiNetworksData\":{\"Channel\":\"null\",\"SignalStrength\":\"-50\"},\"MCC\":\"310\",\"SIM_ID\":\"-1\",\"HardwareID\":\"null\"}}' + ' ' + f23050c);
        execResult = execResult.toString();
        execResult = execResult.replace(/[\n\r]/g, '');
        await unirest.post('https://m.santander.com.br/card-online/v1/checkOsgFind')
            .headers({'Authorization': buffer.toString('base64'), 'Accept' : 'application/json', 'Content-Type':'application/json',
                    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
                    'versao-mbb' : '12.1.0.0',
                    'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
            .send(execResult)
            .then((response) => {
                this.token = response.headers['access-token'];
            });

        let tokenb2 = Buffer.from(this.token, 'base64');
        this.token = tokenb2.toString('base64');
        strToken = this.f1105ex.contextId + ':' + this.token;
        buffer = Buffer.from(strToken);
        await unirest.get('https://m.santander.com.br/card-online/v1/cards/' + index)
            .headers({'Authorization': buffer.toString('base64'), 'Accept' : 'application/json', 
                    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
                    'versao-mbb' : '12.1.0.0',
                    'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
            .send()
            .then((response) => {
                this.lastResponse = response;
                let stdout = execSync('java -jar app.jar mo12438a ' + response.body + ' ' + f23050c);
                resulString = stdout.toString();
                resultString = resultString.replace(/[\n\r]/g, '');
            });
        return resulString;
    }

    async limites(index) {
        this.token = this.lastResponse.headers['access-token'];
        let tokenb = Buffer.from(this.token, 'base64');
        this.token = tokenb.toString('base64');
        let strToken = this.f1105ex.contextId + ':' + this.token;
        let buffer = Buffer.from(strToken);
        let limitString;
        await unirest.get('https://m.santander.com.br/card/api/v2/cards?activeCardsOnly=true' + index)
            .headers({'Authorization': buffer.toString('base64'), 'Accept' : 'application/json', 
                    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
                    'versao-mbb' : '12.1.0.0',
                    'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
            .send()
            .then((response) => {
                limitString = "{'master':" +  mo12438a(response.body) + "}";
            });
        let limit  = JSON.parse(limitString);
        if (limit.master instanceof Array) {
            limit.master.forEach(v => {
                let infoo = v;
                if (infoo.finalNumber.contains(index.replace('final ', ''))) {
                    this.available = infoo.availableLimit;
                }
            });
            return this.available.toString();
        }
    }
}

exports.vir = vir;