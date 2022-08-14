const mysql = require('mysql2');

module.exports = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'himadameen24',
    database: 'gracious_exam'
})