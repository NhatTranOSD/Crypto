'use strict';

const fs = require('fs');
const Web3 = require("web3");
const Tx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/d5bdc7785f614353a3c3fb06ccf306e2'
));

const createAccount = async () => {
    return web3.eth.accounts.create();
}

const encryptPassword = async (privateKey, password) => {
    return web3.eth.accounts.encrypt(privateKey, password).crypto.mac;
}

const getTransactionCount = async (address) => {
    return web3.eth.getTransactionCount(address, 'latest');
}

const getBalance = async (address) => {
    return web3.eth.getBalance(address, 'latest');
}

const signTransaction = async (tx, privateKey) => {
    return web3.eth.accounts.signTransaction(tx, process.env.privateKey);
}

const sendSignedTransaction = async (rawTransaction) => {
    return web3.eth.sendSignedTransaction(rawTransaction)
        .on('receipt', function (receipt) {
            console.log(receipt);
        })
        .once('transactionHash', function (hash) { console.log(hash) })
        .once('receipt', function (receipt) { console.log(receipt) })
        .on('confirmation', function (confNumber) { console.log(confNumber) })
        .on('error', function (error) { console.log(error) })
        .then(function (receipt) {
            console.log(receipt);
        });;
}

const estimateGas = async (to, data) => {
    return web3.eth.estimateGas({
        to: to,
        data: data
    });
};

const getGasPrice = async () => {
    return web3.eth.getGasPrice();
};

module.exports = {
    createAccount,
    encryptPassword,
    getTransactionCount,
    getBalance,
    signTransaction,
    sendSignedTransaction,
    estimateGas,
    getGasPrice
}