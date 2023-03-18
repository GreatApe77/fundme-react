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
    event Fund(address indexed funder,uint256 indexed amountFunded);

    address private owner;

    mapping(address => Funder) private funderByAddress;

    constructor() {
        owner = msg.sender;
    }

    function getOwner() external view returns(address){
        return owner;
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
    
        emit Fund(msg.sender, msg.value);
    }
    //dono pode scar os ganhos do contrato
    function withdraw(uint256 amount) public onlyOwner(){
        (bool os,) = payable(msg.sender).call{value:amount}("");
        require(os,"Erro na transacao!");
    }

    receive() external payable{
        fund();
    }

    
    fallback() external payable{
        fund();
    }
}
