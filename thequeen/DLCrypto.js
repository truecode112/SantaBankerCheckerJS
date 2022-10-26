const { createDiffieHellman } = require('crypto');
const crypto = require('crypto')

let add = Buffer.allocUnsafe(128);
let adc = Buffer.allocUnsafe(64);

var dhPubKey = null;
var dhPrivKey = null;
var f23054g = false;
var f23050c = null;
var f23053f_privateKey = null;
var dh = null;
const iv = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
var secretKey = null;

function constructor() {
  let c = 'A';
  let i = 0;
  while (c <= 'Z') {
    adc[i] = c;
    c = (c+1);
    i++;
  }
  let c2 = 'a';
  while (c2 <= 'z') {
    adc[i] = c2;
    c2 = (c2 + 1);
    i++;
  }
  let c3 = '0';
  while(c3 <= '9') {
    adc[i] = c3;
    c3 = (c3 + 1);
    i++;
  }
  let i2 = i+ 1;
  adc[i] = '+';
  adc[i2] = '/';
  for(let i4 = 0 ; i4 < add.length ; i4++) {
    add[i4] = -1;
  }
  for(let i5 = 0 ; i5 < 64 ; i5++) {
    add[adc[i5]] = (byte)(i5);
  }

}

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

    dh = createDiffieHellman(1024);
    var pub = dh.generateKeys();
    var p = dh.getPrime(), g = dh.getGenerator();

    var algid = derseq([oidpkcs3,derseq([derpint(onezero,p),derpint(onezero,g)])]);
    
    var spki = derseq([algid,der(0x03,Buffer.concat([onezero,derpint(onezero, pub)]))]);
    dhPubKey = spki;
    dhPrivKey = derseq([derpint(onezero, onezero),algid,der(0x04,derpint(onezero, dh.getPrivateKey()))]);
    return spki.toString('hex');

};

const m82889g = (str) => {
  if (!this.f23054g) {
    this.f23050c = str;
  }
}

const mo12427f = (str) => {
  var decode = Buffer.from(str, 'hex');
  let shared = dh.computeSecret(decode, null, 'hex');
  var generateSecret = dh.computeSecret(decode, null);
  secretKey = Buffer.allocUnsafe(16);
  secretKey.copy(generateSecret);
  this.f23050c = secretKey.toString('hex');
}

function LfBjeUWJCY(cArr) {
  let c;
  let i;
  let c2;
  let i2;
  let i3;
  let length = cArr.length;
  if(length % 4 != 0) {
    throw "Length of Base64 encoded input string is not a multiple of 4.";
  }
  let i5 = length;
  while(i5 > 0 && cArr[i5 - 1] == '=') {
    i5--;
  }
  let i6 = (i5 * 3) / 4;
  let bArr = Buffer.allocUnsafe(16);
  let i7 = 0;
  for(let i4 = 0 ; i4< i5 ; i4 = i) {
    let i8 = i4 + 1;
    let c3 = cArr[i4];
    let i9 = i8 + 1;
    let c4 = cArr[i8];
    if (i9 < i5) {
      c = cArr[i9];
      i9++;
    } else {
      c= 'A';
    }
    if (i9 < i5) {
      let i10 = i9 + 1;
      c2 = cArr[i9];
      i = i10;
    } else {
      i = i9;
      c2 = 'A';
    }
    if (c3 > 127 || c4 > 127 || c > 127 || c2 > 127) {
      throw "Illegal character in Base64 encoded data."
    }
    let b = add[c3];
    let b2 = add[c4];
    let b3 = add[c];
    let b4 = add[c2];
    if (b < 0 || b2 < 0 || b3 < 0 || b4 < 0) {
      throw "Illegal character in Base64 encoded data.";
    }
    let i11 = (b << 2) | (b2 >>> 4);
    let i12 = ((b2 & 15) << 4) | (b3 >>> 2);
    let b5 = (byte) (((b3 & 3) << 6) | b4);
    let i13 = i7 + 1;
    bArr[i7] = (byte) (i11);
    if (i13 < i6) {
        i2 = i13 + 1;
        bArr[i13] = (byte) (i12);
    } else {
        i2 = i13;
    }
    if (i2 < i6) {
        i3 = i2 + 1;
        bArr[i2] = b5;
    } else {
        i3 = i2;
    }
    i7 = i3;
  }
  return bArr;
}

function decode(str) {
  if(str != null) {
    return LfBjeUWJCY(Array.from(str));
  }
  throw "null parameter is not supported in method decode().";
}

const mo12438a = (str) => {
  var bArr = Buffer.allocUnsafe(secretKey.length);
  for(var i = 0 ; i < secretKey.length ; i++) {
    bArr[i] = (byte)(secretKey[i] ^ (-1));
  }
  const cipher = crypto.createCipheriv("aes-256-cbc", bArr, iv);
  let encrypted = Buffer.concat([cipher.update(Buffer.from(decode(str), "utf8")), cipher.final()]);
  return encrypted.toString("utf8");
}

const mo12433c = (str) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encrypted = Buffer.concat([cipher.update(Buffer.from(str)), cipher.final()]);
  return encrypted.toString("base64");
}

function reverseString(str) {
  // Step 1. Use the split() method to return a new array
  var splitString = str.split(""); // var splitString = "hello".split("");
  // ["h", "e", "l", "l", "o"]

  // Step 2. Use the reverse() method to reverse the new created array
  var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
  // ["o", "l", "l", "e", "h"]

  // Step 3. Use the join() method to join all elements of the array into a string
  var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
  // "olleh"
  
  //Step 4. Return the reversed string
  return joinArray; // "olleh"
}

const mo12433c_senha = (str) => {
  let secretKeyString = secretKey.toString();
  let reverseString = reverseString(secretKeyString);
  let bArr = Buffer.from(reverseString, 'hex');

  const cipher = crypto.createCipheriv("aes-256-cbc", bArr, iv);
  let encrypted = Buffer.concat([cipher.update(Buffer.from(str)), cipher.final()]);
  return encrypted.toString("base64");
}


module.exports = { mo12430e, m82889g, mo12427f, mo12438a, mo12433c, mo12433c_senha };