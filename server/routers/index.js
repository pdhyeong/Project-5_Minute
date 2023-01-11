const express = require("express");
const router = express.Router();
const Post = require('../schemas/post');
const Nft = require('../schemas/nft');

router.get("/", async (req,res,next) => {
    const count = req.query.count;
    let mainpage;
    if(count && count > 0){
        mainpage = await Post.aggregate([
            {$match: {"_id": {$exists: true}}},
            {$sort: {"created_at": -1}},
            {$limit: Number(count)}
        ]);
    }
    else {
        return res.status(500).send("invaild query");
    }
    if(mainpage) {
        return res.status(200).json(mainpage);
    }
    else {
        return res.status(500).send("post not exist");
    }
});
module.exports = router;