const express = require("express");
const router = express.Router();
const Post = require('../schemas/post');
const { getUserNFT } = require("../web3");
const User = require('../schemas/users');
const Nft = require('../schemas/nft');
const NFTdata = require('../../client/src/assets/NFTdata');

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

router.post("/postbuynft",async (req,res,next) => {
    const sender_info = await User.find({"address" : req.body.sender_address});
    const nft_id = req.body.nft_id;

    const sendtoken = sender_info[0].token_amount;
    try {
        if(sendtoken > 0 && NFTdata[nft_id].price < sendtoken){
            //await User.updateOne({"address": req.body.sender_address},{ $inc : {"token_amount": -1 *  NFTdata[nft_id].price}}); 
            //await User.updateOne({"address": req.body.recipient_address},{ $inc : {"token_amount": NFTdata[nft_id].price}}); 
            await Nft.update(
                {'nft_id':nft_id},
               {$push:
                   {'owner_address': {
                       "user_address" : req.body.recipient_address,}}});
            return res.status(200).send("Success");
        }
        else {
            return res.status(500).send("you don't have enough token left");
        }
    } catch (err) {
        console.log(err);
        return err;
    }
})

router.post("/profileimg",async (req,res,next) => {
    console.log(req);

    
});
module.exports = router;