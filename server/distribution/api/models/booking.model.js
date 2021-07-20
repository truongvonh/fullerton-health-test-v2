'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Booking = exports.EVENT_STATUS = exports.EVENT_TYPE = undefined;

var _mongoose = require('mongoose');

var mongoose = _interopRequireWildcard(_mongoose);

var _users = require('./users.model');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Schema = mongoose.Schema;

var EVENT_TYPE = exports.EVENT_TYPE = {
  HEALTH_TALK: 'HEALTH_TALK',
  WELLNESS_EVENTS: 'WELLNESS_EVENTS',
  FITNESS_ACTIVITIES: 'FITNESS_ACTIVITIES'
};

var BookingModelName = 'Booking';

var EVENT_STATUS = exports.EVENT_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTION: 'Rejection',
  CANCEL: 'cancel'
};

var BookingSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  proposedDate: {
    type: [Date],
    maxlength: 3,
    minlength: 3,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: _users.UserModelName,
    required: true
  },
  type: {
    type: String,
    enum: Object.values(EVENT_TYPE),
    required: true
  },
  status: {
    type: String,
    enum: Object.values(EVENT_STATUS),
    default: EVENT_STATUS.PENDING
  },
  reasonRejected: {
    type: String,
    required: false
  },
  confirmDate: {
    type: Date,
    required: false
  }
}, { timestamps: true });

var Booking = exports.Booking = mongoose.model(BookingModelName, BookingSchema);