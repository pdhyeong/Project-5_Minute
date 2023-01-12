const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const User = require('../schemas/users');
const {createUserAddr,getBalanceOfERC20} = require('../web3')



router.get('/',async(req,res,next) => {
    try{
        let balance;
        const user = await User.find({"email":req.query.email}); 
        if(user.length)  {
            balance = await getBalanceOfERC20(user[0].address);
            await User.updateOne({"address": user[0].address},{ $set : {"token_amount":balance}});
            // await User.updateOne({"address": user[0].address},{ $set : {"profile_image": "https://lh3.googleusercontent.com/a/default-user=s96-c"}});
            user[0].token_amount = balance;
        }

        console.log(user);
        res.json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.post('/',async (req,res,next) => {
    console.log(req.body);
    try{
        const {address,salt,doubleHashedPassword,hashedPrivateKey} = await createUserAddr(req.body.password);
        console.log(address,salt,doubleHashedPassword,hashedPrivateKey);


        const user = await User.create({
            nickname: req.body.nickname,
            profile_image: req.body.picture,
            email: req.body.email,
            created_at: new Date(),
            token_amount: 0,
            google_id : req.body.email,
            address,
            salt,
            doubleHashedPassword,
            hashedPrivateKey,
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