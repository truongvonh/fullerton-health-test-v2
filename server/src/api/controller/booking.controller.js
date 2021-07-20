import { STATUS_CODE } from '../../constant/statusCode'
import { jsonError, jsonSuccess } from '../../utils/result'
import { Booking, EVENT_STATUS } from '../models/booking.model'
import { MESSAGE_ERROR } from '../../constant/errors'
import { convertMongoObjectToJson } from '../../utils/common'

export const createBookingController = async (req, res) => {
  const { user, body } = req

  const booking = new Booking({ ...body, owner: user._id })

  await booking.save()

  return res.status(STATUS_CODE.SUCCESS).json(jsonSuccess({ info: 'created' }))
}

export const getAllHRBookingController = async (req, res) => {
  const { user } = req

  const [listBooking, bookingCount] = await Promise.all([
    Booking.find({ owner: user._id }).lean(),
    Booking.find({ owner: user._id }).count(),
  ])

  return res.status(STATUS_CODE.SUCCESS).json(jsonSuccess({ bookings: listBooking }, { count: bookingCount }))
}

export const cancelHRBookingController = async (req, res) => {
  const { user } = req
  const { bookingId } = req.params

  const booking = await Booking.findOne({ _id: bookingId, owner: user._id })

  if (!booking) {
    return res.status(STATUS_CODE.NOT_FOUND).json(jsonError(MESSAGE_ERROR.NOT_FOUND))
  }

  if (booking.status !== EVENT_STATUS.PENDING) {
    return res.status(STATUS_CODE.ERROR).json(jsonError(MESSAGE_ERROR.CANCEL_BOOKING_FAILED))
  }

  booking.status = EVENT_STATUS.CANCEL
  await booking.save()

  return res.status(STATUS_CODE.SUCCESS).json(jsonSuccess(convertMongoObjectToJson(booking)))
}

export const getAllBookingForAdminController = async (req, res) => {
  try {
    const excludeStatusCancelQuery = { status: { $not: /cancel/ } }

    const allBookings = await Booking.find(excludeStatusCancelQuery)

    return res.status(STATUS_CODE.SUCCESS).json(jsonSuccess({ bookings: allBookings }, {}))
  } catch (e) {
    console.error(e)
    return res.status(STATUS_CODE.INTERNAL_ERROR).json(jsonError(MESSAGE_ERROR.NETWORK_ERROR))
  }
}

export const adminUpdateBookingStatusController = async (req, res) => {
  try {
    const { body } = req
    const { status, reasonRejected, confirmDate } = body
    const { bookingId } = req.params

    const bookingDetail = await Booking.findOne({ _id: bookingId })

    if (bookingDetail.status !== EVENT_STATUS.PENDING) {
      return res.status(STATUS_CODE.ERROR).json(jsonError(MESSAGE_ERROR.NOT_PENDING_STATUS))
    }

    if (status === bookingDetail.status) {
      return res.stat(STATUS_CODE.ERROR).json(jsonError(MESSAGE_ERROR.UPDATED_EXIST))
    }

    bookingDetail.status = status

    if (status === EVENT_STATUS.REJECTION) {
      bookingDetail.reasonRejected = reasonRejected
    }

    if (status === EVENT_STATUS.APPROVED) {
      const confirmDateFormat = new Date(confirmDate).toString()
      const proposedDateString = bookingDetail.proposedDate.map((_) => _.toString())
      const isConfirmDateValid = proposedDateString.includes(confirmDateFormat)

      if (!isConfirmDateValid) {
        return res.status(STATUS_CODE.ERROR).json(jsonError(MESSAGE_ERROR.INVALID_PROPOSED_DATE))
      }

      bookingDetail.confirmDate = confirmDateFormat
    }

    await bookingDetail.save()

    return res.status(STATUS_CODE.SUCCESS).json(jsonSuccess(convertMongoObjectToJson(bookingDetail)))
  } catch (e) {
    console.error(e)
    return res.status(STATUS_CODE.INTERNAL_ERROR).json(jsonError(MESSAGE_ERROR.NETWORK_ERROR))
  }
}
