'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserInfoController = exports.signInController = exports.signUpController = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _result = require('../../utils/result');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _common = require('../../utils/common');

var _users = require('../models/users.model');

var _errors = require('../../constant/errors');

var _statusCode = require('../../constant/statusCode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var signUpController = exports.signUpController = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, email, password, user, userEmail, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
            _context.next = 3;
            return _users.User.findOne({ name: name });

          case 3:
            user = _context.sent;
            _context.next = 6;
            return _users.User.findOne({ email: email });

          case 6:
            userEmail = _context.sent;

            if (!user) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', res.status(_statusCode.STATUS_CODE.INTERNAL_ERROR).json((0, _result.jsonError)(_errors.MESSAGE_ERROR.USER_EXIST)));

          case 9:
            if (!userEmail) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return', res.status(_statusCode.STATUS_CODE.INTERNAL_ERROR).json((0, _result.jsonError)(_errors.MESSAGE_ERROR.DOCUMENT_EXIST)));

          case 11:
            _context.next = 13;
            return _users.User.create(_extends({}, req.body, {
              password: _bcrypt2.default.hashSync(password, 8)
            }));

          case 13:
            result = _context.sent;
            return _context.abrupt('return', res.status(_statusCode.STATUS_CODE.SUCCESS).json((0, _result.jsonSuccess)(result)));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function signUpController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var signInController = exports.signInController = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, email, password, user, passwordIsValid, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context2.next = 3;
            return _users.User.findOne({ email: email });

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt('return', res.status(_statusCode.STATUS_CODE.ERROR).json((0, _result.jsonError)(_errors.MESSAGE_ERROR.USER_NOT_FOUND)));

          case 6:
            passwordIsValid = _bcrypt2.default.compareSync(password, user.password);

            if (passwordIsValid) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt('return', res.status(_statusCode.STATUS_CODE.FORBIDDEN).json((0, _result.jsonError)(_errors.MESSAGE_ERROR.PASSWORD_WRONG)));

          case 9:
            token = _jsonwebtoken2.default.sign({ id: user.id }, (0, _common.getEnv)('SECRET_KEY'), {
              expiresIn: (0, _common.getEnv)('EXPIRE_TIME'),
              algorithm: (0, _common.getEnv)('HASH_ALGORITHM')
            });


            delete user.password;

            return _context2.abrupt('return', res.status(_statusCode.STATUS_CODE.SUCCESS).json((0, _result.jsonSuccess)({ token: token })));

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function signInController(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getUserInfoController = exports.getUserInfoController = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = req.user;
            return _context3.abrupt('return', res.status(_statusCode.STATUS_CODE.SUCCESS).json((0, _result.jsonSuccess)(_extends({}, user))));

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getUserInfoController(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();