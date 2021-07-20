'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = exports.valueRequired = undefined;

var _validator = require('validator');

var _result = require('../../utils/result');

var valueRequired = exports.valueRequired = function valueRequired(val) {
  return function (req, res, next) {
    var result = false;
    val.forEach(function (item) {
      if ((0, _validator.isEmpty)(item)) result = true;
    });
    if (result) return res.json((0, _result.jsonError)('value is not empty'));
    return next();
  };
};

var isNumber = exports.isNumber = function isNumber(val) {
  return function (req, res, next) {
    if (Number.isInteger(val)) next();
    return res.json((0, _result.jsonError)('value is not valid'));
  };
};