import logo from './logo.svg';
import './App.css';
import { Web3 } from 'web3';
import { useState } from 'react';

//constants
const ADDRESS = "0x4a93cd60c9688C80F9243153adfDc47f833e7bb4";
const ABI = [{"inputs":[{"internalType":"uint256","name":"startingPoint","type":"uint256"},{"internalType":"string","name":"startingMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"decreasingNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increasingNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}]

function App() {
  const [counter,setCounter] = useState('none');
  const web3 = new Web3(window.ethereum);
  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  //reading functions
async function getNumber() {
  const result = await myContract.methods.getNumber().call()
  setCounter(result.toString());
}

//writing functions
async function increasingNumber() {
  const accountConnected = await web3.eth.requestAccounts();
  //increasing function
  const Transaction = await myContract.methods.increasingNumber().send({ from: accountConnected[0] });
  console.log(Transaction);
  getNumber();
}

async function decreasingNumber() {
  const accountConnected = await web3.eth.requestAccounts();
  //decreasing function
  const Transaction = await myContract.methods.decreasingNumber().send({ from: accountConnected[0] });
  console.log(Transaction);
  getNumber();
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getNumber}>Get Current Counter</button><br />
        <button onClick={increasingNumber}>Increase Counter</button><br />
        <button onClick={decreasingNumber}>Decrease Counter</button><br />
        <p>Counter: {counter}</p>
      </header>
    </div>
  );
}

export default App;