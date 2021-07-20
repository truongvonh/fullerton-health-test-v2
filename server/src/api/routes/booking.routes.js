import { Router } from 'express'
import { verifyToken } from '../middlewares/verifyToken'
import {
  adminUpdateBookingStatusController,
  cancelHRBookingController,
  createBookingController,
  getAllBookingForAdminController,
  getAllHRBookingController,
} from '../controller/booking.controller'
import inputValidateMiddleWare from '../middlewares/inputValidate.middleware'
import validateSchema from '../controller/validation'
import { checkRoleMiddleware } from '../middlewares/checkRole.middleware'
import { USER_ROLE_ENUM } from '../models/users.model'

const bookingRoutes = Router()

const createBookingMiddleware = [
  verifyToken,
  inputValidateMiddleWare(validateSchema.createBooking),
  checkRoleMiddleware(USER_ROLE_ENUM.HR),
]

bookingRoutes.post('/', createBookingMiddleware, createBookingController)

bookingRoutes.get('/role-hr', [verifyToken, checkRoleMiddleware(USER_ROLE_ENUM.HR)], getAllHRBookingController)

bookingRoutes.put(
  '/:bookingId/cancel',
  [verifyToken, checkRoleMiddleware(USER_ROLE_ENUM.HR)],
  cancelHRBookingController
)

bookingRoutes.get(
  '/role-admin',
  [verifyToken, checkRoleMiddleware(USER_ROLE_ENUM.ADMIN)],
  getAllBookingForAdminController
)

bookingRoutes.put(
  '/:bookingId/status',
  [
    verifyToken,
    inputValidateMiddleWare(validateSchema.adminUpdateBookingStatus),
    checkRoleMiddleware(USER_ROLE_ENUM.ADMIN),
  ],
  adminUpdateBookingStatusController
)

export default bookingRoutes
