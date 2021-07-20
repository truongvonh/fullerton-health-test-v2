import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bookings: [],
  loading: false,
  error: null,
  isVisibleAddBooking: false,
  bookingActionLoading: false,
  reasonRejected: '',
  isVisibleApproveModal: false,
  isVisibleRejectModal: false,
  bookingSelected: null,
}

const getBookingDetail = (state, action) => {
  state.bookingSelected = action.payload.bookingId
    ? state.bookings.find(({ _id }) => action.payload.bookingId === _id)
    : null
}

export const booking = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    toggleApproveModal(state, action) {
      state.isVisibleApproveModal = action.payload.isVisibleApproveModal
      getBookingDetail(state, action)
    },
    toggleRejectModal(state, action) {
      state.isVisibleRejectModal = action.payload.isVisibleRejectModal
      getBookingDetail(state, action)
    },
    onUpdateRejectContent(state, action) {
      state.reasonRejected = action.payload
    },
    toggleBookingActionLoading(state, action) {
      state.bookingActionLoading = action.payload
    },
    startProcess(state) {
      state.loading = true
    },
    getListBooking(state, action) {
      state.bookings = action.payload
    },
    toggleVisibleAddBooking(state, action) {
      state.isVisibleAddBooking = action.payload
    },
    onErrored(state, action) {
      state.error = action.payload
    },
    endProcess(state) {
      state.loading = false
    },
  },
})
