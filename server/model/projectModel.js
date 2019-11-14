'user strict';

var sql = require('./db.js');

var Project = function(project) {
    this.title = project.title;
    this.description = project.description;
    this.deadline = project.deadline;
    this.created_at = new Date();
}

// create a new user on the system
// Create a new task
Project.createProject = function (newProject, result) {
    // sql query & error handling
    // set ? as newTask, which contains task, status and created_at 
    // this has to match the database task object's configuration
    sql.query("INSERT INTO projects set ?", newProject, function (err, res) {
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

// Get all tasks
Project.getAllProject = function (result) {
    sql.query("SELECT * from projects", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, error);
        }
        else {
            console.log('user: ', res);
            result(null, res);
        }
    })
}

// Get a project by id
Project.getProjectById = function (project_id, result) {
    sql.query("SELECT title from projects where project_id = ? ", project_id, function (err, res) {
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

// Update by Id
Project.updateById = function(id, project, result) {
    sql.query("UPDATE projects SET title = ? WHERE id = ? ", [project.title, id], function(err, res) {
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
Project.remove = function(id, result) {
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
module.exports = Project;