// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title Fund me!
/// @author Mateus
/// @dev Fundme simples
contract FundMe {
    struct Funder {
        address funderAddress;
        uint256 amountFunded;
    }

    uint256 public minimunPrice = 0.01 ether;
    address public immutable owner;
    mapping(address => Funder) public funderByAddress;
    address[] public allFundersAddresses;

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }
    modifier validPrice() {
        require(msg.value >= minimunPrice);
        _;
    }
    event Fund(address indexed funderAddress, uint256 indexed amount);
    event Withdraw(uint256 indexed amount);
    constructor() {
        owner = msg.sender;
    }

    function fund() public payable validPrice {
        //already exists
        if(funderByAddress[msg.sender].funderAddress==msg.sender){
            funderByAddress[msg.sender].amountFunded += msg.value;
        }else{
            Funder memory newFunder = Funder({funderAddress:msg.sender,amountFunded:msg.value});
            funderByAddress[msg.sender] = newFunder;
            allFundersAddresses.push(msg.sender);
        }
        emit Fund(msg.sender, msg.value);
    }
    function setMinimunDonation(uint256 newDonationPrice)external onlyOwner(){
        minimunPrice = newDonationPrice;
    }
    function withdraw(uint256 amount) external onlyOwner {

        (bool ok,) = payable(owner).call{value:amount}("");
        require(ok,"Error in Witdraw");
        emit Withdraw(amount);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
