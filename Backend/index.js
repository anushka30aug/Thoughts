const express = require('express');
require('dotenv').config();
const main=require('./Connect');
var cors = require('cors');
var app = express();
const PORT=5000||process.env.PORT


app.use(cors())
main().then(()=>{
    console.log('connected to db');
})

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));
app.use('/api/forgetpassword' , require('./routes/recover'));


app.listen(PORT,()=>{
    console.log(`running on port  http://localhost:${PORT}`)
});