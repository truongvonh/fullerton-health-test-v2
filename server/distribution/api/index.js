'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('./routes/auth.routes');

var _auth2 = _interopRequireDefault(_auth);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _booking = require('./routes/booking.routes');

var _booking2 = _interopRequireDefault(_booking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = (0, _express2.default)();

api.use('/auth', _auth2.default);
api.use('/booking', _booking2.default);

exports.default = api;