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
            profile_image: "https://pixabay.com/ko/photos/%eb%85%b8%ed%8a%b8%eb%b6%81-%ec%97%ac%ec%84%b1-%ea%b5%90%ec%9c%a1-%ea%b3%b5%eb%b6%80%ed%95%98%eb%8b%a4-3087585/",
            password: req.body.password,
            email: req.body.email,
            address: req.body.address,
            bookmark: req.body.bookmark,
            token_amount: 100,
            eth_amount: 100,
            created_at: new Date(),
            problem_name : req.body.problem_name,
            google_id : req.body.google_id
        });
        console.log(user);
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
})
module.exports = router;