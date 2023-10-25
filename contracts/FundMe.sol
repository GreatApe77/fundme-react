// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/////////////////////////////////////////////////////////////////////////////////
///  /$$$$$$$$ /$$   /$$ /$$   /$$ /$$$$$$$        /$$      /$$ /$$$$$$$$ /$$ /// 
/// | $$_____/| $$  | $$| $$$ | $$| $$__  $$      | $$$    /$$$| $$_____/| $$ /// 
/// | $$      | $$  | $$| $$$$| $$| $$  \ $$      | $$$$  /$$$$| $$      | $$ /// 
/// | $$$$$   | $$  | $$| $$ $$ $$| $$  | $$      | $$ $$/$$ $$| $$$$$   | $$ /// 
/// | $$__/   | $$  | $$| $$  $$$$| $$  | $$      | $$  $$$| $$| $$__/   |__/ ///
/// | $$      | $$  | $$| $$\  $$$| $$  | $$      | $$\  $ | $$| $$           ///
/// | $$      |  $$$$$$/| $$ \  $$| $$$$$$$/      | $$ \/  | $$| $$$$$$$$ /$$ ///
/// |__/       \______/ |__/  \__/|_______/       |__/     |__/|________/|__/ ///
////////////////////////////////////////////////////////////////////////////////                                                                         
                                                                         
                                                                         

/// @title Fund me!
/// @author Mateus
/// @dev Fundme simples
contract FundMe {
    /**
     * @notice Estrutura que armazena os dados de um doador
     */
    struct Funder {
        address funderAddress;
        uint256 amountFunded;
    }

    /**
     * @notice Preco minimo para doações
     */
    uint256 public minimunPrice = 0.01 ether;
    /**
     * @notice Endereco do dono do contrato (Imutável)
     */
    address public immutable owner;
    /**
     * @notice mapeamento de endereços para doadores
     */
    mapping(address => Funder) public funderByAddress;
    /**
     * @notice Armazena todos os endereços de doadores
     */
    address[] public allFundersAddresses;

    
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }
    modifier validPrice() {
        require(msg.value >= minimunPrice, "Donate more");
        _;
    }
    /**
     * Emitido quando uma doação ocorre
     * @param funderAddress Endereco do doador
     * @param amount Quantidade doada
     */
    event Fund(address indexed funderAddress, uint256 indexed amount);
    /**
     * Emitido quando o dono saca
     * @param amount Quantidade sacada pelo dono
     */
    event Withdraw(uint256 indexed amount);

    /**
     * @notice Atribui o cargo de dono ao deployer do contrato
     */
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
     *@notice Funcao que lista todos os doadores com os valores doados
     */
    function getAllFunders() external view returns (Funder[] memory) {
        Funder[] memory allFunders = new Funder[](allFundersAddresses.length);

        for (uint i = 0; i < allFundersAddresses.length; i++) {
            allFunders[i] = funderByAddress[allFundersAddresses[i]];
        }
        return allFunders;
    }

    /**
     * @notice Funcao que retorna o total de ether armazenado no contrato
     */
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @notice Funcao que recebe ether e ativa a funcçao fund
     */
    receive() external payable {
        fund();
    }

    /**
     * @notice Funcao Fallback que tambem deve ser Ativada
     */
    fallback() external payable {
        fund();
    }
}
