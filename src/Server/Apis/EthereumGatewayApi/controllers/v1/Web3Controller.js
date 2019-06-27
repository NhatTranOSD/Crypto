'use strict';

const fs = require('fs');
const Web3 = require("web3");
const Tx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/d5bdc7785f614353a3c3fb06ccf306e2'
));

const Web3Service = require('../../services/Web3Service');


let deplaycount = 0;

const getDeplay = () => {
    if (deplaycount === 10) deplaycount = 0;
    deplaycount++;
    return deplaycount;
}

const createAccount = async (req, res) => {
    try {
        var account = await Web3Service.createAccount();

        if (account) {

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
            req.query.privateKey === null) {
            res.json({ successed: false, result: null });
        }

        const from = req.query.from;
        const to = req.query.to;
        const value = req.query.value;
        const privateKey = req.query.privateKey;
        const gas = req.body.gas || 25000;
        const gasPrice = req.body.gasPrice || 20000000000;
        const data = req.body.data || '';

        await sleep(getDeplay()*1000);
        const nonce = await Web3Service.getTransactionCount(from);
        console.log('none: ', nonce);

        //sign transaction
        var tx = {
            nonce: web3.utils.toHex(nonce),
            to: to,
            value: web3.utils.toHex(value),
            gasLimit: web3.utils.toHex(gas),
            gasPrice: web3.utils.toHex(gasPrice),
            data: web3.utils.toHex(data)
        };

        const signedTransaction = await Web3Service.signTransaction(tx, privateKey);

        let returned = false;

        await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
            .once('transactionHash', function (hash) {
                console.log('transactionHash: ', hash);
            })
            .on('confirmation', function (confNumber, receipt) {
                // console.log('confirmation: ', confNumber, receipt);
                if (!returned) {
                    res.json({ successed: true, result: { transactionHash: receipt.transactionHash } });
                    returned = true;
                }
                return;
            })
            .on('error', function (error) {
                console.log('error: ', error);

                if (!returned) {
                    res.json({ successed: true, result: null });
                    returned = true;
                }

                return;
            })
            .then(function (receipt) {
                console.log(receipt);
            })
            .catch(err => console.log('error: ', err));

    } catch (e) {
        res.json({ successed: false, result: null });
    }
}

const sendToken = async (req, res) => {
    try {
        if (req.query.from === null ||
            req.query.to === null ||
            req.query.value === null ||
            req.query.privateKey === null) {
            res.json({ successed: false, result: null });
        }

        const from = req.query.from;
        const to = req.query.to;
        const value = req.query.value;
        const privateKey = req.query.privateKey;
        const gas = req.body.gas || 50000;
        const gasPrice = req.body.gasPrice || 20000000000;

        await sleep(getDeplay()*1000);
        const nonce = await Web3Service.getTransactionCount(from);
        console.log('none: ', nonce);

        // const balance = await Web3Service.getBalance(from);

        const abiArray = JSON.parse(fs.readFileSync('./ABI.json', 'utf-8'));

        const contract = web3.eth.Contract(abiArray, process.env.contractAddress, { from: from });

        const data = contract.methods.transfer(to, web3.utils.toHex(value)).encodeABI();

        var tx = {
            from: from,
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gas),
            to: process.env.contractAddress,
            value: web3.utils.toHex(0),
            data: data,
            nonce: web3.utils.toHex(nonce)
        }

        const signedTransaction = await Web3Service.signTransaction(tx, privateKey);

        let returned = false;

        await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
            .once('transactionHash', function (hash) {
                console.log('transactionHash: ', hash);
                // res.json({ successed: true, result: { transactionHash: hash } });
                // return;
            })
            .on('confirmation', function (confNumber, receipt) {
                // console.log('confirmation: ', confNumber);

                if (!returned) {
                    res.json({ successed: true, result: { transactionHash: receipt.transactionHash } });
                    returned = true;
                }
                return;
            })
            .on('error', function (error) {
                console.log('error: ', error);
                if (!returned) {
                    res.json({ successed: true, result: null });
                    returned = true;
                }
                return;
            })
            .then(function (receipt) {
                console.log('receipt', receipt);
            });

    } catch (e) {
        res.json({ successed: false, result: null });
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports.sendETHTransaction = sendETHTransaction;
module.exports.createAccount = createAccount;
module.exports.sendToken = sendToken;