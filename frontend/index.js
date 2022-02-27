


var accounts;
var account;

if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {

        accounts = web3.eth.requestAccounts().then(function(accounts) {
            console.log(accounts[0]);
            account = accounts[0];
        });

    } catch (error) {
        console.log('user rejected permission');
    }
}
else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
}
else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
}
console.log (window.web3.currentProvider);

var contractAddress = '0xbe98eCC1115cE6Bc87c0999A31789C91D06e7461';
var abi = JSON.parse(
    '[\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"stateMutability": "payable",\n' +
    '\t\t"type": "constructor"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "editService",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "a",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "isRegistered",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "players",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "a",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "print",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "rateService",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "register",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "payable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "register_service",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address payable",\n' +
    '\t\t\t\t"name": "toAddress",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "sendMoney",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "payable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "unRegister",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "payable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "unRegisterService",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t}\n' +
    ']'
);

contract = new web3.eth.Contract(abi, contractAddress);


//Smart contract functions
function registerPlayer() {
    console.log("test");
    console.log(document.getElementById('username').value);
    const Http = new XMLHttpRequest();
    const url='http://localhost:3300/registeruser?username='+document.getElementById('username').value+ '&address='+account;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
    }

    contract.methods.register ().send( {from: account}).then( function(tx) {
        console.log("Transaction: ", tx);
    });
    //$("#newInfo").val('');
}


function registerService(){

    contract.methods.isRegistered(account).call().then( function( isReg ) { // check if the address is registred first
        console.log("User is registred: ", isReg);
        //document.getElementById('lastInfo').innerHTML = info;
        if(!isReg){
            alert("You are not registred, you can't register a service.");
            return;
        }
        contract.methods.register_service ().send({from:account}).then(function(tx){
            console.log("Transaction: ", tx);
        });


    });

}

function verifyClient() {
    contract.methods.isRegistered(account).call().then( function( isReg ) {
        console.log("User is registred: ", isReg);
        //document.getElementById('lastInfo').innerHTML = info;
    });
}

function unRegister(){
    const Http = new XMLHttpRequest();
    const url='http://localhost:3300/deleteuser?address='+account;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
    }

    contract.methods.unRegister().send({from:account}).then(function(tx){
        console.log("Transaction: ", tx);
    });
}