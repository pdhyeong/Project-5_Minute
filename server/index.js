const express = require('express');
require("dotenv").config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');


//디비 연결
const connect = require("./schemas/connection");
connect();

let indexRouter = require('./routers/index');
let userRouter = require('./routers/users');
let postRouter = require('./routers/post');
let mypageRouter = require('./routers/mypage');
let web3Router = require('./routers/web3connect');

const PORT = process.env.PORT || 8081;
const app = express();


// 바디 크기 지정
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: false }));
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(cookieParser());
app.use(morgan('dev'));


// router 구분
app.use('/',indexRouter);
app.use('/users',userRouter);
app.use('/post', postRouter);
app.use('/mypage', mypageRouter);
app.use('/web3',web3Router);

app.listen(PORT, () => {
    console.log("야무지게 돌아가는중");
});