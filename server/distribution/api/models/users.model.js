'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.UserModelName = exports.USER_ROLE_ENUM = undefined;

var _mongoose = require('mongoose');

var mongoose = _interopRequireWildcard(_mongoose);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var USER_ROLE_ENUM = exports.USER_ROLE_ENUM = {
  ADMIN: 'ADMIN',
  HR: 'HR'
};

var UserModelName = exports.UserModelName = 'User';

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLE_ENUM),
    default: USER_ROLE_ENUM.ADMIN
  }
});

var User = exports.User = mongoose.model(UserModelName, UserSchema);