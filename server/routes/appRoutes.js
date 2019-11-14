'use strict';

module.exports = function(app) {
    var todoList = require('../controller/appController.js');
    var userList = require('../controller/userController.js');
    var projectList = require('../controller/projectController.js');

    // todoList routes
    app.route('/tasks')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);

    app.route('/users')
        .get(userList.list_all_users)
        .post(userList.create_a_user);

    app.route('/projects')
        .get(projectList.list_all_projects)
        .post(projectList.create_a_project);

    app.route('/projects/:projectId')
        .get(projectList.read_a_project)
        .put(projectList.update_a_project)
        .delete(projectList.delete_a_project);
}