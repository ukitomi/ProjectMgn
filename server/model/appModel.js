'user strict';

var sql = require('./db.js');

// Task object constructor
var Task = function(task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

// Create a new task
Task.createTask = function (newTask, result) {
    // sql query & error handling
    // set ? as newTask, which contains task, status and created_at 
    // this has to match the database task object's configuration
    sql.query("INSERT INTO tasks set ?", newTask, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            // if added successfully, print the id of the inserted row
            console.log(res.insertId);
            result(null, res.insertId); 
        }
    })
}

// Get a task by id
Task.getTaskById = function (taskId, result) {
    sql.query("SELECT task from tasks where id = ? ", taskId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            // if added successfully, print the id of the inserted row
            console.log(res);
        }
    });
}

// Get all tasks
Task.getAllTask = function (result) {
    sql.query("SELECT * from tasks", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, error);
        }
        else {
            console.log('task: ', res);
            result(null, res);
        }
    })
}

// Update by Id
Task.updateById = function(id, task, result) {
    sql.query("UPDATE tasks SET task = ? WHERE id = ? ", [task.task, id], function(err, res) {
        if (err) {
            console.log("erorr: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    })
}

// Delete a task
Task.remove = function(id, result) {
    sql.query("DELETE FROM tasks WHERE id = ? ", [id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    })
}

module.exports = Task;