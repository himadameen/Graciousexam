const express = require('express');
const router = express.Router();
const db = require('../db');

// https:localhost:5001/users/alluser

router.get('/allusers', async (req, res) => {
    try {
        const response = await db.promise().query("SELECT * FROM users");
        console.log(response[0]);
        res.send(response[0]);
    }
    catch (err) {
        res.status(400).json(err);
    }
})

// https:localhost:5001/users/:id

router.get('/:userid', async (req, res) => {
    try {
        const us_id = req.params.userid;
        const response = await db.promise().query(`SELECT * FROM users WHERE userid= '${us_id}'`);
        console.log(response[0]);
        // res.send(response[0]);
        res.status(200).json(response);
    }
    catch (err) {
        res.status(400).json(err);
    }
})

// 2nd method using query ::

// https:localhost:5001/users/finduser/:id

router.get('/finduser/:userid', async (req, res) => {
    try {
        const us_id = req.query.userid;
        const response = await db.promise().query(`SELECT name,email,username FROM users WHERE userid= '${us_id}'`);
        // console.log(response[0]);
        // res.send(response[0]);
        res.status(200).json(response[0]);
    }
    catch (err) {
        res.status(400).json(err);
    }
})

// https:localhost:5001/users/get_user

router.post("/get_user", async (req, res) => {

    try {
        const user = req.body.name;
        const response = await db.promise().query(`SELECT  *  FROM users WHERE name = '${user}' `);
        res.status(201).json(response[0]);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

// https:localhost:5001/users/adduser:

router.post("/adduser", async (req,res) => {
    try{
        const tempid = 'id' + parseInt(Math.random() * 10000000);
        const response = await db.promise().query
        (`INSERT INTO users (userid, username, name, email, password, status, mobile, usertype
        ) VALUES ('${tempid}','${req.body.username}', '${req.body.name}', 
        '${req.body.email}', '${req.body.password}', '${req.body.status}',
        '${req.body.mobile}','${req.body.usertype}')`);

        const response2 = await db.promise().query (`SELECT * FROM users WHERE username = '${req.body.username}'`);
        res.status(201).json(response2[0]);
    }
    catch(err){
        res.status(400).json(err);
    }
})

// https:localhost:5001/users/login

router.post("/login", async (req,res) => {
    try{
        const response2 = await db.promise().query (`SELECT * FROM users WHERE username = '${req.body.username}'`);
        if(response2[0].length > 0){
            if(response2[0][0].password === req.body.password){
                res.status(202).json({message: 'successfully logged in'});
            }
            else{
                res.status(401).json({message: 'Incorrect Authorize'});
            }
        }
        else{
            res.status(422).json({message: 'User Not Found'});
        }
        res.status(201).json(response2[0]);
    }
    catch(err){
        res.status(400).json(err);
    }
})

// https:localhost:5001/users/update

router.put('/update', async (req, res) => {
    try{
        const response = await db.promise().query(`UPDATE users SET name = '${req.body.name}' , mobile = '${req.body.mobile}',
        email = '${req.body.email}', password = '${req.body.password}', WHERE username = '${req.body.username}' `);
        res.status(200).json(response);
    }
    catch(err){
        res.status(400).json(err);
    }
})

// 2nd method:

// router.put('/update', async (req,res) => {
//     try{
//         const response = await db.promise().query(`UPDATE users SET password = '${req.body.password}'
//         WHERE username = '${req.body.username}'`);
//         res.status(200).json(response);
//     }
//     catch(err){
//         res.status(400).json(err);
//     }
// })

// https:localhost:5001/users/delete_user

router.delete("/delete_user", async (req, res) => {
    try {
        const user = req.body.name;
        const response = await db.promise().query(`DELETE  FROM users WHERE username = '${user}'`);
        res.status(200).json(response[0]);
    } catch (err) {
        res.status(400).json(err);
    }
});

// https:localhost:5001/users/remove_user/:id

router.delete("/remove_user/:userid", async (req, res) => {
    try {
        const user = req.params.userid;
        const response = await db.promise().query(`DELETE  FROM users WHERE userid = '${user}'`);
        res.status(200).json(response[0]);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;
