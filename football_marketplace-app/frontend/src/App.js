import React, {Component, useEffect, useState,createContext } from 'react';
import {Routes, Route} from 'react-router'
import * as $ from 'jquery';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
// import './sketchy.min.css';

import { Navbar, Nav, Container, NavDropdown, Form,FormControl, Button, Row, Col, PageHeader } from 'react-bootstrap';
import {Link} from "react-router-dom";

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





// function startContract(_contractAddress){
//   contract = new web3.eth.Contract(abi, _contractAddress);
//   console.log("Read the contractaddress: "+_contractAddress);
//
// }
// $(document).ready(function () {
//   $(document).click(function () {
//     // if($(".navbar-collapse").hasClass("in")){
//     $('.navbar-collapse').collapse('hide');
//     // }
//   });
// });

function App() {
  const [contract, setContract] = useState();
    const [account, setAccount] = useState();
    const[web3Obj, setWeb3Obj]=useState();

  useEffect(()=>{

    async function load(){
        const web3 = new Web3(Web3.givenProvider || 'http://http://localhost:7545');
        setWeb3Obj(web3);
        const accounts = await web3.eth.requestAccounts();
        console.log(accounts[0] + " is the account");
        setAccount(accounts[0]);
       $.get( "getcontractaddress")
          .done(  function( data ) {


              const _contract = new web3.eth.Contract(abi, data);
              _contract.address = data;
              console.log(_contract.address + " is the contract");
              setContract(_contract);

          });



    }
     load();
  },[])

  return(
      <>
        <NavDom/>
          <Routes>
              <Route path='register' element={<RegisterFormDom contract={contract} account={account}/>}/>
              <Route path='wallet' element={<WalletDom contract={contract} account={account} web3Obj={web3Obj}/>}/>
              <Route path='myservices' element={<MyServicesDom contract={contract} account={account} web3Obj={web3Obj}/>}/>
              <Route path='home' element={<HomeDom/>}/>

          </Routes>
          <Footer/>
          </>
  );

}

const HomeDom = ()=>{
  return(
     <Row>
        <Col>

            <h3 className={'display-3'}><center>Welcome to the Bulls Marketplace</center></h3>
        </Col>
      </Row>
  );
}
const NavDom = ()=>{
  return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
              <Navbar.Brand  as={Link} to="/home">Bulls Marketplace</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link as={Link} to="/register">Register</Nav.Link>
                      <Nav.Link as={Link} to="/wallet">Wallet</Nav.Link>
                      <NavDropdown title="Services" id="basic-nav-dropdown">
                          <NavDropdown.Item as={Link} to="/myservices">My Services</NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/createservice">Create a Service</NavDropdown.Item>
                      </NavDropdown>
                      <Nav.Link as={Link} to="/store">Store</Nav.Link>
                  </Nav>
                  <Nav>
                      <Nav.Link as={Link} to="/about">About</Nav.Link>

                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
  );
}

const RegisterFormDom = (props)=>{
      return(
      <Row>
        <Col>
          <h3 className="sub-header">Register Player</h3>
          <form className="form-inline" role="form">
            <div className="form-group">
              <table>
                <tr>
                  <td><label htmlFor={"username"}>Username:</label></td>
                  <td>
                    <input className={"form-control"} id={"username"} name={"username"}/>

                  </td>
                </tr>
              </table>
            </div>
            <a href={"#"} onClick={() => registerPlayer(props.contract, props.account)} className={"btn btn-primary"}>Register</a>
          </form>
        </Col>
      </Row>
  );
}

const WalletDom = (props)=>{
    const _contract = props.contract;
    const _account = props.account;
    const [isRegistered, setIsRegistred] = useState();
    useEffect(()=>{

        async function load(){

            const isReg = await _contract.methods.isRegistered(_account).call();
            console.log(isReg);
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
            console.log(balance);
            setBalance(balance);


        }
        load();
    },[]);
    if(props.registered){
        console.log("He is registered");


return(<Row>
    <Col>
        <h3 className="sub-header">You have {balance} Ether</h3>
    </Col>
</Row>);
    }else{
        return (
            <Row>
                <Col>
                    <h3 className="sub-header">You are not registred.</h3>
                </Col>
            </Row>
        );
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
function registerPlayer(contract, account) {

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

}
//
// function registerCoach() {
//
//   console.log('blabla '+document.getElementById('cname').value);
//
//
//   contract.methods.registerCoach ().send( {from: account}).then(function(receipt){
//     console.log('blabla2 '+document.getElementById('cname').value);
//     if(receipt){
//
//
//       const Http = new XMLHttpRequest();
//       const url='http://localhost:3300/registercoach?username='+document.getElementById('cname').value+ '&address='+account;
//       Http.open("GET", url);
//       Http.send();
//
//       Http.onreadystatechange = (e) => {
//         console.log(Http.responseText)
//       }
//       console.log("Coach with address ",account, " got registred.");
//     }else{
//       console.log("Registration failed.");
//     }
//
//   });
// }
//
//
function requestRegisterService(contract, account){

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
//
function submitService(contract, account){

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
//   console.log("Player with address ",account, " deleted a service.");
//
// }
//
async function getBalance(_contract, _account, _web3Obj){
    let contract = _contract;
    let account = _account;
  return await _web3Obj.eth.getBalance(account).then(result => _web3Obj.utils.fromWei(result,"ether"));
}



export default App;


