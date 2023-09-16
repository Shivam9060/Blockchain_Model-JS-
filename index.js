const express = require('express')
const BlockChain = require('./blockhain')
const bodyParser =  require('body-parser');
const PubSub = require('./publishsuscribe')

const app = express() // in order to use express framework and then
const blockchain = new BlockChain();
const pubsub = new PubSub(({blockchain}))
const request = require("request");

const DEFAULT_PORT =3000;

const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;
setTimeout(() => pubsub.broadcastChain(), 1000);

setTimeout(()=>pubsub.broadcastChain(), 1000)

app.use(bodyParser.json())

app.get('/api/blocks',(req,res)=>{  
    res.json(blockchain.chain) 
}) 

app.post("/api/mine",(req,res)=>{
    const {data} = req.body;

    blockchain.addBlock({data}); // adding data
    pubsub.broadcastChain();
    res.redirect('/api/blocks')  
})

const synChains = () => {
    request(
      { url: `${ROOT_NODE_ADDRESS}/api/blocks` },
      (error, reposnse, body) => {
        if (!error && reposnse.statusCode === 200) {
          const rootChain = JSON.parse(body);
          console.log("Replace chain on sync with", rootChain);
          blockchain.replaceChain(rootChain);
        }
      }
    );
};
  

let PEER_PROT;

if(process.env.GENERATE_PEER_PORT === "true"){
    PEER_PROT= DEFAULT_PORT + Math.ceil(Math.random() * 1000)
}
const PORT = PEER_PROT || DEFAULT_PORT
app.listen(PORT,()=> {

    console.log(`listening to PORT:${PORT}`);
    synChains()
})
