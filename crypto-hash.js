const crypto = require('crypto')
// const hexToBinary = require("hex-to-binary");

// console.log(crypto)

const cryptoHash = (...inputs)=>{
    const hash = crypto.createHash('sha256')
    hash.update(inputs.sort().join("")) // concatinating with the output ->  helloworld
    return hash.digest('hex') // will return our output in hex form
    // return hexToBinary(hash.digest('hex'))
}


// result = cryptoHash("hello", "world");
// console.log(result);

module.exports = cryptoHash;