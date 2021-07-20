'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _verifyToken = require('../middlewares/verifyToken');

var _booking = require('../controller/booking.controller');

var _inputValidate = require('../middlewares/inputValidate.middleware');

var _inputValidate2 = _interopRequireDefault(_inputValidate);

var _validation = require('../controller/validation');

var _validation2 = _interopRequireDefault(_validation);

var _checkRole = require('../middlewares/checkRole.middleware');

var _users = require('../models/users.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bookingRoutes = (0, _express.Router)();

var createBookingMiddleware = [_verifyToken.verifyToken, (0, _inputValidate2.default)(_validation2.default.createBooking), (0, _checkRole.checkRoleMiddleware)(_users.USER_ROLE_ENUM.HR)];

bookingRoutes.post('/', createBookingMiddleware, _booking.createBookingController);

bookingRoutes.get('/role-hr', [_verifyToken.verifyToken, (0, _checkRole.checkRoleMiddleware)(_users.USER_ROLE_ENUM.HR)], _booking.getAllHRBookingController);

bookingRoutes.put('/:bookingId/cancel', [_verifyToken.verifyToken, (0, _checkRole.checkRoleMiddleware)(_users.USER_ROLE_ENUM.HR)], _booking.cancelHRBookingController);

bookingRoutes.get('/role-admin', [_verifyToken.verifyToken, (0, _checkRole.checkRoleMiddleware)(_users.USER_ROLE_ENUM.ADMIN)], _booking.getAllBookingForAdminController);

bookingRoutes.put('/:bookingId/status', [_verifyToken.verifyToken, (0, _inputValidate2.default)(_validation2.default.adminUpdateBookingStatus), (0, _checkRole.checkRoleMiddleware)(_users.USER_ROLE_ENUM.ADMIN)], _booking.adminUpdateBookingStatusController);

exports.default = bookingRoutes;