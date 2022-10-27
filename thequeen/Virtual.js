const Exchange = require('./Exchange.js');
var unirest = require('unirest');
var execSync = require('child_process').execSync, child;

class Virtual {
    constructor(ex, token) {
        this.f1105ex = ex;
        this.token = token;
        this.lastResponse = null;
        this.available = 0.0;
    }

     async puxarSaldo() {
        let strToken = this.f1105ex['contextId'] + ':' + this.token;
        let buffer = Buffer.from(strToken, 'base64');
        let bodyResponse = null;

        await unirest.get('https://m.santander.com.br/semaphore/v1/all')
            .header({'Authorization': buffer, 'Accept' : 'application/json', 
                    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
                    'versao-mbb' : '12.1.0.0',
                    'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
            .send()
            .then((response) => {
                this.token = response.header.get('access-token').get(0);
            });
        let tokenb = Buffer.from(this.token, 'base64');
        this.token = tokenb.toString('base64');

        await unirest
            .post('https://m.santander.com.br/account-balance/v1/balancesByAccounts')
            .strictSSL(false)
            .headers({'Authorization': buffer, 'Accept': 'application/json', 'Content-Type': 'application/json',
                'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
                'versao-mbb' : '12.1.0.0',
                'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
            .send(mo12433c("{\"accountIndexes\":[0]}"))
            .then((response) => {
                this.lastResponse = response;
                bodyResponse = response.body;
            })
        return bodyResponse;
    }

    async puxarCartoes() {
        this.token = this.lastResponse.headers.get('access-token').get(0);
        let tokenb = Buffer.from(this.token, 'base64');
        this.token = tokenb.toString('base64');
        let strToken = this.f1105ex.contextId + ':' + this.token;
        let buffer = new Buffer(strToken, 'base64');
        let cardString = null;

        await unirest.get('https://m.santander.com.br/card-online/v1/cards')
            .header({'Authorization': buffer, 'Accept' : 'application/json', 
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
        this.token = this.lastResponse.headers.get('access-token').get(0);
        let tokenb = Buffer.from(this.token, 'base64');
        this.token = tokenb.toString('base64');
        let ts = Date.now();
        let strToken = this.f1105ex.contextId + ':' + this.token;
        let buffer = Buffer.from(strToken, 'base64');
        let resulString = null;
        await unirest.post('https://m.santander.com.br/card-online/v1/checkOsgFind')
            .header({'Authorization': buffer, 'Accept' : 'application/json', 'Content-Type':'application/json',
                    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
                    'versao-mbb' : '12.1.0.0',
                    'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
            .send(mo12433c("{\"index\":" + index + ",\"deviceInfo\":{\"CellTowerId\":\"47108\",\"DeviceSystemVersion\":\"31\",\"SDK_VERSION\":\"3.6.0\",\"DeviceName\":\"null\",\"WiFiMacAddress\":\"02:00:00:00:00:00\",\"RSA_ApplicationKey\":\"null\",\"Emulator\":0,\"MNC\":\"260\",\"LocationAreaCode\":\"8514\",\"PhoneNumber\":\"-1\",\"OS_ID\":\"null\",\"MultitaskingSupported\":true,\"Languages\":\"en\",\"DeviceModel\":\"SAMSUNG\",\"GeoLocationInfo\":[{\"Status\":\"0\",\"Timestamp\":\"" + ts + "\",\"Latitude\":\"0\",\"Longitude\":\"1\"}],\"DeviceSystemName\":\"Android\",\"Compromised\":0,\"ScreenSize\":\"1080x1794\",\"WiFiNetworksData\":{\"Channel\":\"null\",\"SignalStrength\":\"-50\"},\"MCC\":\"310\",\"SIM_ID\":\"-1\",\"HardwareID\":\"null\"}}"))
            .then((response) => {
                this.token = response.headers.get('access-token').get(0);
            });

        let tokenb2 = Buffer.from(this.token, 'base64');
        this.token = tokenb2.toString('base64');
        await unirest.get('https://m.santander.com.br/card-online/v1/cards/' + index)
            .header({'Authorization': buffer, 'Accept' : 'application/json', 
                    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
                    'versao-mbb' : '12.1.0.0',
                    'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
            .send()
            .then((response) => {
                this.lastResponse = response;
                let stdout = execSync('java -jar D:\\Work\\Java\\SantaBankerCheckerProxy\\app\\build\\libs\\app.jar mo12438a ' + response.body + ' ' + f23050c);
                resulString = stdout.toString();
            });
        return resulString;
    }

    async limites(index) {
        this.token = this.lastResponse.headers.get('access-token').get(0);
        let tokenb = Buffer.from(this.token, 'base64');
        this.token = tokenb.toString('base64');
        let strToken = this.f1105ex.contextId + ':' + this.token;
        let buffer = new Buffer(strToken, 'base64');
        let limitString;
        await unirest.get('https://m.santander.com.br/card/api/v2/cards?activeCardsOnly=true' + index)
            .header({'Authorization': buffer, 'Accept' : 'application/json', 
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