'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _result = require('../../utils/result');

var _common = require('../../utils/common');

var _errors = require('../../constant/errors');

var _statusCode = require('../../constant/statusCode');

var _users = require('../models/users.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var verifyToken = exports.verifyToken = function verifyToken(req, res, next) {
  try {
    var token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
      return res.status(_statusCode.STATUS_CODE.FORBIDDEN).json((0, _result.jsonError)(_errors.MESSAGE_ERROR.NO_ACCESS_TOKEN));
    }
    if (token && token.startsWith('Bearer ')) token = token.slice(7, token.length);
    _jsonwebtoken2.default.verify(token, (0, _common.getEnv)('SECRET_KEY'), function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, decoded) {
        var id, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!err) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', res.status(_statusCode.STATUS_CODE.FORBIDDEN).json((0, _result.jsonError)(_errors.MESSAGE_ERROR.TOKEN_NOT_VALID)));

              case 2:
                id = decoded.id;
                _context.next = 5;
                return _users.User.findOne({ _id: id }).lean();

              case 5:
                user = _context.sent;


                delete user.password;

                req.user = user;
                next();

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  } catch (e) {
    throw e;
  }
};