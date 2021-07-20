'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTaskController = exports.deleteTaskController = exports.addTaskController = exports.getTasksController = undefined;

var _models = require('./../db/models');

var _models2 = _interopRequireDefault(_models);

var _result = require('../../utils/result');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Tasks = _models2.default.Tasks;
var getTasksController = exports.getTasksController = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Tasks.findAll({
              attributes: ['id', 'name', 'status']
            });

          case 3:
            data = _context.sent;

            if (!data.length) res.json((0, _result.jsonError)('no data'));else res.json((0, _result.jsonSuccess)(data));
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            res.json((0, _result.jsonError)('network error'));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function getTasksController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var addTaskController = exports.addTaskController = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, name, status;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, status = _req$body.status;
            _context2.prev = 1;
            _context2.next = 4;
            return Tasks.create({ name: name, status: status || false });

          case 4:
            res.json((0, _result.jsonSuccess)('create success'));
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](1);

            res.json((0, _result.jsonError)('network error'));

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 7]]);
  }));

  return function addTaskController(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteTaskController = exports.deleteTaskController = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.body.id;
            _context3.prev = 1;
            _context3.next = 4;
            return Tasks.destroy({ where: { id: id } });

          case 4:
            result = _context3.sent;

            if (!result) res.json((0, _result.jsonError)('not found item to delete'));else res.json((0, _result.jsonSuccess)('success'));
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](1);

            res.json((0, _result.jsonError)('network error'));

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 8]]);
  }));

  return function deleteTaskController(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var updateTaskController = exports.updateTaskController = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, id, name, status, result;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, id = _req$body2.id, name = _req$body2.name, status = _req$body2.status;
            _context4.prev = 1;
            _context4.next = 4;
            return Tasks.update({ name: name, status: status }, { where: { id: id } });

          case 4:
            result = _context4.sent;

            if (!result[0]) res.json((0, _result.jsonError)('not found item to update'));else res.json((0, _result.jsonSuccess)('success'));
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4['catch'](1);

            res.json((0, _result.jsonError)('network error'));

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[1, 8]]);
  }));

  return function updateTaskController(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();