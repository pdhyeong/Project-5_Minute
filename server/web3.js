const express = require('express');
const Web3 = require('web3');
const Contract =  require("web3-eth-contract");
const axios = require("axios");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {erc20_abi} = require('./erc20_abi');
const {erc1155_abi}  = require('./erc1155_abi');


require('dotenv').config();

function getWeb3() {
    const web3 = new Web3(process.env.INFURAURL);
    return web3;
}
const web3 = new Web3(process.env.INFURAURL);

const getUserNFT = async (address) => {
    try{
        const nft = [];
        const Contract = web3.eth.Contract;
        const contract = new Contract(erc1155_abi,process.env.ERC1155_CA);

        for(let i=0;i<4;i++){
            const balance = await contract.methods.balanceOf(address,i);
            if(balance) {
                const response = await axios.get(`https://bafybeielwhdbjscrhmzo3fe6giwhm3kaemtkxjcululkk4ew3q4bbqvpay.ipfs.nftstorage.link/${i}.json`);
                nft.push(response.data);
            }
        }

        return nft;

    }catch(err){
        console.log(err);
    }
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
    },
    getBalanceOfERC20: async (address) => {
        try{
            const Contract = web3.eth.Contract;
            const contract = new Contract(erc20_abi,process.env.ERC20_CA);
            // console.log(contract);
    
            const balance = await contract.methods.balanceOf(address).call()
            console.log(balance);
            return balance;
        }catch(err){
            console.log(err);
        }
    },
    getUserNFT: async (address) => {
        try{
            const nft = [];
            const Contract = web3.eth.Contract;
            const contract = new Contract(erc1155_abi,process.env.ERC1155_CA);
    
            for(let i=0;i<4;i++){
                const balance = await contract.methods.balanceOf(address,i).call();
                console.log(balance);
                if(balance!=='0') {
                    const response = await axios.get(`https://bafybeielwhdbjscrhmzo3fe6giwhm3kaemtkxjcululkk4ew3q4bbqvpay.ipfs.nftstorage.link/${i}.json`);
                    nft.push(response.data);
                }
            }
    
            return nft;
    
        }catch(err){
            console.log(err);
        }
    },
    mintBatchNFTtoUser: async (address,nft_id)=>{
        try{
            console.log('mintBatchStart');
            const Contract = web3.eth.Contract;
            const contract = new Contract(erc1155_abi,process.env.ERC1155_CA);

            const account = process.env.SERVER_PUB_KEY;
            const privateKey = process.env.SERVER_PRIVATE_KEY;

            const transaction = await contract.methods.mintBatch(address,[nft_id],[1],[]);
            console.log(transaction);

            const options = {
                to      : transaction._parent._address,
                data    : transaction.encodeABI(),
                gas     : await transaction.estimateGas({from: account}),
                gasPrice: 500000000000,
            };

            const signed  = await web3.eth.accounts.signTransaction(options, privateKey);
            console.log(signed);

            const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
            console.log(receipt);
            return receipt;

        }
        catch(err){
            console.log(err);
        }
    }

}