const express = require('express');
const Web3 = require('web3');
const Contract =  require("web3-eth-contract");
const axios = require("axios");
require('dotenv').config();

function getWeb3() {
    const web3 = new Web3("http://127.0.0.1:7545");
    return web3;
}

module.exports = {
    getAccounts: async () => {
        try {
            const account = await getWeb3().eth.getAccounts();
            return account;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    getBalance : async (address) => {
        try {
            const balance = await getWeb3().eth.getAccounts(address);
            return balance;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    getGasPrice:  async () => {
        try {
            const gasPrice = await getWeb3().eth.getGasPrice();
            return gasPrice;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}