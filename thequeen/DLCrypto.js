const { createDiffieHellman } = require('crypto');

var dhKey = null;

const mo12430e = () => {
    const dh = createDiffieHellman(1024);
    let publicKey = null;

    dhKey = dh.generateKeys();

    publicKey = dh.getPublicKey();

    //console.log('Public Key', publicKey.toString('hex'));
    return publicKey.toString('hex');

};

module.exports = { mo12430e };