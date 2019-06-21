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
            }

            res.json(result);
        }
        catch (e) {
            res.json({ successed: false, result: null });
        }
        finally {
        }
    },

    sendSignedTransaction: (req, res) => {
        try {
            const from = req.body.from;
            const to = req.body.to;
            const value = req.body.value;
            const gas = req.body.gas;

            web3.eth.defaultAccount = from;

            web3.eth.getTransactionCount("0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe").then(console.log);

            let myBalanceWei = web3.eth.getBalance(from, 'latest');
            console.log('myBalanceWei:', myBalanceWei);

            const privateKey = new Buffer('9C1204822D02E2D646FAB8B569E39A4DE30E64AD72436FF196AEC9F4B8A900CA', 'hex')

            const rawTx = {
                nonce: nonce,
                gasPrice: '0x09184e72a000',
                gasLimit: '0x2710',
                to: 'from',
                value: '0xA',
            }

            const tx = new Tx(rawTx);
            tx.sign(privateKey);

            web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
                .on('receipt', console.log);

            res.json({ successed: true, result: null });
        }
        catch (e) {
            res.json({ successed: false, result: null });
        }
        finally {
        }
    },

    estimateGas: (req, res) => { },

    sendRawTransaction: (req, res) => { },
};
