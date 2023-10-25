# Solidity API

## FundMe

_Fundme simples_

### Funder

```solidity
struct Funder {
  address funderAddress;
  uint256 amountFunded;
}
```

### minimunPrice

```solidity
uint256 minimunPrice
```

Preco minimo para doações

### owner

```solidity
address owner
```

Endereco do dono do contrato (Imutável)

### funderByAddress

```solidity
mapping(address => struct FundMe.Funder) funderByAddress
```

mapeamento de endereços para doadores

### allFundersAddresses

```solidity
address[] allFundersAddresses
```

Armazena todos os endereços de doadores

### onlyOwner

```solidity
modifier onlyOwner()
```

### validPrice

```solidity
modifier validPrice()
```

### Fund

```solidity
event Fund(address funderAddress, uint256 amount)
```

Emitido quando uma doação ocorre

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| funderAddress | address | Endereco do doador |
| amount | uint256 | Quantidade doada |

### Withdraw

```solidity
event Withdraw(uint256 amount)
```

Emitido quando o dono saca

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | Quantidade sacada pelo dono |

### constructor

```solidity
constructor() public
```

Atribui o cargo de dono ao deployer do contrato

### fund

```solidity
function fund() public payable
```

_algum valor maior ou igual ao preco minimo entra no contrato atualizando as variaveis de estado_

### setMinimunDonation

```solidity
function setMinimunDonation(uint256 newDonationPrice) external
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newDonationPrice | uint256 | novo preco minimo para doacoes |

### withdraw

```solidity
function withdraw(uint256 amount) external
```

funcao que permite o dono sacar uma quantidade arbitraria do banco (este contrato)

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | quantidade a ser sacada pelo dono |

### getAllFunders

```solidity
function getAllFunders() external view returns (struct FundMe.Funder[])
```

Funcao que lista todos os doadores com os valores doados

### getContractBalance

```solidity
function getContractBalance() public view returns (uint256)
```

Funcao que retorna o total de ether armazenado no contrato

### receive

```solidity
receive() external payable
```

Funcao que recebe ether e ativa a funcçao fund

### fallback

```solidity
fallback() external payable
```

Funcao Fallback que tambem deve ser Ativada

