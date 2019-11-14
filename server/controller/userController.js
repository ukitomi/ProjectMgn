'use strict';

var User = require('../model/userModel.js');

exports.list_all_users = function (req, res) {
    User.getAllUser(function(err, user) {
        console.log('controller')
        if (err) {
            res.send(err);
        }
        else {
            console.log('res', user);
            res.send(user);
        }
    });
};

exports.create_a_user = function (req, res) {
    var new_user = new User(req.body);
    // handles null error
    if (!new_user.name) {
        res.status(400).send({
            error: true,
            message: "Please provide your name!"
        })
    }
    else if (!new_user.email) {
        res.status(400).send({
            error: true,
            message: "Please provide your email!"
        })
    }
    else if (!new_user.password) {
        res.status(400).send({
            error: true,
            message: "Please provide a password!"
        })
    }
    else {
        User.createUser(new_user, function(err, user) {
            if (err) {
                res.send(err);
            }
            else {
                // send the task in json format
                res.json(user);
            }
        })
    }
}