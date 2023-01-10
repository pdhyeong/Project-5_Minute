const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const User = require('../schemas/users');
const {createUserAddr} = require('../web3')


const rpcURL = process.env.INFURAURL;

const web3 = new Web3(rpcURL);

router.get('/',async(req,res,next) => {
    try{
        
        const users = await User.find({"email":req.query.email}); 
        console.log(users);
        res.json(users);
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
module.exports = router;