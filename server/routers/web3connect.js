const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const User = require('../schemas/users');
const {} = require('../web3');

const rpcURL = process.env.INFURAURL;

const web3 = new Web3(rpcURL);

router.post('/',async (req,res,next) => {

});

/*
function getWeb3() {
    const web3 = new Web3("http://127.0.0.1:7545");
    return web3;
}

async function getAccount() {
    try {
        const accounts = await getWeb3().eth.getAccounts();
        return accounts;
    } catch (err) {
        console.log(err);
        return err;
    }
}
async function getBalance(address) {
    try {
        const balance = await getWeb3().eth.getBalance(address);
        return balance
    } catch (err) {
        console.log(err);
        return err;
    }
}
router.get('/',async (req,res,next) => {
    let user_name = req.query.user_name;
    let address;
    try{
        const result = await User.find({"nickname" : `${user_name}`}); 
        address = result[0].address;
        /* 주소 확인하기
        user_account = await getAccount().then(account => {
            return String(account[0]);
        });
        let answer = await getBalance(address).then((balance) => {
            return balance;
        });
        console.log(answer);
        res.send(answer);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
// 최대 이더량 보내기

router.put('/',async (req,res,next) => {
    let name = req.query.user_name;
    let address;
    console.log(name);
    try {
        const result = await User.find({"nickname" : `${name}`}); 
        address = result[0].address;
        let answer = await getBalance(address).then((balance) => {
            return balance;
        });
        await User.update({nickname : `${name}`}, {$push: {eth_amount : answer-10}});
    } catch (e) {
        console.log(e);
        next(e);
    }
})*/
module.exports = router;