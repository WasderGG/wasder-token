// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./IERC677Receiver.sol";

// mock class using ERC20
contract ERC677Mock is ERC20, IERC677Receiver {
    constructor (
        string memory name,
        string memory symbol,
        address initialAccount,
        uint256 initialBalance
    ) payable ERC20(name, symbol) {
        _mint(initialAccount, initialBalance);
    }

    //receive the ERC20 token
    event OnTokenTransferReceived(address _sender, uint _value, bytes _data);

    function onTokenTransfer(address _sender, uint _value, bytes memory _data) public override {
        emit OnTokenTransferReceived(_sender, _value, _data);
    }

    // function mint(address account, uint256 amount) public {
    //     _mint(account, amount);
    // }

    function burn(address account, uint256 amount) public {
        _burn(account, amount);
    }

    function transferInternal(address from, address to, uint256 value) public {
        _transfer(from, to, value);
    }

    function approveInternal(address owner, address spender, uint256 value) public {
        _approve(owner, spender, value);
    }
}