import { booking } from './reducer'
import { sleep } from '../../../utils/helper'
import { message } from 'antd'
import axiosInstance from '../../../api/axiosInstance'
import { BOOKING_ENDPOINT } from '../../../constants/endpoint'
import { USER_ROLE } from '../../LoginPage/store/actions'
import { EVENT_STATUS } from '../components/ListBooking'

const {
  startProcess,
  onErrored,
  getListBooking,
  toggleVisibleAddBooking,
  endProcess,
  toggleBookingActionLoading,
  toggleApproveModal,
  toggleRejectModal,
} = booking.actions

export const getListBookingByRole = (role = USER_ROLE.ADMIN) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startProcess())
      const {
        data: { bookings },
      } = await (role === USER_ROLE.ADMIN
        ? axiosInstance.get(BOOKING_ENDPOINT.ADMIN_LIST)
        : axiosInstance.get(BOOKING_ENDPOINT.HR_LIST))
      dispatch(getListBooking(bookings))
    } catch (e) {
      message.error('Has error when fetch list booking')
      dispatch(onErrored(e))
    } finally {
      await sleep(1000)
      dispatch(endProcess())
    }
  }
}

export const onCancelBookingAction =
  (bookingId) => async (dispatch, getState) => {
    try {
      dispatch(toggleBookingActionLoading(true))
      await axiosInstance.put(BOOKING_ENDPOINT.CANCEL_BOOKING(bookingId))
      message.success('Cancel booking success!')

      dispatch(getListBookingByRole(USER_ROLE.HR))
    } catch (e) {
      message.error(e?.response?.data?.error || 'login failed')
      dispatch(onErrored(e))
    } finally {
      await sleep(1000)
      dispatch(toggleBookingActionLoading(false))
    }
  }

export const onAddBooking = (payload, form) => async (dispatch, getState) => {
  try {
    dispatch(toggleBookingActionLoading(true))
    await axiosInstance.post(BOOKING_ENDPOINT.ADD_BOOKING, payload)

    dispatch(getListBookingByRole(USER_ROLE.HR))

    await sleep(1000)
    dispatch(toggleVisibleAddBooking(false))
    form.resetFields()
    message.success('Create booking success!')
  } catch (e) {
    message.error(e?.response?.data?.error)
    dispatch(onErrored(e))
  } finally {
    dispatch(toggleBookingActionLoading(false))
  }
}

export const onAdminUpdateBookingStatus =
  (data, status = EVENT_STATUS.APPROVED) =>
  async (dispatch, getState) => {
    try {
      dispatch(toggleBookingActionLoading(true))

      const { bookingSelected } = getState().booking

      const payload =
        status === EVENT_STATUS.APPROVED
          ? {
              status: EVENT_STATUS.APPROVED,
              confirmDate: data,
            }
          : {
              status: EVENT_STATUS.REJECTION,
              reasonRejected: data,
            }

      await axiosInstance.put(
        BOOKING_ENDPOINT.UPDATE_BOOKING_STATUS(bookingSelected._id),
        payload
      )

      dispatch(getListBookingByRole(USER_ROLE.ADMIN))
      const messageNotify =
        status === EVENT_STATUS.APPROVED
          ? 'Approve booking success!'
          : 'The booking rejected!'
      message.success(messageNotify)

      if (status === EVENT_STATUS.APPROVED) {
        dispatch(toggleApproveModal({ isVisibleApproveModal: false }))
      } else {
        dispatch(toggleRejectModal({ isVisibleRejectModal: false }))
      }
    } catch (e) {
      message.error(e?.response?.data?.error)
      dispatch(onErrored(e))
    } finally {
      await sleep(1000)
      dispatch(toggleBookingActionLoading(false))
    }
  }
