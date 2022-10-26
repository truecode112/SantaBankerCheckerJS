const { parentPort, workerData } = require('worker_threads')
const { login } = require('./SantaBankerChecker.js')

var testadas = 0;
var dies = 0;

if(workerData instanceof Array) {
    workerData.forEach(action => {
        console.log(action);
        var usuario = action.split("|")[0];
        var senha = action.split("|")[1];
        console.log(`usuario = ${usuario}, senha = ${senha}`);
        var retorno = login(usuario, senha);
        console.log("retorno", retorno);
    });
}

//parentPort.postMessage({ welcome: workerData })