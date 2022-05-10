// SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    // Using uint32 so the output is not a BigNumber
    uint32 counter;

    function count() public {
        counter++;
        console.log("Counter is now: ", counter);
    }

    function getCounter() public view returns (uint32) {
        return counter;
    }
}