// SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface IFallback {
    function count() external;
}

contract Fallback {
    function foo() internal view {
        console.log("Hello, Fallback!");
    }

    fallback() external payable {
        console.log("Fallback");
        foo();
        revert("Joke's on you");
    }
}