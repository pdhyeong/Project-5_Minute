const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const User = require('../schemas/users');


const rpcURL = process.env.INFURAURL;

const web3 = new Web3(rpcURL);

router.get('/',async(req,res,next) => {
    try{
        const users = await User.find({}); 
      res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.post('/',async (req,res,next) => {
    try{
        let account = web3.eth.accounts.create();
        const user = await User.create({
            nickname: req.body.nickname,
            profile_image: "https://pixabay.com/ko/photos/%eb%85%b8%ed%8a%b8%eb%b6%81-%ec%97%ac%ec%84%b1-%ea%b5%90%ec%9c%a1-%ea%b3%b5%eb%b6%80%ed%95%98%eb%8b%a4-3087585/",
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
module.exports = router;