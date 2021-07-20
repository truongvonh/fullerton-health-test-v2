'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminUpdateBookingStatusController = exports.getAllBookingForAdminController = exports.cancelHRBookingController = exports.getAllHRBookingController = exports.createBookingController = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _statusCode = require('../../constant/statusCode');

var _result = require('../../utils/result');

var _booking = require('../models/booking.model');

var _errors = require('../../constant/errors');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createBookingController = exports.createBookingController = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, body, booking;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = req.user, body = req.body;
            booking = new _booking.Booking(_extends({}, body, { owner: user._id }));
            _context.next = 4;
            return booking.save();

          case 4:
            return _context.abrupt('return', res.status(_statusCode.STATUS_CODE.SUCCESS).json((0, _result.jsonSuccess)({ info: 'created' })));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createBookingController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getAllHRBookingController = exports.getAllHRBookingController = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user, _req$params, _req$params$offset, offset, _req$params$page, paramsPage, page, _ref3, _ref4, listBooking, bookingCount;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = req.user;
            _req$params = req.params, _req$params$offset = _req$params.offset, offset = _req$params$offset === undefined ? 10 : _req$params$offset, _req$params$page = _req$params.page, paramsPage = _req$params$page === undefined ? 0 : _req$params$page;
            page = Math.max(0, paramsPage);
            _context2.next = 5;
            return Promise.all([_booking.Booking.find({ owner: user._id }).limit(offset).skip(offset * page).lean(), _booking.Booking.find({ owner: user._id }).count()]);

          case 5:
            _ref3 = _context2.sent;
            _ref4 = _slicedToArray(_ref3, 2);
            listBooking = _ref4[0];
            bookingCount = _ref4[1];
            return _context2.abrupt('return', res.status(_statusCode.STATUS_CODE.SUCCESS).json((0, _result.jsonSuccess)({ bookings: listBooking }, { page: page, offset: offset, count: bookingCount })));

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getAllHRBookingController(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var cancelHRBookingController = exports.cancelHRBookingController = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user, bookingId, booking;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = req.user;
            bookingId = req.params.bookingId;
            _context3.next = 4;
            return _booking.Booking.findOne({ _id: bookingId, owner: user._id });

          case 4:
            booking = _context3.sent;

            if (booking) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt('return', res.status(_statusCode.STATUS_CODE.NOT_FOUND).json((0, _result.jsonError)(_errors.MESSAGE_ERROR.NOT_FOUND)));

          case 7:
            if (!(booking.status !== _booking.EVENT_STATUS.PENDING)) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt('return', res.status(_statusCode.STATUS_CODE.ERROR).json((0, _result.jsonError)(_errors.MESSAGE_ERROR.CANCEL_BOOKING_FAILED)));

          case 9:

            booking.status = _booking.EVENT_STATUS.CANCEL;
            _context3.next = 12;
            return booking.save();

          case 12:
            return _context3.abrupt('return', res.status(_statusCode.STATUS_CODE.SUCCESS).json((0, _result.jsonSuccess)(booking)));

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function cancelHRBookingController(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

var getAllBookingForAdminController = exports.getAllBookingForAdminController = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var excludeStatusCancelQuery, allBookings;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            excludeStatusCancelQuery = { status: { $not: /cancel/ } };
            _context4.next = 3;
            return _booking.Booking.find(excludeStatusCancelQuery);

          case 3:
            allBookings = _context4.sent;
            return _context4.abrupt('return', res.status(_statusCode.STATUS_CODE.SUCCESS).json((0, _result.jsonSuccess)({ bookings: allBookings }, {})));

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getAllBookingForAdminController(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

var adminUpdateBookingStatusController = exports.adminUpdateBookingStatusController = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var body, status, reasonRejected, confirmDate, bookingId, bookingDetail, confirmDateFormat, proposedDateString, isConfirmDateValid;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            body = req.body;
            status = body.status, reasonRejected = body.reasonRejected, confirmDate = body.confirmDate;
            bookingId = req.params.bookingId;
            _context5.next = 6;
            return _booking.Booking.findOne({ _id: bookingId });

          case 6:
            bookingDetail = _context5.sent;

            if (!(bookingDetail.status !== _booking.EVENT_STATUS.PENDING)) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt('return', res.status(_statusCode.STATUS_CODE.ERROR).json((0, _result.jsonError)(_errors.MESSAGE_ERROR.NOT_PENDING_STATUS)));

          case 9:
            if (!(status === bookingDetail.status)) {
              _context5.next = 11;
              break;
            }

            return _context5.abrupt('return', res.stat(_statusCode.STATUS_CODE.ERROR).json((0, _result.jsonError)(_errors.MESSAGE_ERROR.UPDATED_EXIST)));

          case 11:

            bookingDetail.status = status;

            if (status === _booking.EVENT_STATUS.REJECTION) {
              bookingDetail.reasonRejected = reasonRejected;
            }

            if (!(status === _booking.EVENT_STATUS.APPROVED)) {
              _context5.next = 20;
              break;
            }

            confirmDateFormat = new Date(confirmDate).toString();
            proposedDateString = bookingDetail.proposedDate.map(function (_) {
              return _.toString();
            });
            isConfirmDateValid = proposedDateString.includes(confirmDateFormat);

            if (isConfirmDateValid) {
              _context5.next = 19;
              break;
            }

            return _context5.abrupt('return', res.status(_statusCode.STATUS_CODE.ERROR).json((0, _result.jsonError)(_errors.MESSAGE_ERROR.INVALID_PROPOSED_DATE)));

          case 19:

            bookingDetail.confirmDate = confirmDateFormat;

          case 20:
            _context5.next = 22;
            return bookingDetail.save();

          case 22:
            return _context5.abrupt('return', res.status(_statusCode.STATUS_CODE.SUCCESS).json((0, _result.jsonSuccess)(bookingDetail)));

          case 25:
            _context5.prev = 25;
            _context5.t0 = _context5['catch'](0);
            throw _context5.t0;

          case 28:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 25]]);
  }));

  return function adminUpdateBookingStatusController(_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();