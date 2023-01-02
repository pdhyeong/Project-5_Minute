const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const port = 8080;
const app = express();


// 바디 크기 지정
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: false }));
app.use(cors({
    origin: 'http://localhost:8081',
    credentials: true
}));
app.use(cookieParser());

app.get('/',(req,res)=> {
    res.send("요청 성공");
});

app.listen(port, () => {
    console.log('Example app listening on port');
});