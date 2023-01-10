const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const User = require('../schemas/users');


const rpcURL = process.env.INFURAURL;

const web3 = new Web3(rpcURL);

router.get('/',async(req,res,next) => {
    try{
        const users = await User.find({nickname: 'BtsJin'}); 
        return res.json(users[0].address);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.post('/',async (req,res,next) => {
    try{
        let account = web3.eth.accounts.create();
        console.log(account);
        const user = await User.create({
            nickname: req.body.nickname,
            profile_image: req.body.profile_image,
            password: req.body.password,
            email: req.body.email,
            address: account.address,
            created_at: new Date(),
            google_id : req.body.google_id
        });
        /*
        let answer = await getBalance(req.body.address).then((balance) => {
            return balance;
        });
        await User.insert({nickname : `${name}`}, {$push: {eth_amount : answer-10}});
        */

        return res.status(201).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
})
/*
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