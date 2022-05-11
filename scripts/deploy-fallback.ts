import '@nomiclabs/hardhat-ethers';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';

async function deploy() {
  const FallbackContract = await ethers.getContractFactory('Fallback');
  const fallback = await FallbackContract.deploy();
  await fallback.deployed();

  return fallback;
}

async function count(fallback: Contract) {
  // Hackity Hack to make hardhat believe that f has a count function
  const f = await ethers.getContractAt('IFallback', fallback.address);
  await f.count();
}

export async function deployFallback() {
  deploy().then(count);
}
