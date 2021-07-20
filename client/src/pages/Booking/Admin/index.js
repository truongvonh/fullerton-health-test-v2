import { memo, useEffect } from 'react'
import ListBooking from '../components/ListBooking'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getListBookingByRole } from '../store/actions'
import { selectBookingLoading, selectListBooking } from '../store/selector'
import { USER_ROLE } from '../../LoginPage/store/actions'
import ApproveBookingModal from '../components/ApproveBookingModal'
import RejectBookingModal from '../components/RejectBookingModal'

const BookingPage = () => {
  const dispatch = useDispatch()

  const bookings = useSelector(selectListBooking, shallowEqual)
  const bookingLoading = useSelector(selectBookingLoading, shallowEqual)

  useEffect(() => {
    dispatch(getListBookingByRole(USER_ROLE.ADMIN))
  }, [])

  return (
    <>
      <ListBooking loading={bookingLoading} dataSource={bookings} />
      <ApproveBookingModal />
      <RejectBookingModal />
    </>
  )
}

export default memo(BookingPage)
