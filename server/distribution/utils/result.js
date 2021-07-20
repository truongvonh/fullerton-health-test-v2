"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var jsonSuccess = exports.jsonSuccess = function jsonSuccess(data) {
  var meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return _extends({ success: true }, data);
};

var jsonError = exports.jsonError = function jsonError(error) {
  return { success: false, error: error };
};