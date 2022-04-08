import React, {Component, useEffect, useState,createContext } from 'react';
import {Routes, Route} from 'react-router'
import * as $ from 'jquery';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import Video from "./Video";
import Store from "./Store";
import RequestRegisterService from "./RequestRegisterService";


import {
    Navbar,
    Nav,
    Container,
    NavDropdown,
    Form,
    FormControl,
    Button,
    Row,
    Col,
    Stack,
    PageHeader,
    Card
} from 'react-bootstrap';
import {Link} from "react-router-dom";

var abi = JSON.parse('[{\n' +
    '      "inputs": [],\n' +
    '      "stateMutability": "payable",\n' +
    '      "type": "constructor",\n' +
    '      "payable": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "address",\n' +
    '          "name": "",\n' +
    '          "type": "address"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "players",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function",\n' +
    '      "constant": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [],\n' +
    '      "name": "register",\n' +
    '      "outputs": [],\n' +
    '      "stateMutability": "payable",\n' +
    '      "type": "function",\n' +
    '      "payable": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [],\n' +
    '      "name": "registerCoach",\n' +
    '      "outputs": [],\n' +
    '      "stateMutability": "payable",\n' +
    '      "type": "function",\n' +
    '      "payable": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [],\n' +
    '      "name": "unRegister",\n' +
    '      "outputs": [],\n' +
    '      "stateMutability": "payable",\n' +
    '      "type": "function",\n' +
    '      "payable": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [],\n' +
    '      "name": "register_service",\n' +
    '      "outputs": [],\n' +
    '      "stateMutability": "nonpayable",\n' +
    '      "type": "function"\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [],\n' +
    '      "name": "submit_service",\n' +
    '      "outputs": [],\n' +
    '      "stateMutability": "nonpayable",\n' +
    '      "type": "function"\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [],\n' +
    '      "name": "unRegisterService",\n' +
    '      "outputs": [],\n' +
    '      "stateMutability": "nonpayable",\n' +
    '      "type": "function"\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [],\n' +
    '      "name": "editService",\n' +
    '      "outputs": [],\n' +
    '      "stateMutability": "nonpayable",\n' +
    '      "type": "function"\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [],\n' +
    '      "name": "rateService",\n' +
    '      "outputs": [],\n' +
    '      "stateMutability": "nonpayable",\n' +
    '      "type": "function"\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "address payable",\n' +
    '          "name": "toAddress",\n' +
    '          "type": "address"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "sendMoney",\n' +
    '      "outputs": [],\n' +
    '      "stateMutability": "payable",\n' +
    '      "type": "function",\n' +
    '      "payable": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "address",\n' +
    '          "name": "a",\n' +
    '          "type": "address"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "isRegistered",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "internalType": "bool",\n' +
    '          "name": "",\n' +
    '          "type": "bool"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function",\n' +
    '      "constant": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "address",\n' +
    '          "name": "a",\n' +
    '          "type": "address"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "isCoachView",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "internalType": "bool",\n' +
    '          "name": "",\n' +
    '          "type": "bool"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function",\n' +
    '      "constant": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "address",\n' +
    '          "name": "a",\n' +
    '          "type": "address"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "isChairperson",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "internalType": "bool",\n' +
    '          "name": "",\n' +
    '          "type": "bool"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function",\n' +
    '      "constant": true\n' +
    '    }]'
);


function App() {
  const [contract, setContract] = useState();
    const [account, setAccount] = useState();
    const[web3Obj, setWeb3Obj]=useState();

  useEffect(()=>{

    async function load(){
        const web3 = new Web3(Web3.givenProvider || 'http://http://localhost:7545');
        setWeb3Obj(web3);
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
       $.get( "getcontractaddress")
          .done(  function( data ) {


              const _contract = new web3.eth.Contract(abi, data);
              _contract.address = data;
              setContract(_contract);


          });



    }
     load();
  },[])

  return(
      <Stack className="vw-100 vh-100">
        <NavDom contract={contract}/>

          <Routes>
              <Route path='register' element={<RegisterFormDom contract={contract} account={account}/>}/>
              <Route path='wallet' element={<WalletDom contract={contract} account={account} web3Obj={web3Obj}/>}/>
              <Route path='myservices' element={<MyServicesDom contract={contract} account={account} web3Obj={web3Obj}/>}/>
              <Route path='coaches' element={<CoachesBackendDom contract={contract} account={account} web3Obj={web3Obj}/>}/>
              <Route path='store' element={<Store contract={contract} account={account} web3Obj={web3Obj}/>}/>
              <Route path='createservice' element={<RequestRegisterService contract={contract} account={account} web3Obj={web3Obj}/>}/>
              <Route path='home' element={<HomeDom/>}/>
              <Route path='' element={<HomeDom/>}/>
          </Routes>
          <Footer/>
          </Stack>
  );

}


const HomeDom = ()=>{
  return(

      <Video/>

  );
}
const NavDom = (props)=>{
  return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
          <Container>
              <Navbar.Brand  as={Link} to="/home">Bulls Marketplace</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">

                      <Nav.Link as={Link} to="/wallet">Wallet</Nav.Link>
                      <NavDropdown title="Services" id="basic-nav-dropdown">
                          <NavDropdown.Item as={Link} to="/myservices">My Services</NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/createservice">Create a Service</NavDropdown.Item>
                      </NavDropdown>
                      <Nav.Link as={Link} to="/store">Store</Nav.Link>
                  </Nav>
                  <Nav>
                      <Nav.Link as={Link} to="/register">Register</Nav.Link>
                      <Nav.Link as={Link} to="/coaches">Backend</Nav.Link>
                      <Nav.Link as={Link} to="/about">About</Nav.Link>

                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
  );
}
const CoachesBackendDom = (props)=>{

    const [isCoach, setIsCoach] = useState();

    useEffect(()=>{

        async function load(){

            const coach = await props.contract.methods.isCoachView(props.account).call();
            setIsCoach(coach);

        }
        load();
    },[]);
    return(<CoachesBackendDomInternal isCoach={isCoach} contract={props.contract} account={props.account}/>);
}
const CoachesBackendDomInternal=(props)=>{
    const [listItems, setListItems] = useState();
    const [isChairperson, setIsChairperson] = useState();
    useEffect(()=>{
        async function load(){
            const _requests = await getServiceRequests();

            const listItems = _requests.map((service) =>
                <li>{service['service_name'] + ' ' + service['service_description'] + ': '} {<a href={"#"} onClick={() => admitService(service['address'],service['service_name'] , service['service_description'], service['price'])} className={"btn btn-primary"}>Admit</a>}</li>

            );
            setListItems(listItems);
            const isChair = await props.contract.methods.isChairperson(props.account).call();
            setIsChairperson(isChair);
        }
        load();
    },[]);

    const isCoach = props.isCoach;
    if(isCoach){
        return(<Stack className="align-items-center">
            <h3 className="display-3">Admit Services</h3>
            <ul>{listItems}</ul>
        </Stack>);
    }else{
        if(isChairperson){
            return(<Container className="px-5 my-5">
                <Row className="justify-content-center">

                    <Col className="col-lg-8">
                        <Card className="border-0 rounded-3 shadow-lg p-5">

                            <div className="card-body p-4"><center>

                                <div className="h1 fw-light">Register Coach</div>
                                <p className="mb-4 text-muted">You don't need a password because blockchain technology takes care of verifying.</p>

                            </center></div>

                            <form className="form-floating" ><center>

                                <label htmlFor={"cname"} className={"mb-2"}>Username</label>
                                <input className={"form-control mb-2"} id={"cname"} name={"cname"} placeholder="Username"
                                />

                            </center>

                                <div className="d-grid">
                                    <a href={"#"} onClick={() => registerCoach(props.contract, props.account)} className={"btn btn-primary btn-lg"}>Register</a>
                                </div>

                            </form>
                        </Card>

                    </Col>

                </Row></Container>);
        }else{
            return("You are neither a coach or a chairperson. ");
        }

    }

}
const RegisterFormDom = (props)=>{


    const [isRegistered, setIsRegistered] = useState();
    useEffect(()=>{

        async function load(){
            const isReg = await props.contract.methods.isRegistered(props.account).call();
            setIsRegistered(isReg);
        }
        load();
    },[])
    if(!isRegistered){
        return(
            <Container className="px-5 my-5">
                <Row className="justify-content-center">

                    <Col className="col-lg-8">
                        <Card className="border-0 rounded-3 shadow-lg p-5">

                            <div className="card-body p-4"><center>

                                <div className="h1 fw-light">Register Yourself</div>
                                <p className="mb-4 text-muted">You don't need a password because blockchain technology takes care of verifying.</p>

                            </center></div>

                            <form className="form-floating" ><center>

                                <label htmlFor={"username"} className={"mb-2"}>Username</label>
                                <input className={"form-control mb-2"} id={"username"} name={"username"} placeholder="Username"
                                />

                            </center>

                                <div className="d-grid">
                                    <a href={"#"} onClick={() => registerPlayer(props.contract, props.account)} className={"btn btn-primary btn-lg"}>Register</a>
                                </div>

                            </form>
                        </Card>

                    </Col>

                </Row></Container>


        );
    }else{
        return(<Stack className="justify-content-center align-items-center">
                <h3 className="display-3">You are already registered.</h3>
        </Stack>

            );
    }

}

const WalletDom = (props)=>{
    const _contract = props.contract;
    const _account = props.account;
    const [isRegistered, setIsRegistred] = useState();
    useEffect(()=>{

        async function load(){

            const isReg = await _contract.methods.isRegistered(_account).call();
            setIsRegistred(isReg);
        }
        load();
    },[])


    return(
        <WalletDomInternal registered={isRegistered} contract={props.contract} account={props.account} web3Obj={props.web3Obj}/>
    );
}
const WalletDomInternal = (props)=>{

    const [balance, setBalance] = useState();
    useEffect(()=>{
        async function load(){
            const balance = await getBalance(props.contract, props.account, props.web3Obj);
            setBalance(balance);
        }
        load();
    },[]);
    if(props.registered){


return(<Row >
    <Col >
        <h3 className="sub-header">You have {balance} Ether</h3>
    </Col>

</Row>);
    }
    else{
        return ("Not Registered.");
    }
}

const MyServicesDom = (props)=>{
        const [listItems, setListItems] = useState();

        useEffect(()=>{
            async function load(){
                let _services = await getServices(props.account);



                const listItems = _services.map((service) =>
                    <li>{service['service_name'] + ' ' + service['service_description']}</li>
                );
                setListItems(listItems);
            }
            load();
        },[]);

        return(
            <>
                <h3 className='sub-header'>Your services</h3>
                <ul>{listItems}</ul>
            </>

        );
}


async function getServices(account){
    let services = await $.get( "getAdmittedServices?address="+account);

    return services;
}
async function getServiceRequests(){
    let services = await $.get( "getServiceRequests");

    return services;
}
async function admitService(address, name, description,price){
 await $.get('admitservice?address='+address+'&name='+name+'&description='+description+'&price='+price);
}
function registerPlayer(contract, account) {



  contract.methods.register ().send( {from: account}).then(function(receipt){
    if(receipt){
        alert('Executing with '+document.getElementById('username').value+' and '+account);
      const Http = new XMLHttpRequest();
      const url='http://localhost:3300/registeruser?username='+document.getElementById('username').value+ '&address='+account;
      Http.open("GET", url);
      Http.send();

      Http.onreadystatechange = (e) => {
      }
    }else{
    }

  });

}

function registerCoach(contract, account) {



  contract.methods.registerCoach ().send( {from: account}).then(function(receipt){
    if(receipt){


      const Http = new XMLHttpRequest();
      const url='http://localhost:3300/registercoach?username='+document.getElementById('cname').value+ '&address='+account;
      Http.open("GET", url);
      Http.send();

      Http.onreadystatechange = (e) => {
      }
    }else{
    }

  });
}
//
//
export function requestRegisterService(contract, account){

  contract.methods.isRegistered(account).call().then( function( isReg ) {
    if(!isReg){
      alert("You are not registred, you can't register a service.");
      return;
    }
    const Http = new XMLHttpRequest();
    const url='http://localhost:3300/requestRegisterService?name='+document.getElementById('servicename').value+ '&description='+document.getElementById('servicedescription').value+'&address='+account +'&price='+document.getElementById('price').value;
    Http.open("GET", url);
    Http.send();


    Http.onreadystatechange = (e) => {
           console.log(Http.responseText);
           if( Http.responseText == "Success"){
               $('#servicename').val('');
               $('#servicedescription').val('');
               $('#price').val('');
               alert("Successfully created service.")
           }
    }

  });
}
//
function submitService(contract, account){

  contract.methods.isRegistered(account).call().then( function( isReg ) { // check if the address is registred first
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
        }

      }else{
      }

    });


  });

}
//
// async function verifyClient() {
//   console.log(_contract.address +" is the contract address");
//   return await _contract.methods.isRegistered(_account).call();
//
// }
// function unRegister(){
//   contract.methods.unRegister().send({from:account}).then(function(receipt){
//     if(receipt){
//       const Http = new XMLHttpRequest();
//       const url='http://localhost:3300/deleteuser?address='+account;
//       Http.open("GET", url);
//       Http.send();
//
//       Http.onreadystatechange = (e) => {
//         console.log(Http.responseText)
//       }
//
//
//
//       console.log("Player with address ",account, " got deleted.");
//     }else{
//       console.log("Deletion failed.");
//     }
//
//   });
// }
// function deleteService(){
//   const Http = new XMLHttpRequest();
//   const url='http://localhost:3300/deleteservice?address='+account+'&name='+document.getElementById('sname_delete').value;
//   Http.open("GET", url);
//   Http.send();
//
//   Http.onreadystatechange = (e) => {
//     console.log(Http.responseText)
//   }
//
// }
//
async function getBalance(_contract, _account, _web3Obj){
    let contract = _contract;
    let account = _account;
  return await _web3Obj.eth.getBalance(account).then(result => _web3Obj.utils.fromWei(result,"ether"));
}

export function buy_service(contract, account, web3Obj, addressTo, servicename, price){

    contract.methods.sendMoney (addressTo).send( {from: account,
        value: web3Obj.utils.toWei(price, 'ether')}).then(async function(receipt){

        if(receipt){
            await $.get('http://localhost:3300/buyservice?servicename='+servicename+ '&address='+account)

        }else{
        }

    });
}

export async function get_allservices(){
    let services = await $.get( "getallservices");

    return services;
}


export default App;


