const express = require('express');
const router = express.Router();
const Post = require('../schemas/post');
const User = require('../schemas/users');
const NFT = require('../schemas/nft');

// 유저정보
router.get('/',async (req,res,next) => {
    const name = req.query.name;
    try{
        const user = await User.find({nickname: `${name}`}); 
        //const mynft = await NFT.find({"nickname": `${name}`});
        return res.json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 내가 올린 post
router.get('/mypost',async (req,res,next) => {
    let user_name = req.query.user_name;
    const mypost = await Post.find({user_name : `${user_name}`});
    return res.status(200).json(mypost);
});

router.put('/changeprofile',async (req,res,next) => {
    
});
module.exports = router;