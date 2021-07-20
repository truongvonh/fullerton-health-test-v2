'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uriConnection = undefined;

var _common = require('../utils/common');

var uriConnection = exports.uriConnection = 'mongodb+srv://' + (0, _common.getEnv)('DB_USER_NAME') + ':' + (0, _common.getEnv)('DB_PASSWORD') + '@cluster0.jed5p.mongodb.net/' + (0, _common.getEnv)('DB_NAME') + '?retryWrites=true&w=majority';