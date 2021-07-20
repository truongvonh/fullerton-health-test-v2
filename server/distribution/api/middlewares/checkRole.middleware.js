"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRoleMiddleware = undefined;

var _statusCode = require("../../constant/statusCode");

var _result = require("../../utils/result");

var _errors = require("../../constant/errors");

var checkRoleMiddleware = exports.checkRoleMiddleware = function checkRoleMiddleware(roleName) {
  return function (req, res, next) {
    var user = req.user;


    if (user.role !== roleName) {
      return res.status(_statusCode.STATUS_CODE.FORBIDDEN).json((0, _result.jsonError)(_errors.MESSAGE_ERROR.INVALID_ROLE));
    }

    next();
  };
};