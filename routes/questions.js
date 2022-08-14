const express = require('express');
const router = express.Router();
const db = require('../db');

//htpps:localhost:5001/questions/getquestion

router.get('/getquestion', async (req, res) => {
    try {
        const response = await db.promise().query("SELECT * FROM questions");
        console.log(response[0]);
        res.send(response[0]);
    }
    catch (err) {
        res.status(400).json(err);
    }
})

// https:localhost:5001/questions/getquestionbysubject/subjectid

router.get('/getquestionbysubject/:subjectid', async (req, res) => {
    try {
        const sub_id = req.params.subjectid;
        const response = await db.promise().query(`SELECT * FROM questions WHERE subjectid= '${sub_id}'`);
        console.log(response[0][0]);
        // res.send(response[0]);
        res.status(200).json(response[0][0]);
    }
    catch (err) {
        res.status(400).json(err);
    }
})

// https:localhost:5001/questions/searchquestion/quesid

router.get('/searchquestion/:quesid', async (req, res) => {
    try {
        const ques_id = req.params.quesid;
        const response = await db.promise().query(`SELECT * FROM questions WHERE quesid= '${ques_id}'`);
        console.log(response[0][0]);
        // res.send(response[0]);
        res.status(200).json(response[0][0]);
    }
    catch (err) {
        res.status(400).json(err);
    }
})

// https:localhost:5001/questions/getquestionbysubject/?subject=1&count=2
// ORDER BY RAND() --> to get random number/questions: 

router.get('/getquestionbysubject/', async (req, res) => {
    try {
        const subjectid = req.query.subject;
        const count = req.query.count;
        const response = await db.promise().query(`SELECT * FROM questions WHERE subjectid= '${subjectid}' ORDER BY RAND() LIMIT ${count} `);
        res.status(200).json(response[0]);
    }
    catch (err) {
        res.status(400).json(err);
    }
})


// https:localhost:5001/questions/addquestion:

router.post("/addquestion", async (req,res) => {
    try{
        const response = await db.promise().query
        (`INSERT INTO questions (subjectid, question, answer1, answer2, answer3, answer4, answer5, correctans
        ) VALUES ('${req.body.subjectid}', '${req.body.question}', 
        '${req.body.answer1}', '${req.body.answer2}', '${req.body.answer3}',
        '${req.body.answer4}','${req.body.answer5}', '${req.body.correctans}')`);

        res.status(201).json({message: 'Successfully created'});
    }
    catch(err){
        res.status(400).json(err);
    }
})

//https://localhost:5001/questions/editquestion

router.put('/editquestion', async (req,res) => {
    try{
        const response = await db.promise().query(`UPDATE questions SET 
        question = '${req.body.question}', answer1 = '${req.body.answer1}',
        answer2 = '${req.body.answer2}',answer3 = '${req.body.answer3}',answer4 = '${req.body.answer4}' ,
        answer5 = '${req.body.answer5}', correctans = '${req.body.correctans}'
        WHERE quesid = '${req.body.quesid}'`);
        res.status(200).json(response);
    }
    catch(err){
        res.status(400).json(err);
    }
})

// https:localhost:5001/questions/removequestion/quesid

router.delete("/removequestion/:quesid", async (req, res) => {
    try {
        const qu_id = req.params.quesid;
        const response = await db.promise().query(`DELETE FROM questions WHERE quesid = '${qu_id}' `);
        res.status(200).json(response[0]);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;