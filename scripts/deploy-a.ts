import '@nomiclabs/hardhat-ethers';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';

async function deploy(name: string, ...args: unknown[]) {
  const FallbackContract = await ethers.getContractFactory(name);
  const fallback = await FallbackContract.deploy(...args);
  await fallback.deployed();

  return fallback;
}

async function printStorage(contract: Contract, name: string, count: number) {
  for (let i = 0; i < count; i++) {
    console.log(
      name,
      i,
      await ethers.provider.getStorageAt(contract.address, i),
    );
  }
}

export async function fallback() {
  const a = await deploy('A');
  const b = await deploy('B', a.address);

  // printStorage will print 4 memory slots, but pay attention as just the 2 first ones have data
  // Slot 0: variable b (256 bits)
  // Slot 1: variables c (8 bits), d(8 bits) and address (160 bits)
  await printStorage(b, 'B', 3);
  console.log('---------------------');

  console.log('Get A', await a.getA());
  console.log('Get B', await b.getB());
  console.log('---------------------');

  await a.setA(0x45);
  console.log('Get A', await a.getA());
  console.log('Get B', await b.getB());
  console.log('---------------------');
  await printStorage(a, 'A', 3);

  await b.setB(0x46);
  console.log('Get A', await a.getA());
  console.log('Get B', await b.getB());
  console.log('---------------------');

  await printStorage(b, 'B', 3);
}
