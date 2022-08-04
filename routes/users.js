const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/allusers', async (req, res) =>{
    try{
        const response = await db.promise().query("SELECT * FROM data_base2");
        console.log(response[0]);
        res.send(response[0]);
    }
    catch(err){
        res.status(400).json(err);
    }
})

router.get('/:user_id', async(req, res) => {
    try{
        // const response = await db.promise().query("SELECT * FROM data_base2 WHERE userid = ");
        const us_id = req.params.user_id;
        const response = await db.promise().query(`SELECT * FROM data_base2 WHERE userid= '${us_id}'`);
        console.log(response[0]);
        res.send(response[0]);
    }
    catch(err){
        res.status(400).json(err);
    }
})


module.exports = router;
