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
  await counter.count();
  console.log('Counter: ', await counter.getCounter());
}

export async function deployCounter() {
  deploy().then(count);
}
