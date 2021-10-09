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

router.post('/', (req, res) => {
    let task = req.body;
    console.log('adding new task of:', task.description);
    const queryText = `INSERT INTO "tasks" ("taskInfo") VALUES ($1);`;
    pool.query(queryText, [task.description]).then( result => {
        res.sendStatus(201);
    }).catch( err => {
        console.log('error in adding task to database', err);
        res.sendStatus(500);
    })
});
router.put('/:id', (req, res) => {
    let id = req.params.id;
    console.log(`Ready to complete task of id=${id}`);
    const queryText = `UPDATE "tasks" SET "complete" = 'true' WHERE id=$1;`;
    pool.query(queryText, [id])
    .then( result => {   
        res.sendStatus(200);
    })
    .catch( err => {
        console.log('error from db', err);
        res.sendStatus(500);
    })
});





module.exports = router;