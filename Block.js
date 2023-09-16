const {GENESIS_Data} = require('./config')
const cryptoHash = require("./crypto-hash");
const hexToBinary = require("hex-to-binary");

class Block {
    constructor({timestamp,data,prevHash,hash,nonce,difficulty}){
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = hash;
        this.nonce = nonce;
        this.difficulty = difficulty;   
    }  

    //we dont want that whenever we create a new object our genesis block will be create
    static genesis(){
        return new this(GENESIS_Data);
    }

    static mineBlock({prevBlock,data}){

        let hash,timestamp;
        const prevHash = prevBlock.hash;
        const{difficulty}=prevBlock;
        let nonce=0;

        do{
            nonce++;
            timestamp=Date.now(); //abcdef ,00 ,00cdef
            hash = cryptoHash(timestamp,data,prevHash,nonce,difficulty)
        }while(hexToBinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty));

        // const timestamp = Date.now();
        // const prevHash = prevBlock.hash;
        return new this({
            timestamp,
            data,
            prevHash,
            hash,
            nonce,
            difficulty
        })
    }

}

// const block1 = new Block({hash:"0xab",timestamp:"24/02/2002",prevHash:"0xaaaa",data:"helloooooo"});


// const genesisBlock = Block.genesis();
// console.log(genesisBlock);
// console.log(block1);

// const result =  Block.mineBlock({prevBlock:block1, data: "block2"})
// console.log(result)



module.exports = Block;