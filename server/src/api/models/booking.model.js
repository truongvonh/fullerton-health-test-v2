import * as mongoose from 'mongoose'
import { UserModelName } from './users.model'

const Schema = mongoose.Schema

export const EVENT_TYPE = {
  HEALTH_TALK: 'HEALTH_TALK',
  WELLNESS_EVENTS: 'WELLNESS_EVENTS',
  FITNESS_ACTIVITIES: 'FITNESS_ACTIVITIES',
}

const BookingModelName = 'Booking'

export const EVENT_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTION: 'Rejection',
  CANCEL: 'cancel',
}

const BookingSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    proposedDate: {
      type: [Date],
      maxlength: 3,
      minlength: 3,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: UserModelName,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(EVENT_TYPE),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(EVENT_STATUS),
      default: EVENT_STATUS.PENDING,
    },
    reasonRejected: {
      type: String,
      required: false,
    },
    confirmDate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
)

export const Booking = mongoose.model(BookingModelName, BookingSchema)
