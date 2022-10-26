const { createDiffieHellman } = require('crypto');
const bigintCryptoUtils = require('bigint-crypto-utils')

var dhKey = null;

function der(tag,val){ // for basic tags and up to 64kB, which are enough here
    var len = val.length;
    var enc = Buffer.alloc(4); enc[0]=tag;
    if( len < 128 ){ enc[1]=len; enc = enc.slice(0,2); }
    else if(len < 256 ){ enc[1]=0x81; enc[2]=len; enc = enc.slice(0,3); }
    else{ enc[1]=0x82; enc[2]=len>>8; enc[3]=len&0xFF; }
    return Buffer.concat([enc,val]);
  }
  
function derpint(onezero, x){ return der(0x02, x[0]<128? x: Buffer.concat([onezero,x])); }

function derseq(x){return der(0x30, Buffer.concat(x));}

const mo12430e = () => {

    const onezero = Buffer.alloc(1,0);
    
    const oidpkcs3 = Buffer.from('06092a864886f70d010301','hex');

    const dh = createDiffieHellman(1024);
    var pub = dh.generateKeys();
    var p = dh.getPrime(), g = dh.getGenerator();

    var algid = derseq([oidpkcs3,derseq([derpint(onezero,p),derpint(onezero,g)])]);
    
    var spki = derseq([algid,der(0x03,Buffer.concat([onezero,derpint(onezero, pub)]))]);
    
    return spki.toString('hex');

};

module.exports = { mo12430e };