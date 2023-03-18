// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract FundMe {
    struct Funder {
        address addressOfFunder;
        uint256 amountFunded;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    address private owner;

    mapping(address => Funder) private funderByAddress;

    constructor() {
        owner = msg.sender;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getFunder(
        address funderAddress
    ) public view returns (Funder memory) {
        return funderByAddress[funderAddress];
    }

    function fund() public payable {
        funderByAddress[msg.sender].addressOfFunder = msg.sender;

        funderByAddress[msg.sender].amountFunded += msg.value;
    }
    //dono pode scar os ganhos do contrato
    function withdraw(uint256 amount) external onlyOwner(){
        
    }

    receive() external payable{
        fund();
    }

    
    fallback() external payable{
        fund();
    }
}
