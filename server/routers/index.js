const express = require("express");
const router = express.Router();
const Post = require('../schemas/post');
const { getUserNFT } = require("../web3");

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
// nft 테이블을 유저와 연결되어있는데
router.get("/nft",async (req,res,next) => {
    const address = req.query.address;

    if(address){
        const nft = await getUserNFT(address);
        return res.status(200).json(nft);
    }
    else{
        return res.status(500).send('no address');
    }
    
});

router.post("/profileimg",async (req,res,next) => {
    console.log(req);

    
});
module.exports = router;