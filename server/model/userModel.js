'user strict';

var sql = require('./db.js');

var User = function(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.created_at = new Date();
}

// create a new user on the system
// Create a new task
User.createUser = function (newUser, result) {
    // sql query & error handling
    // set ? as newTask, which contains task, status and created_at 
    // this has to match the database task object's configuration
    sql.query("INSERT INTO users set ?", newUser, function (err, res) {
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
User.getAllUser = function (result) {
    sql.query("SELECT * from users", function (err, res) {
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

module.exports = User;