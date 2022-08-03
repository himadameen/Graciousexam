const express = require('express');
const cors = require('cors');
// require("dotenv").config({ path: ".env" })
const usersRoute = require('./routes/users');


const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    try{
        res.send("app is running");
        console.log("server is started");
    }
    catch(err){
        res.status(400).json(err);
    }
})

app.use('/users', usersRoute)

app.listen(5000);
// app.listen(process.env.APP_PORT);
