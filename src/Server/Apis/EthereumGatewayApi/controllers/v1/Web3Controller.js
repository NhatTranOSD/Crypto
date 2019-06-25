'use strict';

const fs = require('fs');
const Web3 = require("web3");
const Tx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/d5bdc7785f614353a3c3fb06ccf306e2'
));

const Web3Service = require('../../services/Web3Service');

const createAccount = async (req, res) => {
    try {
        var account = await Web3Service.createAccount();

        if (account) {

            const privateKey = await Web3Service.encryptPassword(account.privateKey, 'test');
            let result = {
                successed: true,
                result: {
                    address: account.address,
                    privateKey: account.privateKey
                }
            }

            res.json(result);
        } else {
            res.json({ successed: false, result: null });
        }
    } catch (e) {
        res.json({ successed: false, result: null });
    }
}

const sendETHTransaction = async (req, res) => {
    try {
        if (req.query.from === null ||
            req.query.to === null ||
            req.query.value === null ||
            req.query.privateKey === null ||
            process.env.adminAddress === null) {
            res.json({ successed: false, result: null });
        }

        const from = req.query.from;
        const to = req.query.to;
        const value = req.query.value;
        const privateKey = req.query.privateKey;
        const gas = req.body.gas || '21000';
        const gasPrice = req.body.gasPrice || '20000000000';
        const data = req.body.data || '';

        const nonce = await Web3Service.getTransactionCount(from);

        const balance = await Web3Service.getBalance(from);

        //sign transaction
        var tx = {
            nonce: nonce,
            to: to,
            value: value,
            gas: gas,
            gasPrice: gasPrice,
            data: data
        };

        const signedTransaction = await Web3Service.signTransaction(tx, privateKey);

        Web3Service.sendSignedTransaction(signedTransaction.rawTransaction);

        res.json({ successed: true, result: { transactionHash: signedTransaction.transactionHash } });

    } catch (e) {
        res.json({ successed: false, result: null });
    }
}

const sendToken = async (req, res) => {
    try {
        if (req.query.from === null ||
            req.query.to === null ||
            req.query.value === null ||
            req.query.privateKey === null ||
            process.env.adminAddress === null) {
            res.json({ successed: false, result: null });
        }

        const from = req.query.from;
        const to = req.query.to;
        const value = req.query.value;
        const privateKey = req.query.privateKey;
        const gas = req.body.gas || '250000';
        const gasPrice = req.body.gasPrice || '10000000000';

        const nonce = await Web3Service.getTransactionCount(from);

        const balance = await Web3Service.getBalance(from);

        const abiArray = JSON.parse(fs.readFileSync('ABI.json', 'utf-8'));

        const contract = web3.eth.Contract(abiArray, process.env.contractAddress, { from: from });

        const data = contract.methods.transfer(to, value).encodeABI();

        var tx = {
            from: from,
            gasPrice: gasPrice,
            gasLimit: gas,
            to: process.env.contractAddress,
            value: "0",
            data: data,
            nonce: nonce
        }

        const signedTransaction = await Web3Service.signTransaction(tx, privateKey);

        Web3Service.sendSignedTransaction(signedTransaction.rawTransaction);

        res.json({ successed: true, result: { transactionHash: signedTransaction.transactionHash } });

    } catch (e) {
        res.json({ successed: false, result: null });
    }
}

module.exports.sendETHTransaction = sendETHTransaction;
module.exports.createAccount = createAccount;
module.exports.sendToken = sendToken;