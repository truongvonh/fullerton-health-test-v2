import { USER_ROLE_ENUM } from '../../models/users.model'
import * as yup from 'yup'
import { EVENT_STATUS, EVENT_TYPE } from '../../models/booking.model'

const validateSchema = {
  signIn: yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  }),
  signUp: yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
  }),
  createBooking: yup.object({
    location: yup.string().required(),
    type: yup.mixed().oneOf(Object.values(EVENT_TYPE)).required(),
    proposedDate: yup.array().min(3).max(3).of(yup.string()).required(),
  }),
  adminUpdateBookingStatus: yup.object({
    status: yup.mixed().oneOf([EVENT_STATUS.APPROVED, EVENT_STATUS.REJECTION]).required(),
    reasonRejected: yup.string().when('status', {
      is: EVENT_STATUS.REJECTION,
      then: yup.string().required(),
    }),
    confirmDate: yup.string().when('status', {
      is: EVENT_STATUS.APPROVED,
      then: yup.string().required(),
    }),
  }),
}

export default validateSchema
