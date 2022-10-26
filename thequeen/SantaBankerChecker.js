const fs = require('fs');
const readline = require('readline');
const { Worker, WorkerData } = require('worker_threads');
var unirest = require('unirest');
const { mo12430e } = require('./DLCrypto.js')

var creditos = "Feito por thequeen, fornecido pro charlão";

const args = process.argv.slice(2);

var fileName = args[0];

if (fileName != undefined) {
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

const login = async (username, password) => {
    var publickey = mo12430e();
    var nonce = null;
    var serverDLBv1 = null;
    await unirest
        .post('https://m.santander.com.br/key-exchange/v1/exchange')
        .strictSSL(false)
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send({ "dlbClientKey": publickey})
        .then((response) => {
            console.log('response', response.body);
            nonce = response.body["nonce"];
            serverDLBv1 = response.body["serverDLBv1"];
        })
    
    console.log('nonce', nonce);
    console.log('serverDLBv1', serverDLBv1);
}

module.exports = { login };