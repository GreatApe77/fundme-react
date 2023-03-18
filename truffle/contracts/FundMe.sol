// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract FundMe {

    struct Funder{
        address addressOfFunder;
        uint256 amountFunded;
    }



    mapping(address=>Funder) private funderByAddress;


    function getContractBalance() public view returns(uint256){
        return address(this).balance;
    }



}