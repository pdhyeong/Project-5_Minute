const express = require('express');
const router = express.Router();
const User = require('../schemas/users');

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
        console.log(req.body);
        const user = await User.create({
            nickname: req.body.nickname,
            password: req.body.password,
            email: req.body.email,
            address: req.body.address,
            token_amount: req.body.token_amount,
            eth_amount: req.body.eth_amount,
            created_at: new Date(),
            problem_id : req.body.problem_id
        });
        console.log(user);
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
})
module.exports = router;