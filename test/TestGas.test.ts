import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Test Gas', () => {
  it('should do stuff', async () => {
    // 1. setup
    // 2. deploy our contract
    // 3. call our functions to test

    // 2.
    const Gas = await ethers.getContractFactory('TestGas');
    const gas = await Gas.deploy();
    await gas.deployed();

    // 3.
    for (let i = 0; i < 10; ++i) {
      await gas.test1();
      await gas.test2();
      await gas.test3();
      await gas.test4();
      await gas.test5();
    }
  });
});
