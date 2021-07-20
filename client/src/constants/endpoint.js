export const AUTH_ENDPOINT = {
  LOGIN: '/auth/login',
  CURRENT_USER: '/auth/current-user',
}

export const BOOKING_ENDPOINT = {
  ADMIN_LIST: '/booking/role-admin',
  HR_LIST: '/booking/role-hr',
  ADD_BOOKING: '/booking',
  CANCEL_BOOKING: (bookingId) => `/booking/${bookingId}/cancel`,
  UPDATE_BOOKING_STATUS: (bookingId) => `/booking/${bookingId}/status`,
}
