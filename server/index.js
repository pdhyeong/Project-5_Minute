const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');



const port = 8080;
const app = express();


// 바디 크기 지정
app.use(express.json({limit: '100mb'}));
app.use(cors({
    origin: 'http://localhost:8081',
    credentials: true
}));
// 쿠키 관련 설정
app.use(cookieParser());

// 기본 값 반환
app.get('/',(req,res)=> {
    res.send("요청 성공");
});

app.listen(port, () => {
    console.log('Example app listening on port');
});