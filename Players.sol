// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;
import "hardhat/console.sol";
contract Players{
     address payable chairperson;
      mapping (address=>player) public players;
      mapping (string=>address payable) public playerToAdress;
      mapping(address =>uint) member;
      struct player{ 
        uint balance; // deposit for payment settlement
        string name;
        service[] services;
        }

        struct service{
            string name;
            string description;
            uint price;
        }

      modifier onlyMember{ 
         require(member[msg.sender]==1);
            _;
      }
      modifier beYourSelf (string memory _name){
         address payable _address = playerToAdress[_name];
         require(msg.sender == _address);
         _;
      }
    constructor () public payable { 
         chairperson= payable(msg.sender);
         
         players[chairperson].balance = msg.sender.balance;
         players[chairperson].name = "Chairperson";
         playerToAdress["Chairperson"] = chairperson;
        // chairperson.transfer(msg.value);
         console.log("System has been initiated with chairperson: ", chairperson, " with balance ", msg.sender.balance);
        }
     function register (string memory name) public payable{ 
        address payable newPlayer = payable(msg.sender);
        players[newPlayer].name =name;
        
        players[newPlayer].balance = msg.sender.balance;
        playerToAdress[name] = newPlayer;
        member[newPlayer] = 1;
     }
     function register_service(service memory s, string memory playerName) onlyMember beYourSelf(playerName) public{
        address ad = playerToAdress[playerName];
        players[ad].services.push(s);
        console.log("Address ", ad, " registred the service called ", s.name);
     }
     function register_service_by_ad(service memory s, address from) onlyMember public{
        players[from].services.push(s);
        console.log("Address ", from, " registred the service called ", s.name);
     }

     function sendMoney(address payable toAddress) onlyMember payable public {
         address fromAddress=msg.sender;
         uint amt = msg.value;
         players[toAddress].balance = players[toAddress].balance + amt;
         players[fromAddress].balance = players[fromAddress].balance - amt;
         toAddress.transfer(amt); 
     }
     function sendMoney(string memory toName) onlyMember payable public {
        uint amt = msg.value;
        address payable toAddress = playerToAdress[toName];
         address fromAddress=msg.sender;
         players[toAddress].balance = players[toAddress].balance + amt;
         players[fromAddress].balance = players[fromAddress].balance - amt;
         toAddress.transfer(amt); 
     }

    function print(string memory name) public view {
        address a = playerToAdress[name];
        player memory p = players[a];

        console.log("Player ",name, " has a balance of ", p.balance);
         console.log(" and offers the services: ");
         for (uint i = 0; i < p.services.length; i++) {
            console.log(p.services[i].name);
         }
    }
    
}