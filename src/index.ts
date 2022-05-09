import { ethers } from 'ethers';

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

async function run() {
  const address = process.env.CONTRACT_ADDRESS ?? '';
  console.log('Contract address: ', address);

  if (!(await hasAccounts()) && !(await requestAccounts())) {
    throw new Error('No accounts available');
  }

  const hello = new ethers.Contract(
    address,
    ['function hello() public pure returns(string memory)'],
    new ethers.providers.Web3Provider(getEth()),
  );
  document.body.innerHTML = await hello.hello();
}

run();
