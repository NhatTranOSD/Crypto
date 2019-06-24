'use strict';

const Web3 = require("web3");
const Tx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/d5bdc7785f614353a3c3fb06ccf306e2'
));

module.exports = {

    // Create new account
    createAccount: (req, res) => {
        try {
            var account = web3.eth.accounts.create();

            const result = {
                successed: true,
                result: {
                    address: account.address,
                    privateKey: account.privateKey
                }
            };

            res.json(result);
        } catch (e) {
            res.json({ successed: false, result: null });
        }
    },

    sendSignedTransaction: (req, res) => {
        try {
            if (req.body.to === null ||
                req.body.value === null ||
                process.env.adminAddress === null ||
                process.env.privateKey === null) {
                res.json({ successed: false, result: null });
            }

            const to = req.body.to;
            const value = req.body.value;
            const gas = req.body.gas || '21000';
            const gasPrice = req.body.gasPrice || '4000000000';
            const data = req.body.data || '';

            var nonce;
            var balance;
            var rawTransaction;

            web3.eth.getTransactionCount(process.env.adminAddress, 'latest').then(function(nonce) {
                nonce = nonce;
                console.log('nonce: ', nonce);
            }).catch(function(e) {
                console.log(e);
            });

            web3.eth.getBalance(process.env.adminAddress, 'latest').then(function(balance) {
                balance = balance;
                console.log('balance: ', balance);
                if (+value > balance - +gas * +gasPrice) {
                    res.json({ successed: false, result: null });
                }
            }).catch(function(e) {
                console.log(e);
            });

            //sign transaction
            var tx = {
                to: to,
                value: value,
                gas: gas,
                gasPrice: gasPrice,
                data: data
            };

            web3.eth.accounts.signTransaction(tx, process.env.privateKey).then(function(data) {
                console.log('rawTransaction result: ', data);
                rawTransaction = data.rawTransaction;

                web3.eth.sendSignedTransaction(rawTransaction)
                    .on('receipt', function(data) {
                        console.log('receipt', data);
                    })
                    .catch(function(e) {
                        console.log(e);
                    });
            });


            res.json({ successed: true, result: { rawTransaction: rawTransaction } });
        } catch (e) {
            res.json({ successed: false, result: null });
        }
    },

    estimateGas: (req, res) => {},

    sendRawTransaction: (req, res) => {

    },
};