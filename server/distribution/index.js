'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

require('regenerator-runtime/runtime');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _errorhandler = require('errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _common = require('./utils/common');

var _connection = require('./db/connection');

var _connection2 = _interopRequireDefault(_connection);

var _dbUrlConnect = require('./db/dbUrlConnect');

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _nodeNotifier = require('node-notifier');

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();


var app = (0, _express2.default)();

(0, _connection2.default)(_dbUrlConnect.uriConnection);

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)(_common.corsOptions));
app.use((0, _morgan2.default)('common'));

function errorNotification(err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url;

  _nodeNotifier2.default.notify({
    title: title,
    err: err,
    str: str,
    req: req
  });
}

app.use((0, _errorhandler2.default)({ log: errorNotification }));

app.get('/', function (req, res) {
  return res.json('Hello World!');
});
app.use('/api', _api2.default);

app.listen(process.env.PORT || (0, _common.getEnv)('APP_PORT'), function () {
  return console.log('app is running on port: ' + (0, _common.getEnv)('APP_PORT'));
});