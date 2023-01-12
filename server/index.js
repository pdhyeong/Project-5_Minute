const express = require('express');
require("dotenv").config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const Web3 = require("web3");
const cron = require("node-cron");
const pm2 = require('pm2');

const rpcURL = process.env.INFURAURL;
const web3 = new Web3(rpcURL);
const Contract = web3.eth.Contract;

//디비 연결
const connect = require("./schemas/connection");
connect();

let indexRouter = require('./routers/index');
let userRouter = require('./routers/users');
let postRouter = require('./routers/post');
let mypageRouter = require('./routers/mypage');

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

app.listen(PORT, () => {
    console.log("야무지게 돌아가는중");
});