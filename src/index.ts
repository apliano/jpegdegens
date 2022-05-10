import './styles.css';
import { Contract, ethers } from 'ethers';

function getEth() {
  const eth = window.ethereum;
  if (!eth) {
    throw new Error('No ethereum found. Get metamask');
  }
  return eth;
}

async function hasAccounts() {
  const ethereum = getEth();
  const accounts = (await ethereum.request({
    method: 'eth_accounts',
  })) as string[];
  return accounts && accounts.length;
}

async function requestAccounts() {
  const ethereum = getEth();
  const accounts = (await ethereum.request({
    method: 'eth_requestAccounts',
  })) as string[];
  return accounts && accounts.length;
}

async function contractWithSanityChecks(
  contract: string | undefined,
): Promise<string> {
  if (!contract) {
    throw new Error('Missing contract address');
  }

  if (!(await hasAccounts()) && !(await requestAccounts())) {
    throw new Error('No accounts available');
  }

  return contract;
}

async function runHello() {
  const contractHelloAddress = await contractWithSanityChecks(
    process.env.CONTRACT_HELLO_ADDRESS,
  );

  const helloContract = new ethers.Contract(
    contractHelloAddress,
    ['function hello() public pure returns(string memory)'],
    new ethers.providers.Web3Provider(getEth()),
  );

  console.log('Hello World contract retrieved, mate');
  document.getElementById('hello-world')!.innerHTML =
    await helloContract.hello();
}

async function runCounter() {
  const contractCounterAddress = await contractWithSanityChecks(
    process.env.CONTRACT_COUNTER_ADDRESS,
  );

  const counterContract = new ethers.Contract(
    contractCounterAddress,
    [
      'function count() public',
      'function getCounter() public view returns (uint32)',
    ],
    new ethers.providers.Web3Provider(getEth()),
  );

  console.log('Counter contract retrieved, mate');
  document.getElementById('counter')!.innerHTML =
    await counterContract.getCounter();
}

runHello();
runCounter();
