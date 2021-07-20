import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { auth } from '../pages/LoginPage/store/reducer'
import { booking } from '../pages/Booking/store/reducer'

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  auth: auth.reducer,
  booking: booking.reducer,
  router: connectRouter(history),
})

export default rootReducer
