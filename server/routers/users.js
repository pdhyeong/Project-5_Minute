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
        const user = await User.create({

        });

        console.log(user);
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;