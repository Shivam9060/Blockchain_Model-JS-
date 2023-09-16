const Block = require('./Block.js');
const cryptoHash = require("./crypto-hash"); 

class BlockChain{
    constructor(){
        this.chain = [Block.genesis()]; // chain array consisting genesis block when object will be created
    }

    addBlock({data}){
        const newBlock = Block.mineBlock({
            prevBlock:this.chain[this.chain.length-1], 
            data
        })
        this.chain.push(newBlock);  // pushing the new block in chain array 
    }

    replaceChain(chain){
        if(chain.length<=this.chain.length){
            console.error("The incoming chain is not longer")
            return
        }
        if(!BlockChain.isValidChain(chain)){
            console.error("The incoming chain is not valid")
            return
        }
        this.chain = chain
    }
    
    static isValidChain(chain){
        if(JSON.stringify(chain[0])!== JSON.stringify(Block.genesis())) { //JSON.stringify-> is used because we are comparing two different instances i.e array adnd object which is not allowed so we convert it into string then compare
            return false;
        }
        for(let i=1; i<chain.length;i++){
            const {timestamp,prevHash,hash,nonce,difficlty,data} = chain[i];
            const lastDifficulty =chain[i-1].difficulty;
            const realLastHash = chain[i-1].hash;

            if(prevHash !== realLastHash) return false;

            const validatedHash = cryptoHash(timestamp,prevHash,nonce,difficlty,data)
            if(hash!==validatedHash) return false;
            if(Math.abs(lastDifficulty-difficlty)>1) return false;
        }
        return true;
    }

}

// const blockchain = new BlockChain();
// blockchain.addBlock({ data : "Block1"});
// // console.log(blockchain)

// const result = BlockChain.isValidChain(blockchain.chain);
// console.log(result)

module.exports = BlockChain;