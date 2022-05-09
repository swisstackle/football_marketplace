
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Btt is ERC20 {
    address chairperson = address(0x7e10E4A80dd5D140Fe2aA8b4f8DC7daaDDa6E530);
    constructor(uint256 initialSupply) public ERC20("Btt", "Btt") {
        _mint(msg.sender, initialSupply*10** uint(decimals()));
    }

    function transferCustom(address to, uint256 amount) public virtual returns (bool) {
        address owner = tx.origin;
        _transfer(owner, to, amount);
        return true;
    }
}