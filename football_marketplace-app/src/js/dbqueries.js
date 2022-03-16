const {Client} = require("pg");
    var client;


     async function connect(){

        const {Client} = require('pg');
        client = new Client({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: '1546',
        });

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
         client.query('DELETE FROM coaches WHERE address=$1',[address],(error) =>{
             if(error){
                 throw error;
             }
         })
         client.query('DELETE FROM service_requests WHERE address=$1',[address],(error) =>{
             if(error){
                 throw error;
             }
         })
         client.query('DELETE FROM services WHERE address=$1',[address],(error) =>{
             if(error){
                 throw error;
             }
         })
     }

     const dbRequestRegisterService = (address, name, description)=>{
         client.query('INSERT INTO service_requests(address, service_name, service_description) VALUES($1, $2, $3)',[address, name, description],(error) =>{
             if(error){
                 throw error;
             }
         })
     }

    const submitService = (address, name, description)=>{
    client.query('INSERT INTO services(address, service_name, service_description) VALUES($1, $2, $3)',[address, name, description],(error) =>{
        if(error){
            throw error;
        }
    })
     }

const getServices = async ()=>{
    const results = await client.query('SELECT * FROM service_requests');
    return results.rows;
}

const getUsername = async (address)=>{
    let results = await client.query('SELECT name FROM users WHERE address=$1',[address]);
    if(results.rows.length == 0){
        results = await client.query('SELECT name FROM coaches WHERE address=$1',[address]);
    }
    if(results.rows.length == 0){
        return "Failed";
    }

    return results.rows;

}

        const registerCoach = (address, name)=>{
            client.query('INSERT INTO coaches(address, name) VALUES($1, $2)',[address, name],(error) =>{
                if(error){
                    throw error;
                }
            })
     }

const deleteServiceRequest = (address,service_name, service_description)=>{
    client.query('DELETE FROM service_requests WHERE address=$1 AND service_name=$2 AND service_description=$3',[address,service_name,service_description],(error) =>{
        if(error){
            throw error;
        }
    })
}
const deleteService = (address, name)=>{
    client.query('DELETE FROM services WHERE service_name=$1 AND address=$2',[name, address],(error) =>{
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
    newPlayer,
    deletePlayer,
    dbRequestRegisterService,
    submitService,
    registerCoach,
    getServices,
    deleteServiceRequest,
    deleteService,
    getUsername
}




