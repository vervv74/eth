// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;
import "@openzeppelin/contracts/math/SafeMath.sol";

contract Wal {
    using SafeMath for uint256;
    enum Dir {In, Out} //Transfers - in or out
    struct Transfer {
        Dir dir; 
        uint amount;
    }
    mapping (address => uint256) public Rest; //Wallet of sender
    receive() external payable {
        Rest[msg.sender] = Rest[msg.sender].add(msg.value);//Calculate sender wallet rest
    }

    function AddressBalance(address _address) public view returns (uint256) {
        //balance of each address - not sc balance, but eth balance
        return _address.balance;
    }
 function ContractAddress() public view returns(address){ //Contract address
         return address(this);
     }
    function ContractBalance() public view returns (uint256) {
        //Contract balance
        return address(this).balance;
    }
    function getRest(address _address) public view returns(uint) {
         return Rest[_address];
     }

     function Send(address payable _address, uint256 amount) public restAddress(_address, amount) {//
         _address.transfer(amount);
         Rest[_address] = Rest[_address].sub(amount);
     }
      modifier restAddress(address _address, uint amount){
         require(Rest[_address]>=amount, "Rest is not enough");
         _;
     }
}
