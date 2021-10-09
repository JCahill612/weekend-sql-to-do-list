const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "tasks" ORDER BY "id";`;
    pool.query(queryText).then( result => {
        console.log('Current tasks', result);
        let taskList = result.rows;
        res.send(taskList)
    }).catch( err => {
        console.log('error in database get', err);
        res.sendStatus(500);
    })
});


module.exports = router;