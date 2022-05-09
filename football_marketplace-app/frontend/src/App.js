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

var abi = JSON.parse('[\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "initialSupply",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "payable",\n' +
    '\t\t"type": "constructor"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"anonymous": false,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": true,\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "owner",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": true,\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "spender",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": false,\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "value",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "Approval",\n' +
    '\t\t"type": "event"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"anonymous": false,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": true,\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "from",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": true,\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "to",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": false,\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "value",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "Transfer",\n' +
    '\t\t"type": "event"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "amount",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "airdrop",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "owner",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "spender",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "allowance",\n' +
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
    '\t\t\t\t"name": "spender",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "amount",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "approve",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "account",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "balanceOf",\n' +
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
    '\t\t"inputs": [],\n' +
    '\t\t"name": "decimals",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint8",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "uint8"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "spender",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "subtractedValue",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "decreaseAllowance",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "from",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "getBalance",\n' +
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
    '\t\t"inputs": [],\n' +
    '\t\t"name": "getTokenAddress",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "spender",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "addedValue",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "increaseAllowance",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
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
    '\t\t"name": "isChairperson",\n' +
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
    '\t\t\t\t"name": "a",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "isCoachView",\n' +
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
    '\t\t"inputs": [],\n' +
    '\t\t"name": "name",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "string",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "string"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
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
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address payable",\n' +
    '\t\t\t\t"name": "toRegister",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
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
    '\t\t"inputs": [],\n' +
    '\t\t"name": "submit_service",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "symbol",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "string",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "string"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "totalSupply",\n' +
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
    '\t\t\t\t"name": "to",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "amount",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "transfer",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "from",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "to",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "amount",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "transferFrom",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "unRegister",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "payable",\n' +
    '\t\t"type": "function"\n' +
    '\t}\n' +
    ']'
);


function App() {
    const [contract, setContract] = useState();
    const [account, setAccount] = useState();
    const [web3Obj, setWeb3Obj] = useState();


    useEffect(() => {

        async function load() {
            const web3 = new Web3(Web3.givenProvider || 'http://http://localhost:7545');
            setWeb3Obj(web3);
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
            $.get("getcontractaddress")
                .done(function (data) {


                    const _contract = new web3.eth.Contract(abi, data);
                    _contract.address = data;
                    setContract(_contract);


                });


        }

        load();
    }, [])

    return (
        <Stack className="vw-100 vh-100">
            <NavDom contract={contract}/>

            <Routes>
                <Route path='register' element={<RegisterFormDom contract={contract} account={account}/>}/>
                <Route path='wallet' element={<WalletDom contract={contract} account={account} web3Obj={web3Obj}/>}/>
                <Route path='myservices'
                       element={<MyServicesDom contract={contract} account={account} web3Obj={web3Obj}/>}/>
                <Route path='coaches'
                       element={<CoachesBackendDom contract={contract} account={account} web3Obj={web3Obj}/>}/>
                <Route path='store' element={<Store contract={contract} account={account} web3Obj={web3Obj}/>}/>
                <Route path='createservice'
                       element={<RequestRegisterService contract={contract} account={account} web3Obj={web3Obj}/>}/>
                <Route path='home' element={<HomeDom/>}/>
                <Route path='' element={<HomeDom/>}/>
            </Routes>
            <Footer/>
        </Stack>
    );

}


const HomeDom = () => {
    return (
        <Video/>
    );
}
const NavDom = (props) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/home">Bulls Marketplace</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
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
const CoachesBackendDom = (props) => {

    const [isCoach, setIsCoach] = useState();

    useEffect(() => {

        async function load() {

            const coach = await props.contract.methods.isCoachView(props.account).call();
            setIsCoach(coach);

        }

        load();
    }, []);
    return (<CoachesBackendDomInternal isCoach={isCoach} contract={props.contract} account={props.account}/>);
}
const CoachesBackendDomInternal = (props) => {
    const [listItems, setListItems] = useState();
    const [isChairperson, setIsChairperson] = useState();
    useEffect(() => {
        async function load() {
            const _requests = await getServiceRequests();

            const listItems = _requests.map((service) =>
                <li>{service['service_name'] + ' ' + service['service_description'] + ': '} {<a href={"#"}
                                                                                                onClick={() => admitService(service['address'], service['service_name'], service['service_description'], service['price'])}
                                                                                                className={"btn btn-primary"}>Admit</a>}</li>
            );
            setListItems(listItems);
            const isChair = await props.contract.methods.isChairperson(props.account).call();
            setIsChairperson(isChair);
        }

        load();
    }, []);

    const isCoach = props.isCoach;
    if (isCoach) {
        return (<Stack className="align-items-center">
            <h3 className="display-3">Admit Services</h3>
            <ul>{listItems}</ul>
        </Stack>);
    } else {
        if (isChairperson) {
            return (<Container className="px-5 my-5">
                <Row className="justify-content-center">

                    <Col className="col-lg-8">
                        <Card className="border-0 rounded-3 shadow-lg p-5">

                            <div className="card-body p-4">
                                <center>

                                    <div className="h1 fw-light">Register Coach</div>
                                    <p className="mb-4 text-muted">You don't need a password because blockchain
                                        technology takes care of verifying.</p>

                                </center>
                            </div>

                            <form className="form-floating">
                                <center>

                                    <label htmlFor={"cname"} className={"mb-2"}>Username</label>
                                    <input className={"form-control mb-2"} id={"cname"} name={"cname"}
                                           placeholder="Username"
                                    />
                                    <label htmlFor={"caddress"} className={"mb-2"}>Address of Coach</label>
                                    <input className={"form-control mb-2"} id={"caddress"} name={"caddress"}
                                           placeholder="Address of Coach"
                                    />

                                </center>

                                <div className="d-grid">
                                    <a href={"#"} onClick={() => registerCoach(props.contract, props.account)}
                                       className={"btn btn-primary btn-lg"}>Register</a>
                                </div>

                            </form>
                        </Card>

                    </Col>

                </Row></Container>);
        } else {
            return ("You are neither a coach or a chairperson. ");
        }

    }

}
const RegisterFormDom = (props) => {
    const [isRegistered, setIsRegistered] = useState();
    useEffect(() => {

        async function load() {
            const isReg = await props.contract.methods.isRegistered(props.account).call();
            setIsRegistered(isReg);
        }

        load();
    }, [])
    if (!isRegistered) {
        return (
            <Container className="px-5 my-5">
                <Row className="justify-content-center">

                    <Col className="col-lg-8">
                        <Card className="border-0 rounded-3 shadow-lg p-5">

                            <div className="card-body p-4">
                                <center>

                                    <div className="h1 fw-light">Register Yourself</div>
                                    <p className="mb-4 text-muted">You don't need a password because blockchain
                                        technology takes care of verifying.</p>

                                </center>
                            </div>

                            <form className="form-floating">
                                <center>

                                    <label htmlFor={"username"} className={"mb-2"}>Username</label>
                                    <input className={"form-control mb-2"} id={"username"} name={"username"}
                                           placeholder="Username"
                                    />

                                </center>

                                <div className="d-grid">
                                    <a href={"#"} onClick={() => registerPlayer(props.contract, props.account)}
                                       className={"btn btn-primary btn-lg"}>Register</a>
                                </div>

                            </form>
                        </Card>

                    </Col>

                </Row></Container>


        );
    } else {
        return (<Stack className="justify-content-center align-items-center">
                <h3 className="display-3">You are already registered.</h3>
            </Stack>

        );
    }

}

const WalletDom = (props) => {
    const _contract = props.contract;
    const _account = props.account;
    const [isRegistered, setIsRegistred] = useState();
    useEffect(() => {

        async function load() {

            const isReg = await _contract.methods.isRegistered(_account).call();
            setIsRegistred(isReg);
        }

        load();
    }, [])


    return (
        <WalletDomInternal registered={isRegistered} contract={props.contract} account={props.account}
                           web3Obj={props.web3Obj}/>
    );
}
const WalletDomInternal = (props) => {

    const [balance, setBalance] = useState();
    useEffect(() => {
        async function load() {
            const balance = await getBalance(props.contract, props.account, props.web3Obj);
            setBalance(balance);
        }

        load();
    }, []);
    if (props.registered) {


        return (<Row>
            <Col>
                <h3 className="sub-header">You have {balance} Btt</h3>
            </Col>

        </Row>);
    } else {
        return ("Not Registered.");
    }
}

const MyServicesDom = (props) => {
    const [listItems, setListItems] = useState();

    useEffect(() => {
        async function load() {
            let _services = await getServices(props.account);


            const listItems = _services.map((service) =>
                <li>{service['service_name'] + ' ' + service['service_description']}</li>
            );
            setListItems(listItems);
        }

        load();
    }, []);

    return (
        <>
            <h3 className='sub-header'>Your services</h3>
            <ul>{listItems}</ul>
        </>

    );
}


async function getServices(account) {
    let services = await $.get("getAdmittedServices?address=" + account);

    return services;
}

async function getServiceRequests() {
    let services = await $.get("getServiceRequests");

    return services;
}

async function admitService(address, name, description, price) {
    await $.get('admitservice?address=' + address + '&name=' + name + '&description=' + description + '&price=' + price);
}

function registerPlayer(contract, account) {

    contract.methods.register().send({from: account}).then(function (receipt) {
        if (receipt) {
            alert('Executing with ' + document.getElementById('username').value + ' and ' + account);
            const Http = new XMLHttpRequest();
            const url = 'http://localhost:3300/registeruser?username=' + document.getElementById('username').value + '&address=' + account;
            Http.open("GET", url);
            Http.send();

            Http.onreadystatechange = (e) => {
            }

        } else {
        }

    });

}

function registerCoach(contract, account) {


    contract.methods.registerCoach(document.getElementById('caddress').value).send({from: account}).then(function (receipt) {
        if (receipt) {


            const Http = new XMLHttpRequest();
            const url = 'http://localhost:3300/registercoach?username=' + document.getElementById('cname').value + '&address=' + document.getElementById('caddress').value;
            Http.open("GET", url);
            Http.send();

            Http.onreadystatechange = (e) => {
            }
        } else {
        }

    });
}

export function requestRegisterService(contract, account) {

    contract.methods.isRegistered(account).call().then(function (isReg) {
        if (!isReg) {
            alert("You are not registred, you can't register a service.");
            return;
        }
        const Http = new XMLHttpRequest();
        const url = 'http://localhost:3300/requestRegisterService?name=' + document.getElementById('servicename').value + '&description=' + document.getElementById('servicedescription').value + '&address=' + account + '&price=' + document.getElementById('price').value;
        Http.open("GET", url);
        Http.send();


        Http.onreadystatechange = (e) => {
            console.log(Http.responseText);
            if (Http.responseText == "Success") {
                $('#servicename').val('');
                $('#servicedescription').val('');
                $('#price').val('');
                alert("Successfully created service.")
            }
        }

    });
}

function submitService(contract, account) {

    contract.methods.isRegistered(account).call().then(function (isReg) { // check if the address is registred first
        //document.getElementById('lastInfo').innerHTML = info;
        if (!isReg) {
            alert("You are not registred, you can't submit a service.");
            return;
        }
        contract.methods.submit_service().send({from: account}).then(function (receipt) {
            if (receipt) {
                const Http = new XMLHttpRequest();
                const url = 'http://localhost:3300/submitservice';
                Http.open("GET", url);
                Http.send();

                Http.onreadystatechange = (e) => {
                }

            } else {
            }

        });


    });

}

async function getBalance(_contract, _account, _web3Obj) {
    let contract = _contract;
    let account = _account;
    //result has to be converted to Btt. The decimal used here is 18. Has to be changed if the decimal changes
    //TODO: instead of using 18, request the decimal from the smartcontract to make it more dynamic. However, we have no reason to change the decimal, so we will use 18 statically for now.
    //return await _web3Obj.eth.getBalance(account).then(result => result*Math.pow(10,-18));
    return await contract.methods.getBalance(account).call();
}

export function buy_service(contract, account, web3Obj, addressTo, servicename, price) {
    alert("The price is " + price);
    contract.methods.transfer(addressTo, web3Obj.utils.toWei(price, "ether")).send({from: account}
    ).then(async function (receipt) {

        if (receipt) {
            await $.get('http://localhost:3300/buyservice?servicename=' + servicename + '&address=' + account)

        } else {
        }

    });
}

export async function get_allservices() {
    let services = await $.get("getallservices");

    return services;
}


export default App;


