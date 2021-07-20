'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _info = require('../constant/info');

var _errors = require('../constant/errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongodbConnection = function mongodbConnection(db) {
  var connect = function connect() {
    _mongoose2.default.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
      return console.info(_info.COMMON_MESSAGE.SUCCESS_CONNECT_DB + ' ' + db);
    }).catch(function (error) {
      console.error(_errors.MESSAGE_ERROR.CONNECT_DB_FAILED + ' ' + error);
      return process.exit(1);
    });
  };
  connect();

  _mongoose2.default.connection.on('disconnected', connect);
};

exports.default = mongodbConnection;