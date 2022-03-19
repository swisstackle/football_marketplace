
var accounts;
var account;

if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {

        accounts = web3.eth.requestAccounts().then(function(accounts) {
            console.log(accounts[0]);
            account = accounts[0];
            changeHeader();
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

var abi = JSON.parse('[\n' +
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
    '\t\t"name": "registerCoach",\n' +
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
    '\t\t"name": "submit_service",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
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


    $.get( "getcontractaddress")
        .done( function( data ) {
            startContract(data);
        });
function startContract(_contractAddress){
    contract = new web3.eth.Contract(abi, _contractAddress);
    console.log("Read the contractaddress: "+_contractAddress);
}




//Smart contract functions
function registerPlayer() {

    console.log(document.getElementById('username').value);

    contract.methods.register ().send( {from: account}).then(function(receipt){
        console.log(document.getElementById('username').value);
        if(receipt){
            const Http = new XMLHttpRequest();
            const url='http://localhost:3300/registeruser?username='+document.getElementById('username').value+ '&address='+account;
            Http.open("GET", url);
            Http.send();

            Http.onreadystatechange = (e) => {
                console.log(Http.responseText)
            }
            console.log("Player with address ",account, " got registred.");
        }else{
            console.log("Registration failed.");
        }

    });

    //$("#newInfo").val('');
}

function registerCoach() {

    console.log('blabla '+document.getElementById('cname').value);


    contract.methods.registerCoach ().send( {from: account}).then(function(receipt){
        console.log('blabla2 '+document.getElementById('cname').value);
        if(receipt){


            const Http = new XMLHttpRequest();
            const url='http://localhost:3300/registercoach?username='+document.getElementById('cname').value+ '&address='+account;
            Http.open("GET", url);
            Http.send();

            Http.onreadystatechange = (e) => {
                console.log(Http.responseText)
            }
            console.log("Coach with address ",account, " got registred.");
        }else{
            console.log("Registration failed.");
        }

    });

    //$("#newInfo").val('');
}


function requestRegisterService(){

    contract.methods.isRegistered(account).call().then( function( isReg ) {
        if(!isReg){
            alert("You are not registred, you can't register a service.");
            return;
        }
        const Http = new XMLHttpRequest();
        const url='http://localhost:3300/requestRegisterService?name='+document.getElementById('servicename').value+ '&description='+document.getElementById('servicedescription').value+'&address='+account;
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            console.log(Http.responseText)
        }

    });
}

function submitService(){

    contract.methods.isRegistered(account).call().then( function( isReg ) { // check if the address is registred first
        console.log("User is registred: ", isReg);
        //document.getElementById('lastInfo').innerHTML = info;
        if(!isReg){
            alert("You are not registred, you can't submit a service.");
            return;
        }
        contract.methods.submit_service ().send({from:account}).then(function(receipt){
            if(receipt){
                const Http = new XMLHttpRequest();
                const url='http://localhost:3300/submitservice';
                Http.open("GET", url);
                Http.send();

                Http.onreadystatechange = (e) => {
                    console.log(Http.responseText)
                }

                console.log("Player with address ",account, " submitted all services.");
            }else{
                console.log("Submition of services failed.");
            }

        });


    });

}

function verifyClient() {
    contract.methods.isRegistered(account).call().then( function( isReg ) {
        alert(account);
    });
}

function unRegister(){


    contract.methods.unRegister().send({from:account}).then(function(receipt){
        if(receipt){
            const Http = new XMLHttpRequest();
            const url='http://localhost:3300/deleteuser?address='+account;
            Http.open("GET", url);
            Http.send();

            Http.onreadystatechange = (e) => {
                console.log(Http.responseText)
            }



            console.log("Player with address ",account, " got deleted.");
        }else{
            console.log("Deletion failed.");
        }

    });
}
function deleteService(){
            const Http = new XMLHttpRequest();
            const url='http://localhost:3300/deleteservice?address='+account+'&name='+document.getElementById('sname_delete').value;
            Http.open("GET", url);
            Http.send();

            Http.onreadystatechange = (e) => {
                console.log(Http.responseText)
            }
            console.log("Player with address ",account, " deleted a service.");

}


function getCurentFileName(){
    var pagePathName= window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}

async function changeHeader(){
    let filename =getCurentFileName();

    switch(filename){
        case "wallet.html":
            //$("#header1").text("Welcome back "+account);
            $.get( "getusername", { address: account } )
                .done(function( data ) {
                    $("#header1").text("Wallet of "+data);
                });
            let balance = await getBalance();
            $("#balanceText").text("Your current balance is "+ balance);
            break;
        case "index.html":
            break;
        case "service.html":

            break;
        case "register.html":

            break;
        case "myofferings.html":

            break;
        default:

    }

}

async function getBalance(){
    return await web3.eth.getBalance(account).then(result => web3.utils.fromWei(result,"ether"));
}


$(document).ready(function () {
    $(document).click(function () {
        // if($(".navbar-collapse").hasClass("in")){
        $('.navbar-collapse').collapse('hide');
        // }
    });
});




