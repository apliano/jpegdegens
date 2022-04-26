import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hello World", () => {
  it("should say hi", async () => {
    // 1. setup
    // 2. deploy our contract
    // 3. call our functions to test

    // 2.
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const hello = await HelloWorld.deploy();
    await hello.deployed();

    // 3.
    expect(await hello.hello()).to.equal("Hello, World");
  });
});
