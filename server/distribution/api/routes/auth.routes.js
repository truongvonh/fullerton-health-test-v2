'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _auth = require('../controller/auth.controller');

var _inputValidate = require('../middlewares/inputValidate.middleware');

var _inputValidate2 = _interopRequireDefault(_inputValidate);

var _validation = require('../controller/validation');

var _validation2 = _interopRequireDefault(_validation);

var _verifyToken = require('../middlewares/verifyToken');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = (0, _express.Router)();
authRouter.post('/sign-up', (0, _inputValidate2.default)(_validation2.default.signUp), _auth.signUpController);

authRouter.get('/current-user', _verifyToken.verifyToken, _auth.getUserInfoController);

authRouter.post('/login', (0, _inputValidate2.default)(_validation2.default.signIn), _auth.signInController);

exports.default = authRouter;