const express = require('express');
const router = express.Router();
const Post = require('../schemas/post');
const User = require('../schemas/users');


router.get('/',async(req,res,next)=>{
    try {
        const showpost = await Post.find({});
        res.json(showpost);
    } catch (err) {
        console.error(err);
        next(err);
    }
})
router.post('/',async(req,res,next) => {
    let userinfo = await User.find({nickname : req.body.user_name});

    let profile_image;
    let user_name = req.body.user_name;
    let like = Math.floor(Math.random() * 1234567);
    let problem_name = req.body.problem_name;
    let title = req.body.title;
    let hash_title = req.body.hash_title;
    let content = req.body.content;
    let created_at = new Date();
    let address;


    if(userinfo){
        profile_image = userinfo[0].profile_image;
        address = userinfo[0].address;
    }
    else {
        profile_image = "";
        address = "";
    }
    try {
        if(finduser) {
        const postcontent = await Post.create({
            user_name: user_name,
            profile_image: profile_image,
            like: like,
            problem_name: problem_name,
            hash_title : hash_title,
            title: title,
            content: content,
            created_at : created_at,
            address : address
        });
        return res.status(201).json(postcontent);
        }
        else {
            return res.status(500).send("name parameter does not exist");
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.get('/serach', async (req,res,next) => {
    try {
        let problem_title = req.query.problem_title;
        if(problem_title){
            const showpost = await Post.find({"problem_title": `${problem_title}`});
            return res.json(showpost);
        }
        else {
            return res.status(500).send("Query parameter does not exist");
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/bookmark',async (req,res,next) => {
    let user_name = req.body.user_name;
    let postname = req.body.post_name;

    // 유저를 찾고 그 다음 포스트를 북마크 컬럼에 업데이트
    if(user_name && postname) {
        await User.update({"nickname": `${user_name}`},
        {$push: { bookmark : `${postname}`}}).then(res => {
            return res.status(200).send("성공");
        }).catch(err => {
            console.error(err);
            next(err);
            return res.status(500).send("실패영");
        });
    }
    else {
        return res.status(500).send("");
    }
})
router.get('/bookmark',async (req,res,next) => {
    let user_name = req.query.user_name;
    let result;
    let bookmarkdata;
    if(user_name){
        result = await User.find({"nickname": `${user_name}`});
        // nickname이 사용자와 같은 사람중
        let find = result[0].bookmark;
        console.log(find);
        // bookmark와 title이 같으면 결과 출력
        let query = find.map(e=>{return {title:e
        }});
        console.log(query);
        bookmarkdata = await Post.find({$or: query});
        return res.status(200).json(bookmarkdata);
    }
});
module.exports = router;