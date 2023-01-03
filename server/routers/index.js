const express = require("express");
const router = express.Router();

router.get("/", async (req,res,next) => {
    try{
        res.status(200).send("Hi");
    }
    catch (e) {
        throw Error(e);
    }
});


module.exports = router;