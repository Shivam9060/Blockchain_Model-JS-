const INITIAL_DIFFUCLTY = 2;
const MINE_RATE = 1000;

const GENESIS_Data ={
    timestamp : 1,
    prevHash : '0x0000',
    hash : '0x123',
    data : [],
    difficulty : INITIAL_DIFFUCLTY,
    nonce : 0,
}

module.exports = {GENESIS_Data,MINE_RATE}