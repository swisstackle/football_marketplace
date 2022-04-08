// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

contract Players{
   // Set the address of the chairperson here
     address payable chairperson= payable(0x331f839174981d1BcA828131ecFB2A07E1871dBb);
      mapping(address =>uint) member;
    mapping(address=>uint) isCoach;
    mapping(address=>uint) players;

  

      modifier onlyMember{ 
         require(member[msg.sender]==1);
            _;
      }
      // checks whether the address that the sender wants to send money to is also a member
      modifier onlyMemberTo(address payable toAddress){ 
         require(member[toAddress]==1);
            _;
      }
  

    modifier onlyCoach{
        require(isCoach[msg.sender]==1);
        _;
    }

    modifier onlyChairperson{
        require(msg.sender == chairperson);
        _;
    }

    constructor () public payable { 
//         chairperson= payable(msg.sender);
//
//         players[chairperson] = msg.sender.balance;
        // chairperson.transfer(msg.value);
         //console.log("System has been initiated with chairperson: ", chairperson, " with balance ", msg.sender.balance);
        }
     function register () public payable{ 
        address payable ad = payable(msg.sender);
        players[ad] = msg.sender.balance;
        member[ad] = 1;
         isCoach[ad]=0;
     }
    function registerCoach (address payable toRegister) onlyChairperson public payable{
        players[toRegister] = msg.sender.balance;
        member[toRegister] = 1;
        isCoach[toRegister]=1;
    }
     function unRegister() public payable{
         address payable ad = payable(msg.sender);
         member[ad] = 0;
         isCoach[ad]=0;
     }
   //   function register_service(service memory s, string memory playerName) onlyMember beYourSelf(playerName) public{
   //      address ad = playerToAdress[playerName];
   //      players[ad].services.push(s);
   //      console.log("Address ", ad, " registred the service called ", s.name);
   //   }
     function register_service() onlyMember public{
        // We will only verify whether the sender address can register a service. Only modifier onlyMember() is necessary for that
     }
    function submit_service() onlyCoach public {

    }
//     function unRegisterService() onlyMember public {
//         //same
//     }

//      function editService() onlyMember public {
//         //same
//      }
//      function rateService() onlyMember public {
//         //same
//
//      }
      
     function sendMoney(address payable toAddress) onlyMember onlyMemberTo(toAddress) payable public {
         address fromAddress = msg.sender;
         uint amt = msg.value;
         players[toAddress] = players[toAddress] + amt;
         players[fromAddress] = players[fromAddress] - amt;
         toAddress.transfer(amt); 
     }

   function isRegistered (address a) public view returns(bool){
         return (member[a] == 1);
   }
    function isCoachView (address a) public view returns(bool){
        return (isCoach[a]==1);
    }
    function isChairperson (address a) public view returns(bool){
        return (payable(a) == chairperson);
    }

    
}