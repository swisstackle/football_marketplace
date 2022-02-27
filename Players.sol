// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;
import "hardhat/console.sol";
contract Players{
     address payable chairperson;
      mapping (address=>uint) public players; // maps player to its balance
      mapping(address =>uint) member;
  

      modifier onlyMember{ 
         require(member[msg.sender]==1);
            _;
      }
      // checks whether the address that the sender wants to send money to is also a member
      modifier onlyMemberTo(address payable toAddress){ 
         require(member[toAddress]==1);
            _;
      }
   
      modifier beYourSelfViaAddress (address _ad){
         require(msg.sender == _ad);
         _;
      }
    constructor () public payable { 
         chairperson= payable(msg.sender);
         
         players[chairperson] = msg.sender.balance;
        // chairperson.transfer(msg.value);
         console.log("System has been initiated with chairperson: ", chairperson, " with balance ", msg.sender.balance);
        }
     function register (address payable newPlayer) public payable{ 
        players[newPlayer] = msg.sender.balance;
        member[newPlayer] = 1;
     }
   //   function register_service(service memory s, string memory playerName) onlyMember beYourSelf(playerName) public{
   //      address ad = playerToAdress[playerName];
   //      players[ad].services.push(s);
   //      console.log("Address ", ad, " registred the service called ", s.name);
   //   }
     function register_service() onlyMember public{
        // We will only verify whether the sender address can register a service. Only modifier onlyMember() is necessary for that
     }
     function unRegisterService() onlyMember public {
         //same
     }

      function editService() onlyMember public {
         //same
      }
      function rateService() onlyMember public {
         //same
         
      }
      
     function sendMoney(address payable toAddress) onlyMember onlyMemberTo(toAddress) payable public {
         address fromAddress = msg.sender;
         uint amt = msg.value;
         players[toAddress] = players[toAddress] + amt;
         players[fromAddress] = players[fromAddress] - amt;
         toAddress.transfer(amt); 
     }
   //   function sendMoney(string memory toName) onlyMember payable public {
   //      uint amt = msg.value;
   //      address payable toAddress = playerToAdress[toName];
   //       address fromAddress=msg.sender;
   //       players[toAddress].balance = players[toAddress].balance + amt;
   //       players[fromAddress].balance = players[fromAddress].balance - amt;
   //       toAddress.transfer(amt); 
   //   }

    function print(address a) public view {
        uint p = players[a];
        console.log("Player ",a, " has a balance of ", p);
    }
    
}