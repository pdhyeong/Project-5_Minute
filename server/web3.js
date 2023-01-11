const express = require('express');
const Web3 = require('web3');
const Contract =  require("web3-eth-contract");
const axios = require("axios");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

require('dotenv').config();

function getWeb3() {
    const web3 = new Web3(process.env.INFURAURL);
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
    },

    createUserAddr : async (password) =>{
        const web3 = new Web3(process.env.INFURAURL);
        try{

            const {address, privateKey} = await web3.eth.accounts.create();
            const salt = crypto.randomBytes(128).toString('base64');
            const hashedPassword = crypto
              .createHash('sha512')
              .update(password + salt)
              .digest('hex');
            
            const doubleHashedPassword = crypto
            .createHash('sha512')
            .update(password)
            .digest('hex');

            const hashedPrivateKey =  jwt.sign(privateKey,hashedPassword);
    
            //db에 address, salt, doubleHashedPassword, hashedPrivateKey 저장
            
            return {address,salt,doubleHashedPassword,hashedPrivateKey}; 
        }
        catch(err){
            console.log(err);
            return err;
        }
    }
}