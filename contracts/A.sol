// SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Storage.sol";

contract A {
    AppStorage s;

    function setA(uint a) public {
        s.a = a;
    }

    function getA() public view returns (uint) {
        return s.a;
    }
}

contract B {
    AppStorage s;

    constructor(address _A) {
        s.A = _A;

        s.b = 4;
        s.c = 0x45;
        s.d = 0x69;
    }

    function setB(uint b) public {
        s.b = b;

        (bool success, bytes memory whatever) = s.A.delegatecall(
            abi.encodeWithSignature("setA(uint256)", b + 1)
        );

        console.log("success", success);
    }


    function getB() public view returns (uint) {
        return s.b;
    }
}