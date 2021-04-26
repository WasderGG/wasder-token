
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./EIP712/EIP712Base.sol";
import "./ERC677/IERC677Receiver.sol";


// ERC20 token
// - Burnable
// - Snapshot
// - EIP712 - human readable signed messages
// - ERC677 - transfer and call - approve tokens and call a function on another contract in one transaction
contract WasderToken is ERC20Snapshot, AccessControl, EIP712Base {

    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    constructor(address to) ERC20("Wasder Token", "WAS") {
        _mint(to, 1000000000 * 10**18 ); //1,000,000,000 tokens

        _initializeEIP712("Wasder Token"); // domain

        _setupRole(DEFAULT_ADMIN_ROLE, to);

    }

    function burn(uint256 amount) public {
        require(hasRole(BURNER_ROLE, _msgSender()), "Caller is not a burner");
        
        _burn(msg.sender, amount);
    }

    function snapshot() public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "Caller is not a admin");

        _snapshot();
    }

    // ERC677 Transfer and call
    event Transfer(address indexed from, address indexed to, uint256 value, bytes data);

    /**
    * @dev transfer token to a contract address with additional data if the recipient is a contact.
    * @param _to The address to transfer to.
    * @param _value The amount to be transferred.
    * @param _data The extra data to be passed to the receiving contract.
    */
    function transferAndCall(address _to, uint _value, bytes memory _data)
        public
        returns (bool success)
    {
        super.transfer(_to, _value);
        emit Transfer(_msgSender(), _to, _value, _data);
        if (isContract(_to)) {
            IERC677Receiver receiver = IERC677Receiver(_to);
            receiver.onTokenTransfer(_msgSender(), _value, _data);
        }
        return true;
    }

    function isContract(address _addr) private view returns (bool hasCode)
    {
        uint length;
        assembly { length := extcodesize(_addr) }
        return length > 0;
    }

}