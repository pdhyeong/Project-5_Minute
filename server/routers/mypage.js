const express = require('express');
const router = express.Router();
const Post = require('../schemas/post');

router.get('/',async (req,res,next) => {
    const name = req.query.name;
    try{
        const mypost = await Post.find({"user_name": `${name}`}); 
        res.json(mypost);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;