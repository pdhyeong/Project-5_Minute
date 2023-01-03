const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const env = require("dotenv").config();

//디비 연결
const connect = require("./schemas/connection");
connect();

let indexRouter = require('./routers/index');
let userRouter = require('./routers/users');

const PORT = process.env.PORT || 8080;
const app = express();


// 바디 크기 지정
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: false }));
app.use(cors({
    origin: 'http://localhost:8081',
    credentials: true
}));
app.use(cookieParser());


app.use('/',indexRouter);
app.use('/users',userRouter);


app.listen(PORT, () => {
    console.log("Hello world");
});