const {Client} = require("pg");
    var client;


     async function connect(){

        const {Client} = require('pg');
        client = new Client();

        await client.connect();

     }
     async function test(){
         const res = await client.query('SELECT NOW();');
         return res;
     }
     const newPlayer =  (name, address)=>{
         client.query('INSERT INTO users(name, address) VALUES($1,$2)',[name, address],(error) =>{
             if(error){
                 throw error;
             }
         })
     }

     const deletePlayer = (address)=>{
         client.query('DELETE FROM users WHERE address=$1',[address],(error) =>{
             if(error){
                 throw error;
             }
         })
     }

const connectV = async () =>{
    return await connect();
}
const testV = async () =>{
    return await test();
}

module.exports = {
    connectV,
    testV,
    newPlayer,
    deletePlayer
}




