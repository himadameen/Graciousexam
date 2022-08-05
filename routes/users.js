// const express = require('express');
// const router = express.Router();
// const db = require('../db');


// router.get('/allusers', async (req, res) => {
//     try {
//         const response = await db.promise().query("SELECT * FROM data_base");
//         console.log(response[0]);
//         res.send(response[0]);
//     }
//     catch (err) {
//         res.status(400).json(err);
//     }
// })

// router.get('/:user_id', async (req, res) => {
//     try {
//         const us_id = req.params.user_id;
//         const response = await db.promise().query(`SELECT * FROM data_base WHERE userid= '${us_id}'`);
//         console.log(response[0]);
//         res.send(response[0]);
//     }
//     catch (err) {
//         res.status(400).json(err);
//     }
// })


// router.post("/get_user", async (req, res) => {

//     try {
//         const user = req.body.name;
//         const response = await db.promise().query(`SELECT  *  FROM users WHERE name = '${user}'`);
//         res.status(200).json(response[0]);
//     }
//     catch (err) {
//         res.status(400).json(err);
//     }
// });


// router.delete("/delete_user", async (req, res) => {

//     try {
//         const user = req.body.name;
//         const response = await db.promise().query(`DELETE  FROM users WHERE username = '${user}'`);
//         res.status(200).json(response[0]);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });


// module.exports = router;
