import {memo, useEffect} from 'react'
import ListBooking from '../components/ListBooking'
import {getListBookingByRole} from '../store/actions'
import {USER_ROLE} from '../../LoginPage/store/actions'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {selectBookingLoading, selectListBooking} from '../store/selector'
import {Button} from 'antd'
import './style.scss'
import {PlusOutlined} from '@ant-design/icons'
import {booking} from '../store/reducer'
import AddBookingModal from "../components/AddBookingModal";

const { toggleVisibleAddBooking } = booking.actions

const BookingPage = () => {
  const dispatch = useDispatch()

  const bookings = useSelector(selectListBooking, shallowEqual)
  const bookingLoading = useSelector(selectBookingLoading, shallowEqual)

  useEffect(() => {
    dispatch(getListBookingByRole(USER_ROLE.HR))
  }, [])

  const handleToggleAddBookingModal = () =>
    dispatch(toggleVisibleAddBooking(true))

  return (
    <div>
      <div className={'booking-btn-wrapper'}>
        <Button
          onClick={handleToggleAddBookingModal}
          className={'booking-btn'}
          type={'primary'}
        >
          <PlusOutlined />
          Add Booking
        </Button>
      </div>
      <ListBooking dataSource={bookings} loading={bookingLoading} />

      <AddBookingModal />
    </div>
  )
}

export default memo(BookingPage)
