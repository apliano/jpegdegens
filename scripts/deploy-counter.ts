import '@nomiclabs/hardhat-ethers';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';

async function deploy() {
  const Counter = await ethers.getContractFactory('Counter');
  const counter = await Counter.deploy();
  await counter.deployed();

  return counter;
}

async function count(counter: Contract) {
  console.log('Counter: ', await counter.count());
}

export async function deployCounter() {
  deploy().then(count);
}
