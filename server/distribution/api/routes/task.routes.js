'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _task = require('../controller/task.controller');

var _common = require('../middlewares/common');

var _verifyToken = require('../middlewares/verifyToken');

var taskRouter = (0, _express.Router)();

taskRouter.get('/', _verifyToken.verifyToken, _task.getTasksController);

taskRouter.post('/', [function (req, res, next) {
  return (0, _common.valueRequired)([req.body.name])(req, res, next);
}, _verifyToken.verifyToken], _task.addTaskController);

taskRouter.put('/', _verifyToken.verifyToken, _task.updateTaskController);

taskRouter.delete('/', [function (req, res, next) {
  return (0, _common.isNumber)([req.body.id])(req, res, next);
}, function (req, res, next) {
  return (0, _common.valueRequired)([req.body.id])(req, res, next);
}, _verifyToken.verifyToken], _task.deleteTaskController);

exports.default = taskRouter;