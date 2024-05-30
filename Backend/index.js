const express = require('express');
const dataBaseConnect = require("./db");


const app = express();
const port = 5000;

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
})

app.get('/',(req,res)=>{
    res.send('Hello World!')
})
dataBaseConnect();

app.use(express.json());
app.use('/',require('./Routers/Routes'));
app.use('/',require('./Routers/DisplayData'));

app.listen(port,(req,res)=>{
    console.log(`app listening on port ${port}`)
})