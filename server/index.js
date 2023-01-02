const express = require('express');
const port = 8080;
const app = express();
const cors = require('cors');

app.get('/',(req,res)=> {
    res.send("서버시작");
})
app.use(cors({
    origin: 'http://localhost:8081',
    credentials: true
}))
app.listen(port, () => {
    console.log('Example app listening on port');
})