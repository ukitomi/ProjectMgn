'use strict';

var Project = require('../model/projectModel.js');

exports.list_all_projects = function (req, res) {
    Project.getAllProject(function(err, project) {
        console.log('controller')
        if (err) {
            res.send(err);
        }
        else {
            console.log('res', project);
            res.send(project);
        }
    });
};

exports.create_a_project = function (req, res) {
    var new_project = new Project(req.body);
    // handles null error
    if (!new_project.title) {
        res.status(400).send({
            error: true,
            message: "Please provide your title!"
        })
    }
    else if (!new_project.description) {
        res.status(400).send({
            error: true,
            message: "Please provide your description!"
        })
    }
    else if (!new_project.deadline) {
        res.status(400).send({
            error: true,
            message: "Please provide a deadline!"
        })
    }
    else {
        Project.createProject(new_project, function(err, project) {
            if (err) {
                res.send(err);
            }
            else {
                // send the task in json format
                res.json(project);
            }
        })
    }
}

exports.read_a_project = function(req, res) {
    Project.getProjectById(req.params.project_id, function(err, project) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(project);
        }
    });
}

exports.update_a_project = function(req, res) {
    Project.updateById(req.params.project_id, new Project(req.body), function(err, project) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(project);
        }
    })
}

exports.delete_a_project = function(req, res) {
    Project.remove(req.params.project_id, function(err, project) {
        if(err) {
            res.send(err);
        }
        else {
            res.json({message: 'Project successfully deleted'});
        }
    })
}