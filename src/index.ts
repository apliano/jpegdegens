import './styles.css';
import { ethers } from 'ethers';
import Counter from '../artifacts/contracts/Counter.sol/Counter.json';
import HelloWorld from '../artifacts/contracts/HelloWorld.sol/HelloWorld.json';

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

async function getContractWithSanityChecks(
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
  const contractHelloAddress = await getContractWithSanityChecks(
    process.env.CONTRACT_HELLO_ADDRESS,
  );

  const helloContract = new ethers.Contract(
    contractHelloAddress,
    HelloWorld.abi,
    new ethers.providers.Web3Provider(getEth()),
  );

  console.log('Hello World contract retrieved, mate');

  const helloEl = document.createElement('div');
  helloEl.innerHTML = await helloContract.hello();

  document.getElementById('hello-world')!.append(helloEl);
}

async function runCounter() {
  const contractCounterAddress = await getContractWithSanityChecks(
    process.env.CONTRACT_COUNTER_ADDRESS,
  );

  const counterContract = new ethers.Contract(
    contractCounterAddress,
    Counter.abi,
    new ethers.providers.Web3Provider(getEth()).getSigner(),
  );

  console.log('Counter contract retrieved, mate');

  async function setCounter() {
    counterEl.innerHTML = await counterContract.getCounter();
  }

  const counterEl = document.createElement('div');
  setCounter();

  const buttonEl = document.createElement('button');
  buttonEl.innerText = 'Increase Counter';
  buttonEl.onclick = async function () {
    await counterContract.count();
  };

  // Using the event CounterInc to update the Counter info
  counterContract.on(counterContract.filters.CounterInc(), setCounter);

  document.getElementById('counter')!.append(counterEl, buttonEl);
}

runHello();
runCounter();
