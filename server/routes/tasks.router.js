const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


//GET
//get list from DB
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

//POST
//add task to database
router.post("/", (req, res) => {
    const newTask = req.body;
    const queryText = `INSERT INTO tasks ("task") VALUES ($1);`;
    pool.query(queryText, [newTask.task]).then((result) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('Error adding task to database', err);
        res.sendStatus(500);
      });
  });

//PUT route to update status
router.put("/:id", (req, res) => {
    const taskId = req.params.id;
    let queryText = `UPDATE "tasks" SET "status"='Done' WHERE id=$1;`;
    pool.query(queryText, [taskId]).then((result) => {
        console.log("Updated Task Status:", result.rowCount);
        res.sendStatus(200);
      }).catch((err) => {
        console.log("There was an error updating status", err);
        res.sendStatus(500);
      });
  });

//DELETE
router.delete("/:id", (req, res) => {
    console.log("Request URL: ", req.url);
    console.log("Request route parameters: ", req.params);
    const taskId = req.params.id;
    console.log(`Task ID is: ${taskId}`);
  
    // creates string to delete task
    const queryText = `DELETE FROM tasks WHERE id = $1`;
    pool.query(queryText, [taskId]).then((result) => {
        console.log("How many rows deleted:", result.rowsCount);
        res.sendStatus(200);
      }).catch((error) => {
        console.log(
          `ERROR!! could not delete task with id ${taskId}. Error: ${error}`);
        res.sendStatus(500);
      });
  });
  

module.exports = router;