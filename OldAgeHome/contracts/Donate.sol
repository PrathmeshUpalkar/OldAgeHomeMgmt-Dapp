// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;

contract Donate {
 
    uint public noOfContributers;

    mapping(uint=>address) public contributers;
//    uint public ammount;
   address public  reciver;
//    address public sender = msg.address;

   function TransferMoney(address payable rec,uint amt) external {
        reciver = rec;
        rec.transfer(amt);
        contributers[noOfContributers]=msg.sender;
        


   }
     function DonateAmt() external payable{
        contributers[noOfContributers]=msg.sender;
    }
   
}