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
    /**
     * @dev algum valor maior ou igual ao preco minimo entra no contrato atualizando as variaveis de estado
     */
    function fund() public payable validPrice {
        //already exists
        if (funderByAddress[msg.sender].funderAddress == msg.sender) {
            funderByAddress[msg.sender].amountFunded += msg.value;
        } else {
            Funder memory newFunder = Funder({
                funderAddress: msg.sender,
                amountFunded: msg.value
            });
            funderByAddress[msg.sender] = newFunder;
            allFundersAddresses.push(msg.sender);
        }
        emit Fund(msg.sender, msg.value);
    }

    /**
     * 
     * @param newDonationPrice novo preco minimo para doacoes
     */
    function setMinimunDonation(uint256 newDonationPrice) external onlyOwner {
        minimunPrice = newDonationPrice;
    }

    /**
     * funcao que permite o dono sacar uma quantidade arbitraria do banco (este contrato)
     * @param amount quantidade a ser sacada pelo dono
     */
    function withdraw(uint256 amount) external onlyOwner {
        (bool ok, ) = payable(owner).call{value: amount}("");
        require(ok, "Error in Witdraw");
        emit Withdraw(amount);
    }

    /**
     * Funcao que lista todos os doadores com os valores doados
     */
    function getAllFunders() external view returns (Funder[] memory) {
        Funder[] memory allFunders = new Funder[](allFundersAddresses.length);

        for (uint i = 0; i < allFundersAddresses.length; i++) {
            allFunders[i] = funderByAddress[allFundersAddresses[i]];
        }
        return allFunders;
    }

    /**
     * Funcao que retorna o total de ether armazenado no contrato
     */
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
