'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require('../../models/users.model');

var _yup = require('yup');

var yup = _interopRequireWildcard(_yup);

var _booking = require('../../models/booking.model');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var validateSchema = {
  signIn: yup.object({
    email: yup.string().required(),
    password: yup.string().required()
  }),
  signUp: yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required()
  }),
  createBooking: yup.object({
    location: yup.string().required(),
    type: yup.mixed().oneOf(Object.values(_booking.EVENT_TYPE)).required(),
    proposedDate: yup.array().min(3).max(3).of(yup.string()).required()
  }),
  adminUpdateBookingStatus: yup.object({
    status: yup.mixed().oneOf([_booking.EVENT_STATUS.APPROVED, _booking.EVENT_STATUS.REJECTION]).required(),
    reasonRejected: yup.string().when('status', {
      is: _booking.EVENT_STATUS.REJECTION,
      then: yup.string().required()
    }),
    confirmDate: yup.string().when('status', {
      is: _booking.EVENT_STATUS.APPROVED,
      then: yup.string().required()
    })
  })
};

exports.default = validateSchema;