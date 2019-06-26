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
    return web3.eth.getTransactionCount(address);
}

const getBalance = async (address) => {
    return web3.eth.getBalance(address);
}

const signTransaction = async (tx, privateKey) => {
    return web3.eth.accounts.signTransaction(tx, privateKey);
}

const sendSignedTransaction = async (rawTransaction) => {
    return web3.eth.sendSignedTransaction(rawTransaction);
}

const estimateGas = async (to, data) => {
    return web3.eth.estimateGas({
        to: to,
        data: data
    }).then(console.log);;
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